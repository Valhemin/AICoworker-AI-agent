---
name: rea-investigate
description: Investigate the behavior of an existing tool to rebuild a similar one. Separate observations, inferences, and unknowns.
---

# REA investigate

REA is a separate MCP program. The server name is `rea`. Use this skill when the user wants to rebuild a tool similar to an existing tool. Do not use to fix bugs. `debug` and `tester` do not call this skill.

If the tool is not visible in the session, stop. Do not install Hopper, Ghidra, or IDA in this step. Do not embed REA code in the product repo.

## Connect

If the REA tool is already in the session, continue. Do not run doctor or setup before each call.

Tool not available, or a required provider is missing: stop. Say that `mcp-connect` is needed for the `rea` MCP. Do not edit config files yourself, do not install Hopper, Ghidra, IDA, JADX, Java, or Node. JavaScript and static .NET do not need a native engine. State what can be done without the engine and what must wait.

## Choose the right file type

Choose one entry point based on the file the user provides. Do not call a tool not in the current session.

- JavaScript tree, Electron, or ASAR: `analyze_javascript_application`.
- ZIP, APK, IPA, MSIX, AppX, DMG — when only a file listing is needed: `open_binary`, then `inspect_artifact` if the question needs a graph.
- Code inside an APK: `inspect_android_package`.
- .NET assembly: `inspect_managed_artifact`.
- Go binary, metadata only: `inspect_go_binary`. Absence of metadata does not prove it is not Go.
- ELF, PE, or Mach-O Rust with an auditable section: `inspect_rust_binary`. Missing section does not prove no dependency.
- Local WASM file: `inspect_wasm_artifact`. WAT is not the original source.
- Executable or native library: `open_binary`, then ask about exactly the function or string related to the behavior. When done, `close_binary`. IDA and Ghidra are read-only. Do not save a GUI database that is attached.
- Public web page with documentation: do not use this skill.

Do not capture network traffic, do not attach a debugger to modify a running process, do not reverse firmware, do not read packets. Those are outside this agent.

## Work from the summary first

For large files, request the `summary` version first. Only ask about one module, function, or page when that question is still open. Do not call the same analysis again when the input has not changed.

Do not infer behavior from a file name or a single string. When evidence is missing, write unknown — do not write "not present".

## Scope

Only proceed when the user provides the file and it is their software, or they have permission to inspect it. If unclear, ask one question and stop.

Identify before diving deep: language, packager, compiler, and entry point. Choose the least invasive path.

Requests to bypass license, DRM, login, or payment: do not write a patch, hook, or modified package. Write the control logic in plain language so a new design can implement it itself. Do not modify the existing build.

Secrets: write only the location and type. Redact values. Do not write tokens, keys, or passwords.

Do not claim the source has been fully recovered until the recovered structure has been cross-referenced against the manifest and entry points.

Electron: if the tool returns data, write `webPreferences`, preload, and IPC. That is an observation. Do not patch the binary.

## Classification

Each conclusion belongs to one type:

- Observation: what the tool returned, with evidence ID if available.
- Inference: connected from observations. State the assumption.
- Unknown: missing permission, missing engine, or coverage not sufficient.

Static analysis is not the same as observed runtime behavior. Comparing two versions shows where they differ — it does not prove that location caused a behavior.

## File

Write `rea-findings.md` with all sections: question, target path, file type, observations, inferences, unknowns, coverage limits, and evidence IDs. Explain rules in plain language. Do not paste decompiled code into the product repo.

## Forbidden

Do not bypass DRM, copyright, anti-cheat, or paywall. Do not copy proprietary assets or code into the product. Do not collect credentials. Do not crack analysis tools.

Delete drafts. End with one next step.
