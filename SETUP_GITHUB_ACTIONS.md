# Complete GitHub Actions Setup Guide

This guide walks you through setting up both the Google Cloud service account and GitHub secrets for automatic deployment.

## Prerequisites

- Google Cloud account with access to `nexus-nosh` project
- GitHub repository access
- `gcloud` CLI installed and authenticated

## Part 1: Create Google Cloud Service Account

### Option A: Using the Automated Script (Recommended)

1. **Run the setup script:**
   ```bash
   ./scripts/setup-gcp-service-account.sh
   ```

2. **The script will:**
   - Verify you're logged into gcloud
   - Set the project to `nexus-nosh`
   - Create service account `github-actions-deploy`
   - Grant required IAM roles
   - Create and download a JSON key file (`github-actions-key.json`)

3. **Save the key file contents** - you'll need this for GitHub secrets!

### Option B: Manual Setup

1. **Go to Google Cloud Console:**
   - Navigate to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=nexus-nosh

2. **Create Service Account:**
   - Click "Create Service Account"
   - Name: `github-actions-deploy`
   - Description: "Service account for GitHub Actions to deploy to App Engine"
   - Click "Create and Continue"

3. **Grant Roles:**
   - **App Engine Admin** (`roles/appengine.admin`)
   - **Storage Admin** (`roles/storage.admin`)
   - **Service Account User** (`roles/iam.serviceAccountUser`)
   - Click "Continue" then "Done"

4. **Create Key:**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the key file

## Part 2: Configure GitHub Secrets

### Step 1: Navigate to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**

### Step 2: Add Each Secret

Add the following secrets one by one:

#### 1. GCP_SA_KEY
- **Name:** `GCP_SA_KEY`
- **Value:** Open `github-actions-key.json` and copy the **entire contents** (all JSON)
- **Important:** This is the service account key you downloaded in Part 1

#### 2. Firebase Configuration Secrets

Add these Firebase secrets:

- **Name:** `FIREBASE_API_KEY`
  **Value:** `AIzaSyBwDU2LlhEXIzB5iw4zhq_uepf2K4skPSc`

- **Name:** `FIREBASE_AUTH_DOMAIN`
  **Value:** `nexus-nosh.firebaseapp.com`

- **Name:** `FIREBASE_PROJECT_ID`
  **Value:** `nexus-nosh`

- **Name:** `FIREBASE_STORAGE_BUCKET`
  **Value:** `nexus-nosh.firebasestorage.app`

- **Name:** `FIREBASE_MESSAGING_SENDER_ID`
  **Value:** `251223233015`

- **Name:** `FIREBASE_APP_ID`
  **Value:** `1:251223233015:web:26460b83dd6a21f5ce1ef2`

#### 3. Mapbox Token

- **Name:** `MAPBOX_TOKEN`
- **Value:** `pk.eyJ1IjoiYnNhNzE3IiwiYSI6ImNtaG13YnZvczIxcHIybXB1N2E0NnJpcHcifQ.Z-AeF3-pt2ihl2uz71Lvxg`

### Step 3: Verify Secrets

You should have **8 secrets** total:
1. `GCP_SA_KEY`
2. `FIREBASE_API_KEY`
3. `FIREBASE_AUTH_DOMAIN`
4. `FIREBASE_PROJECT_ID`
5. `FIREBASE_STORAGE_BUCKET`
6. `FIREBASE_MESSAGING_SENDER_ID`
7. `FIREBASE_APP_ID`
8. `MAPBOX_TOKEN`

## Part 3: Test the Deployment

1. **Push to main branch** (or merge a PR):
   ```bash
   git checkout main
   git push origin main
   ```

2. **Check GitHub Actions:**
   - Go to your repository's **Actions** tab
   - You should see "Deploy to App Engine" workflow running
   - Wait for it to complete (usually 3-5 minutes)

3. **Verify deployment:**
   - Visit: https://nexusnosh.clifsmama.com
   - The site should be updated with your latest changes

## Security Checklist

After setup, ensure:

- ✅ `github-actions-key.json` is deleted from your local machine
- ✅ The key file is added to `.gitignore` (if not already)
- ✅ All secrets are added to GitHub (not committed to repo)
- ✅ Service account has minimal required permissions

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

## Quick Reference

**Helper Scripts:**
- `./scripts/setup-gcp-service-account.sh` - Create GCP service account
- `./scripts/setup-github-secrets.sh` - Display secrets checklist

**GitHub Secrets URL:**
- `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`

**Workflow File:**
- `.github/workflows/deploy.yml`

## Next Steps

Once setup is complete:
1. Every push to `main` will automatically deploy
2. Monitor deployments in the GitHub Actions tab
3. Check deployment logs if issues occur
4. The site will be available at: https://nexusnosh.clifsmama.com

