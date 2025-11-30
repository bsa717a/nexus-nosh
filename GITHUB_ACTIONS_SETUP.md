# GitHub Actions Deployment Setup

This guide explains how to set up GitHub Actions to automatically deploy the `main` branch to `nexusnosh.clifsmama.com` (Google Cloud App Engine).

## Prerequisites

1. A Google Cloud service account with App Engine deployment permissions
2. Access to your GitHub repository settings

## Step 1: Create a Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin** > **Service Accounts**
3. Click **Create Service Account**
4. Name it `github-actions-deploy` (or similar)
5. Grant the following roles:
   - **App Engine Admin** (for deployment)
   - **Cloud Build Service Account** (if using Cloud Build)
   - **Storage Admin** (for uploading build artifacts)
6. Click **Create and Continue**, then **Done**

## Step 2: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Choose **JSON** format
5. Download the JSON key file (keep it secure!)

## Step 3: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** and add the following secrets:

### Required Secrets

#### GCP Service Account Key
- **Name**: `GCP_SA_KEY`
- **Value**: Paste the entire contents of the JSON key file you downloaded

#### Firebase Configuration
- **Name**: `FIREBASE_API_KEY`
- **Value**: `AIzaSyBwDU2LlhEXIzB5iw4zhq_uepf2K4skPSc`

- **Name**: `FIREBASE_AUTH_DOMAIN`
- **Value**: `nexus-nosh.firebaseapp.com`

- **Name**: `FIREBASE_PROJECT_ID`
- **Value**: `nexus-nosh`

- **Name**: `FIREBASE_STORAGE_BUCKET`
- **Value**: `nexus-nosh.firebasestorage.app`

- **Name**: `FIREBASE_MESSAGING_SENDER_ID`
- **Value**: `251223233015`

- **Name**: `FIREBASE_APP_ID`
- **Value**: `1:251223233015:web:26460b83dd6a21f5ce1ef2`

#### Mapbox Token
- **Name**: `MAPBOX_TOKEN`
- **Value**: `pk.eyJ1IjoiYnNhNzE3IiwiYSI6ImNtaG13YnZvczIxcHIybXB1N2E0NnJpcHcifQ.Z-AeF3-pt2ihl2uz71Lvxg`

## Step 4: Verify Workflow

Once all secrets are configured:

1. Push a commit to the `main` branch (or merge a PR)
2. Go to the **Actions** tab in your GitHub repository
3. You should see the "Deploy to App Engine" workflow running
4. The workflow will:
   - Install dependencies
   - Build the Next.js app
   - Authenticate with Google Cloud
   - Deploy to App Engine

## How It Works

The workflow (`.github/workflows/deploy.yml`) automatically:

1. **Triggers** on every push to `main` branch
2. **Builds** the Next.js application with environment variables from secrets
3. **Authenticates** with Google Cloud using the service account key
4. **Deploys** to App Engine, which serves `nexusnosh.clifsmama.com`

## Troubleshooting

### Build Fails
- Check that all GitHub secrets are set correctly
- Verify the service account has the correct permissions
- Check the Actions logs for specific error messages

### Deployment Fails
- Ensure the service account has **App Engine Admin** role
- Verify the GCP project ID is `nexus-nosh`
- Check that `app.yaml` is valid

### Authentication Errors
- Verify the `GCP_SA_KEY` secret contains valid JSON
- Ensure the service account hasn't been deleted or disabled
- Check that the service account has the required IAM roles

## Security Notes

⚠️ **Important**: 
- Never commit the service account JSON key to the repository
- Keep the downloaded key file secure and delete it after adding to GitHub secrets
- Rotate service account keys periodically
- Consider using Workload Identity Federation for better security (more advanced setup)

## Manual Deployment

If you need to deploy manually, you can still use the local script:

```bash
./scripts/deploy.sh
```

Or directly:

```bash
npm run build
gcloud app deploy
```

