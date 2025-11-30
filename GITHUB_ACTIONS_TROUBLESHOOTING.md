# GitHub Actions Troubleshooting Guide

## Quick Diagnosis

Run the diagnostic script:
```bash
./scripts/check-github-actions-setup.sh
```

## Common Issues and Solutions

### Issue 1: Workflow Not Triggering

**Symptoms:**
- No workflow runs appear in Actions tab
- Pushing to main doesn't trigger deployment

**Solutions:**
1. **Check if GitHub Actions is enabled:**
   - Go to: `https://github.com/bsa717a/nexus-nosh/settings/actions`
   - Ensure "Allow all actions and reusable workflows" is selected
   - Or at minimum, allow "Local and third-party Actions"

2. **Verify workflow file location:**
   - Must be at: `.github/workflows/deploy.yml`
   - Check it's committed and pushed to the repository

3. **Check branch name:**
   - Workflow triggers on `main` branch
   - Ensure you're pushing to `main`, not `master` or another branch

4. **Manual trigger test:**
   - Go to: `https://github.com/bsa717a/nexus-nosh/actions`
   - Click "Deploy to App Engine" workflow
   - Click "Run workflow" button
   - Select `main` branch and run
   - This will help determine if it's a trigger issue or execution issue

### Issue 2: Workflow Runs But Fails

**Symptoms:**
- Workflow appears in Actions tab but shows ❌ (failed)
- Check the logs for specific error messages

**Common Failures:**

#### Secret Not Found
```
Error: GCP_SA_KEY secret is not set
```
**Solution:** Add all required secrets in GitHub Settings → Secrets → Actions

#### Build Fails
```
Error: Build failed
```
**Solution:** 
- Check build logs for specific errors
- Verify all environment variables are set
- Ensure `package.json` is valid

#### Deployment Fails
```
Error: (gcloud.app.deploy) Error Response: [13] An internal error occurred
```
**Solution:**
- Check service account permissions
- Verify `app.yaml` is valid
- Check if files are being uploaded (should see "Uploading X files")

#### Permission Denied
```
PERMISSION_DENIED: The caller does not have permission
```
**Solution:**
- Run: `./scripts/setup-gcp-service-account.sh` to ensure all roles are granted
- Verify service account has:
  - `roles/appengine.deployer`
  - `roles/appengine.serviceAdmin`
  - `roles/storage.admin`
  - `roles/iam.serviceAccountUser`

### Issue 3: Deployment Succeeds But Site Doesn't Update

**Symptoms:**
- Workflow completes successfully
- New version is created
- But site still shows old content

**Solution:**
- Check if traffic was migrated:
  ```bash
  gcloud app services describe default --project=nexus-nosh --format="value(split.allocations)"
  ```
- Manually migrate traffic if needed:
  ```bash
  LATEST=$(gcloud app versions list --format="value(id)" --sort-by=~creationTime --limit=1)
  gcloud app services set-traffic default --splits=$LATEST=1 --project=nexus-nosh
  ```

## Verification Checklist

- [ ] Workflow file exists at `.github/workflows/deploy.yml`
- [ ] GitHub Actions is enabled for the repository
- [ ] All 8 required secrets are configured
- [ ] Service account exists and has correct permissions
- [ ] Workflow triggers on push to `main`
- [ ] Manual trigger works (test via Actions UI)

## Manual Deployment (Fallback)

If GitHub Actions continues to fail, you can deploy manually:

```bash
./scripts/deploy.sh
```

This will:
1. Build your app
2. Deploy to App Engine
3. Open the deployed site

## Getting Help

1. **Check GitHub Actions logs:**
   - Go to Actions tab
   - Click on the failed workflow run
   - Expand each step to see detailed logs

2. **Check service account:**
   ```bash
   ./scripts/check-github-actions-setup.sh
   ```

3. **Verify secrets:**
   - Go to: `https://github.com/bsa717a/nexus-nosh/settings/secrets/actions`
   - Ensure all 8 secrets are present

4. **Test deployment locally:**
   ```bash
   npm run build
   gcloud app deploy --project=nexus-nosh
   ```

## Current Status

✅ Service account configured with correct permissions
✅ Workflow file exists and is properly configured
✅ Manual deployment works successfully

⚠️ **If workflow still doesn't run:**
- Check GitHub Actions settings
- Verify repository permissions
- Try manual trigger from Actions UI

