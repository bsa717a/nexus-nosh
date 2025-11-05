# Fix Terminal Directory Issue

The terminal is trying to open in `/Users/derekfowler/repo/Let'sEat` which doesn't exist.

## Quick Fix Options:

### Option 1: Update Cursor Settings (Easiest)

1. Press `Cmd + ,` to open Settings
2. Search for: `terminal.integrated.cwd`
3. Set it to: `${workspaceFolder}`
   - OR clear the value entirely
   - OR set to: `/Users/derekfowler/repo/NexusNosh/nexus-nosh-demo/nexus-nosh-demo`

### Option 2: Open Correct Workspace

1. In Cursor, go to `File` → `Open Folder...`
2. Navigate to: `/Users/derekfowler/repo/NexusNosh/nexus-nosh-demo/nexus-nosh-demo`
3. Click "Open"
4. Now try opening terminal again: `` Cmd + ` ``

### Option 3: Edit User Settings JSON

1. Press `Cmd + Shift + P`
2. Type: `Preferences: Open User Settings (JSON)`
3. Find and remove or update this line:
   ```json
   "terminal.integrated.cwd": "/Users/derekfowler/repo/Let'sEat"
   ```
4. Replace with:
   ```json
   "terminal.integrated.cwd": "${workspaceFolder}"
   ```
5. Save the file

### Option 4: Reset Terminal Settings

1. Press `Cmd + Shift + P`
2. Type: `Preferences: Open User Settings (JSON)`
3. Add or update:
   ```json
   {
     "terminal.integrated.cwd": "${workspaceFolder}",
     "terminal.integrated.defaultProfile.osx": "zsh"
   }
   ```

### Option 5: Delete Workspace Storage (Nuclear Option)

If nothing else works:

```bash
# Close Cursor first, then run:
rm -rf ~/Library/Application\ Support/Cursor/User/workspaceStorage/*
```

Then reopen Cursor and open your project folder.

## After Fixing:

Test the terminal:
1. Press `` Cmd + ` `` to open terminal
2. It should show: `/Users/derekfowler/repo/NexusNosh/nexus-nosh-demo/nexus-nosh-demo`
3. Run: `pwd` to confirm
