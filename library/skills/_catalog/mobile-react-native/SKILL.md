---
name: mobile-react-native
description: Build React Native / Expo features correctly — navigation, platform differences, native modules, and store submission checklist.
---

TRIGGER: implementing a React Native or Expo feature — screen, navigation, native module integration, or platform-specific behavior
OUTPUT: compact — feature works on both iOS and Android, platform differences handled, no hardcoded styles that break on one platform
SKIP: web-only React work; use `frontend-react` instead

---

# Mobile React Native

## Stack assumptions

- **Expo (managed or bare workflow)** — prefer for new projects; provides OTA updates, EAS Build, and managed native modules.
- **React Navigation** for routing — not Expo Router unless the project already uses it.
- **React Native Reanimated** for all animations — not Animated API.
- If the project already has a different setup, follow it; don't introduce a second navigation library.

## Project structure

```
app/
  screens/          ← one file per screen, named by screen (LoginScreen, DashboardScreen)
  components/       ← shared components
  navigation/       ← navigator definitions, linking config
  hooks/            ← custom hooks
  services/         ← API calls, storage
  store/            ← global state (Zustand preferred over Redux for new projects)
```

## Navigation

```typescript
// navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

type RootStackParams = {
  Login: undefined
  Dashboard: { userId: string }
  Profile: { userId: string }
}

const Stack = createNativeStackNavigator<RootStackParams>()

// ✓ — typed params
navigation.navigate('Dashboard', { userId: '123' })

// ✗ — untyped, no autocomplete, breaks on rename
navigation.navigate('Dashboard', { id: '123' })
```

## Platform differences

```typescript
import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,   // status bar height differs
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1 },
      android: { elevation: 4 },
    }),
  },
})
```

Test on both iOS and Android before marking any UI feature done. Common traps:
- Keyboard behavior differs — use `KeyboardAvoidingView` with `behavior="padding"` on iOS, `behavior="height"` on Android.
- Safe area insets differ — always use `useSafeAreaInsets()` or `SafeAreaView`, never hardcode padding values.
- Text rendering differs — `fontWeight: '600'` looks different on each platform; test visually.

## Data fetching

Use React Query or SWR for server state — not `useEffect` + `useState`:

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['orders', userId],
  queryFn: () => orderService.getByUser(userId),
  staleTime: 60_000,   // don't refetch if data is < 1 minute old
})
```

## Async storage

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage'

// ✓ — typed wrapper
async function saveSession(session: Session): Promise<void> {
  await AsyncStorage.setItem('session', JSON.stringify(session))
}
async function loadSession(): Promise<Session | null> {
  const raw = await AsyncStorage.getItem('session')
  return raw ? JSON.parse(raw) : null
}
```

Never store sensitive data (tokens, passwords) in `AsyncStorage` — use `expo-secure-store` instead:

```typescript
import * as SecureStore from 'expo-secure-store'
await SecureStore.setItemAsync('auth_token', token)
const token = await SecureStore.getItemAsync('auth_token')
```

## Permissions

Request permissions at the moment of use, not on app start:

```typescript
const { status } = await Camera.requestCameraPermissionsAsync()
if (status !== 'granted') {
  Alert.alert('Camera required', 'Please allow camera access in settings.')
  return
}
```

## Performance

- Use `FlatList` for any list longer than 10 items — never `ScrollView` + `map`.
- Use `React.memo` for list item components to prevent re-renders on scroll.
- Use `useCallback` for `renderItem` passed to `FlatList`.
- Avoid anonymous functions in JSX props for performance-critical components.

## EAS Build / store submission checklist

Before submitting to App Store or Google Play:
- [ ] `app.json` version and `buildNumber`/`versionCode` incremented
- [ ] All permissions declared in `app.json` with a usage description
- [ ] No console.log in production build (`babel-plugin-transform-remove-console`)
- [ ] `eas build --platform all --profile production` passes
- [ ] App tested on a real device, not only simulator

## Checklist before marking scope done

- [ ] Works on both iOS and Android (or clearly flagged if platform-specific)
- [ ] Safe area insets handled — no hardcoded padding
- [ ] Sensitive data in `expo-secure-store`, not `AsyncStorage`
- [ ] `FlatList` used for variable-length lists
- [ ] Permissions requested at point of use
- [ ] TypeScript strict — no `any` in navigation params
