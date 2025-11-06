# Workspace Configuration for NexusNosh

This workspace is configured to use **derek.fowler@gmail.com** for all services.

## Current Configuration

### Git
- **Name:** Derek Fowler
- **Email:** derek.fowler@gmail.com
- **Scope:** Repository-specific (stored in `.git/config`)

### Google Cloud (gcloud)
- **Configuration:** `nexusnosh-workspace`
- **Account:** derek.fowler@gmail.com
- **Project:** nexus-nosh

### Firebase
- **Project:** nexus-nosh
- **Config:** Located in `lib/firebase/config.ts`

## Setup Instructions

### Initial Setup

Run the setup script:
```bash
./workspace-setup.sh
```

### Manual Setup

If you need to configure manually:

#### Git
```bash
git config --local user.name "Derek Fowler"
git config --local user.email "derek.fowler@gmail.com"
```

#### gcloud
```bash
# Activate workspace configuration
gcloud config configurations activate nexusnosh-workspace

# Set account and project
gcloud config set account derek.fowler@gmail.com
gcloud config set project nexus-nosh

# Authenticate if needed
gcloud auth login derek.fowler@gmail.com
```

#### Firebase CLI
```bash
# Switch to project account
firebase login --no-localhost
# Then select: derek.fowler@gmail.com
```

## Verifying Configuration

```bash
# Check Git
git config --local user.email

# Check gcloud
gcloud config get-value account
gcloud config get-value project
gcloud config configurations list

# Check Firebase
firebase projects:list
```

## Notes

- This configuration only affects **this workspace** (repository)
- Your global Git and gcloud settings remain unchanged
- The `nexusnosh-workspace` gcloud configuration is workspace-specific
- Firebase project selection is handled by `lib/firebase/config.ts` based on environment variables

