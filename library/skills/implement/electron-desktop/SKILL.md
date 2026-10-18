---
name: electron-desktop
description: Build Electron app features correctly — security baseline, IPC contracts, path handling after packaging, CSP, window state, memory management, and auto-update.
---

TRIGGER: implementing any feature in an Electron app (main process, preload, renderer, IPC, native integration, packaging)
OUTPUT: compact — feature works in both dev and packaged app, context isolation intact, IPC typed, paths resolve after packaging
SKIP: pure web/Next.js work with no Electron involvement

---

# Electron Desktop

## Security baseline — enforce before any other work

```typescript
// main.ts — BrowserWindow creation
new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,       // NEVER true — renderer can import arbitrary Node modules
    contextIsolation: true,       // ALWAYS true — separates preload world from renderer world
    sandbox: true,                // prefer true for renderer pages (limits native module access)
    webSecurity: true,            // NEVER false — allows cross-origin requests from renderer
    allowRunningInsecureContent: false,
    preload: path.join(__dirname, 'preload.js'),
  }
})
```

`nodeIntegration: true` + `contextIsolation: false` = XSS in renderer → arbitrary Node.js execution. This is a critical security vulnerability.

**Content Security Policy** — set on every BrowserWindow:

```typescript
// In main process, after window is ready
mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': [
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +      // unsafe-inline needed for CSS-in-JS libs
        "img-src 'self' data: https:; " +
        "connect-src 'self' https://api.yourservice.com; " +
        "font-src 'self' data:; " +
        "object-src 'none'; " +
        "frame-ancestors 'none'"
      ]
    }
  })
})
```

Adjust `connect-src` to list allowed API domains. Never use `default-src *`.

---

## Path handling — dev vs packaged (most common packaging bug)

`__dirname` and relative paths break after packaging. Always use `app.getAppPath()` or `app.getPath()`:

```typescript
import { app } from 'electron'
import path from 'path'

// ✗ — works in dev, breaks in packaged app
const preloadPath = path.join(__dirname, 'preload.js')
const iconPath = path.join(__dirname, '../../assets/icon.png')

// ✓ — works in both dev and packaged
const isDev = !app.isPackaged
const appRoot = app.getAppPath()

const preloadPath = path.join(appRoot, isDev ? 'src/preload.js' : 'dist/preload.js')
const iconPath = path.join(appRoot, 'assets/icon.png')   // assets bundled into asar

// ✓ — user data directory (writable, survives updates)
const userDataPath = app.getPath('userData')   // ~/Library/Application Support/<AppName> on macOS
const dbPath = path.join(userDataPath, 'app.db')
const logPath = path.join(userDataPath, 'logs')

// ✓ — loading local HTML in packaged app
mainWindow.loadFile(path.join(appRoot, 'dist/renderer/index.html'))
// or with custom protocol (see below)
```

**Protocol handler for serving local files** (cleaner alternative to `loadFile`):

```typescript
import { protocol, net } from 'electron'

// Register before app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true }
}])

app.whenReady().then(() => {
  protocol.handle('app', (request) => {
    const url = request.url.replace('app://', '')
    const filePath = path.join(app.getAppPath(), 'dist/renderer', url)
    return net.fetch(`file://${filePath}`)
  })

  mainWindow.loadURL('app://index.html')
})
```

---

## IPC pattern — the only correct pattern

```
Renderer (React) → window.api.createProject(name)
    ↓
Preload (contextBridge) → ipcRenderer.invoke('project:create', { name })
    ↓
Main → ipcMain.handle('project:create', handler)
    ↓
Returns { ok: true, data: Project } | { ok: false, code: string }
```

**Preload — expose typed, minimal surface:**

```typescript
// preload.ts
import { contextBridge, ipcRenderer } from 'electron'

// Never: contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
// ✓ — expose only specific functions
contextBridge.exposeInMainWorld('api', {
  projects: {
    create: (name: string) => ipcRenderer.invoke('project:create', { name }),
    list: () => ipcRenderer.invoke('project:list'),
    delete: (id: string) => ipcRenderer.invoke('project:delete', { id }),
  },
  // For push events from main → renderer
  onProjectUpdated: (cb: (project: Project) => void) => {
    const handler = (_: unknown, data: Project) => cb(data)
    ipcRenderer.on('project:updated', handler)
    return () => ipcRenderer.removeListener('project:updated', handler)   // ← cleanup function
  },
})
```

**Main handler — never throw, always return typed result:**

```typescript
// handlers/projects.ts
import { ipcMain, IpcMainInvokeEvent } from 'electron'

ipcMain.handle('project:create', async (_event: IpcMainInvokeEvent, payload: { name: string }) => {
  try {
    const project = await projectService.create(payload.name)
    return { ok: true as const, data: project }
  } catch (err) {
    logger.error('ipc:project:create', { err })
    return { ok: false as const, code: err instanceof AppError ? err.code : 'INTERNAL_ERROR' }
  }
})
```

Throwing from an IPC handler causes the `invoke` call in the renderer to reject — callers must then handle an untyped promise rejection instead of a structured result.

**Type declarations (electron.d.ts):**

```typescript
// electron.d.ts — at project root
declare global {
  interface Window {
    api: {
      projects: {
        create(name: string): Promise<{ ok: true; data: Project } | { ok: false; code: string }>
        list(): Promise<{ ok: true; data: Project[] } | { ok: false; code: string }>
        delete(id: string): Promise<{ ok: true } | { ok: false; code: string }>
      }
      onProjectUpdated(cb: (project: Project) => void): () => void
    }
  }
}
export {}
```

---

## Window state persistence

Users expect windows to reopen where they left them:

```typescript
import { screen, BrowserWindow } from 'electron'
import Store from 'electron-store'   // or write your own JSON to userData

interface WindowState { x: number; y: number; width: number; height: number; isMaximized: boolean }

const store = new Store<{ windowState: WindowState }>()

function getWindowState(): WindowState {
  const saved = store.get('windowState')
  const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize
  const defaults = { x: (sw - 1200) / 2, y: (sh - 800) / 2, width: 1200, height: 800, isMaximized: false }

  if (!saved) return defaults
  // Validate saved position is still on a visible screen
  const visible = screen.getAllDisplays().some(d => {
    const { x, y, width, height } = d.workArea
    return saved.x >= x && saved.y >= y && saved.x + saved.width <= x + width && saved.y + saved.height <= y + height
  })
  return visible ? saved : defaults
}

function saveWindowState(win: BrowserWindow) {
  if (win.isMaximized()) {
    store.set('windowState', { ...store.get('windowState'), isMaximized: true })
    return
  }
  const bounds = win.getBounds()
  store.set('windowState', { ...bounds, isMaximized: false })
}

// Usage
const state = getWindowState()
const mainWindow = new BrowserWindow({ ...state, /* other options */ })
if (state.isMaximized) mainWindow.maximize()

mainWindow.on('close', () => saveWindowState(mainWindow))
// Debounce for resize/move events
let saveTimeout: NodeJS.Timeout
mainWindow.on('resize', () => { clearTimeout(saveTimeout); saveTimeout = setTimeout(() => saveWindowState(mainWindow), 500) })
mainWindow.on('move', () => { clearTimeout(saveTimeout); saveTimeout = setTimeout(() => saveWindowState(mainWindow), 500) })
```

---

## Memory management — prevent main process leaks

The main process runs for the lifetime of the app. Leaks here are serious:

```typescript
// ✓ — remove listeners when window closes
mainWindow.on('closed', () => {
  ipcMain.removeHandler('project:create')
  ipcMain.removeHandler('project:list')
  // If you stored a reference: mainWindow = null
})

// ✓ — remove push-event listeners when renderer navigates
mainWindow.webContents.on('did-navigate', () => {
  // Re-register push subscriptions — old ones may be stale
})

// ✗ — storing large objects in global/module scope
let cache: Record<string, HugeObject> = {}   // grows unbounded
// Fix: use LRU cache with size limit, or query DB each time

// ✗ — setInterval without cleanup
const timer = setInterval(checkForUpdates, 60_000)
// Fix: clear when app quits
app.on('before-quit', () => clearInterval(timer))
```

---

## Secrets and credentials

- **Never** in `electron-store`, `localStorage`, `sessionStorage`, or any plain file — all are readable from the filesystem.
- **Never** in the app bundle — assume the `.asar` file is extractable.
- Use OS keychain for persistent credentials:

```typescript
import keytar from 'keytar'

const SERVICE = 'com.yourapp'
await keytar.setPassword(SERVICE, 'api_token', token)
const token = await keytar.getPassword(SERVICE, 'api_token')
await keytar.deletePassword(SERVICE, 'api_token')   // on logout
```

- API keys fetched from backend after user auth → hold in memory for session lifetime, never write to disk.

---

## Auto-update

```typescript
import { autoUpdater } from 'electron-updater'

autoUpdater.logger = logger   // log update events
autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = false   // let user decide

app.whenReady().then(() => {
  if (app.isPackaged) autoUpdater.checkForUpdates()
})

autoUpdater.on('update-downloaded', (info) => {
  // Notify renderer — let user choose when to restart
  mainWindow.webContents.send('update:ready', { version: info.version })
})

// In IPC handler
ipcMain.handle('update:install', () => autoUpdater.quitAndInstall())
```

Never call `quitAndInstall()` without explicit user action — it kills unsaved work.

---

## Deep links / protocol handlers

```typescript
// Register protocol in main
if (process.defaultApp) {
  app.setAsDefaultProtocolClient('yourapp', process.execPath, [path.resolve(process.argv[1])])
} else {
  app.setAsDefaultProtocolClient('yourapp')
}

// Handle on macOS
app.on('open-url', (event, url) => {
  event.preventDefault()
  handleDeepLink(url)
})

// Handle on Windows/Linux (single instance)
const gotLock = app.requestSingleInstanceLock()
if (!gotLock) { app.quit(); process.exit(0) }

app.on('second-instance', (_, argv) => {
  const url = argv.find(arg => arg.startsWith('yourapp://'))
  if (url) handleDeepLink(url)
  if (mainWindow) { mainWindow.show(); mainWindow.focus() }
})
```

---

## Crash reporter

```typescript
import { crashReporter } from 'electron'

crashReporter.start({
  productName: 'YourApp',
  submitURL: 'https://your-crash-endpoint.com/upload',
  uploadToServer: app.isPackaged,   // only in production
})
```

Log crash reports in the renderer too:

```typescript
window.addEventListener('unhandledrejection', (event) => {
  logger.error('unhandled-rejection', { reason: event.reason })
})
window.addEventListener('error', (event) => {
  logger.error('uncaught-error', { message: event.message, stack: event.error?.stack })
})
```

---

## Checklist before marking scope done

- [ ] `nodeIntegration: false`, `contextIsolation: true`, `webSecurity: true` in all BrowserWindow instances
- [ ] CSP headers set — no `*` wildcard
- [ ] All file paths use `app.getAppPath()` or `app.getPath()` — no raw `__dirname` for asset paths
- [ ] Test in packaged build (`npm run package`) — not only in dev
- [ ] No direct `ipcRenderer` exposure via contextBridge
- [ ] All IPC handlers return `{ ok, data | code }` — never throw
- [ ] Types declared in `electron.d.ts` for all bridge functions
- [ ] No secrets in `electron-store`, `localStorage`, or app bundle
- [ ] Window state persisted and validated against visible screen bounds
- [ ] IPC handlers removed when window closes — no listener leak
- [ ] Long-running timers cleared on `before-quit`
