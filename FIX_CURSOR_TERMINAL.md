# How to Fix Cursor Terminal Issues

## Quick Fixes (Try These First)

### 1. Open Terminal Panel
- **Mac**: Press `` Cmd + ` `` (Command + Backtick)
- **Windows/Linux**: Press `` Ctrl + ` ``
- Or: Go to `View` → `Terminal`

### 2. Reset Terminal Settings
1. Open Cursor Settings: `Cmd/Ctrl + ,`
2. Search for: `terminal.integrated.defaultProfile.osx`
3. Set it to: `zsh` (or `bash`)
4. Search for: `terminal.integrated.shell.osx`
5. Make sure it's set to: `/bin/zsh`

### 3. Reload Cursor Window
- Press `Cmd/Ctrl + Shift + P`
- Type: `Developer: Reload Window`
- Press Enter

### 4. Clear Terminal Buffer
If terminal opens but is frozen:
- Right-click in terminal panel
- Select "Kill Terminal"
- Open new terminal: `` Cmd/Ctrl + ` ``

## Advanced Fixes

### Fix 1: Create/Update Cursor Settings

Create or edit `~/.cursor/settings.json` (or use Settings UI):

```json
{
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.profiles.osx": {
    "zsh": {
      "path": "/bin/zsh",
      "args": ["-l"]
    },
    "bash": {
      "path": "/bin/bash",
      "args": ["-l"]
    }
  },
  "terminal.integrated.shellIntegration.enabled": true,
  "terminal.integrated.enablePersistentSessions": false
}
```

### Fix 2: Check Shell Configuration

Test if your shell works:

```bash
# In a system terminal (Terminal.app), run:
zsh --version
echo $PATH
```

If these work, the issue is Cursor-specific.

### Fix 3: Disable Shell Integration

Sometimes Cursor's shell integration causes issues:

1. Open Settings
2. Search: `terminal.integrated.shellIntegration.enabled`
3. Set to `false`
4. Restart Cursor

### Fix 4: Manual Terminal Profile

1. Open Settings (`Cmd/Ctrl + ,`)
2. Search: `terminal.integrated.profiles.osx`
3. Click "Edit in settings.json"
4. Add:

```json
{
  "terminal.integrated.profiles.osx": {
    "zsh (Login Shell)": {
      "path": "/bin/zsh",
      "args": ["-l"],
      "icon": "terminal"
    }
  },
  "terminal.integrated.defaultProfile.osx": "zsh (Login Shell)"
}
```

### Fix 5: Reset Cursor Terminal Settings

1. Close Cursor completely
2. Delete Cursor terminal settings:
   ```bash
   rm -rf ~/Library/Application\ Support/Cursor/User/workspaceStorage
   ```
3. Restart Cursor

**Warning**: This will reset your workspace settings

## If Terminal Still Doesn't Work

### Option A: Use System Terminal

You can run commands in your system Terminal.app and navigate to:

```bash
cd /Users/derekfowler/repo/NexusNosh/nexus-nosh-demo/nexus-nosh-demo
```

### Option B: Use Cursor's Command Palette

1. Press `Cmd/Ctrl + Shift + P`
2. Type commands like: `npm run dev`
3. Select "Tasks: Run Task"

### Option C: Check Cursor Logs

1. Press `Cmd/Ctrl + Shift + P`
2. Type: `Developer: Show Logs`
3. Look for terminal-related errors

## Quick Test

After applying fixes, test with:

```bash
echo "Terminal is working!"
pwd
```

If you see output, terminal is fixed! 🎉
