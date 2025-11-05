# Google Cloud Deployment Checklist

## Prerequisites ✅

- [x] Google Cloud CLI installed (`gcloud`)
- [x] Next.js project configured for standalone output
- [x] `app.yaml` configured
- [x] `.gcloudignore` file created

## Step-by-Step Deployment

### 1. Login to Google Cloud (Different Account)

```bash
gcloud auth login
```

This will open a browser window. Use your **different Google Cloud account** (not the GitHub account).

### 2. Create or Select a Google Cloud Project

```bash
# List existing projects
gcloud projects list

# Create a new project (if needed)
gcloud projects create nexus-nosh-prod --name="Nexus Nosh"

# Set the active project
gcloud config set project nexus-nosh-prod
```

**Note:** Replace `nexus-nosh-prod` with your desired project ID.

### 3. Enable Required APIs

```bash
# Enable App Engine API
gcloud services enable appengine.googleapis.com

# Enable Cloud Build API (if using Cloud Build)
gcloud services enable cloudbuild.googleapis.com
```

### 4. Initialize App Engine (First Time Only)

```bash
gcloud app create --region=us-central
```

**Choose a region** closest to your users:
- `us-central` (Iowa, USA)
- `us-east1` (South Carolina, USA)
- `us-west1` (Oregon, USA)
- `europe-west1` (Belgium)
- `asia-northeast1` (Tokyo)

### 5. Set Up Firebase (If Not Done Yet)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Firestore Database** (Native mode)
4. Enable **Authentication** (Email/Password, Google, etc.)
5. Get your Firebase config from Project Settings > General > Your apps

### 6. Configure Environment Variables

You have two options:

#### Option A: Add to `app.yaml` (Simple but less secure)

Edit `app.yaml` and uncomment/add your Firebase credentials:

```yaml
env_variables:
  NEXT_PUBLIC_FIREBASE_API_KEY: "AIza..."
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "nexus-nosh.firebaseapp.com"
  # ... etc
```

#### Option B: Use Secret Manager (Recommended for production)

```bash
# Create secrets
gcloud secrets create firebase-api-key --data-file=- <<< "your_api_key"
gcloud secrets create firebase-project-id --data-file=- <<< "your_project_id"
# ... etc

# Grant App Engine access
gcloud secrets add-iam-policy-binding firebase-api-key \
  --member="serviceAccount:PROJECT_NUMBER@appspot.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

Then use Cloud Functions or a startup script to load secrets.

### 7. Build and Test Locally (Optional)

```bash
# Build the Next.js app
npm run build

# Test the production build locally
npm start

# Test that it works at http://localhost:3000
```

### 8. Deploy to App Engine

```bash
# From the project root directory
cd /Users/derekfowler/repo/NexusNosh/nexus-nosh-demo/nexus-nosh-demo

# Deploy!
gcloud app deploy
```

**During deployment:**
- You'll be asked to confirm the region (if first time)
- You'll see build progress
- Deployment takes 2-5 minutes

### 9. Verify Deployment

```bash
# Open the deployed app
gcloud app browse

# View logs
gcloud app logs tail -s default

# Check service status
gcloud app services list
```

### 10. Set Up Custom Domain (Optional)

```bash
# Map a custom domain
gcloud app domain-mappings create your-domain.com
```

Then follow the DNS setup instructions provided.

## Post-Deployment

### Monitor Your App

```bash
# View real-time logs
gcloud app logs tail -s default

# Check app version
gcloud app versions list

# View detailed service info
gcloud app describe
```

### Update Your App

After making changes:

```bash
# Commit your changes
git add .
git commit -m "Update for deployment"
git push

# Redeploy
npm run build
gcloud app deploy
```

## Troubleshooting

### Build Errors
- Check Node.js version matches `runtime: nodejs20`
- Ensure all dependencies are in `package.json`
- Check `.gcloudignore` isn't excluding necessary files

### Runtime Errors
- Check logs: `gcloud app logs tail -s default`
- Verify environment variables are set correctly
- Ensure Firebase config is correct

### Performance Issues
- Adjust `min_instances` in `app.yaml` (increases cost but improves latency)
- Check `target_cpu_utilization` setting

## Cost Monitoring

- App Engine free tier: 28 instance hours/day
- Firestore free tier: 50K reads, 20K writes/day
- Monitor usage: [Google Cloud Console](https://console.cloud.google.com/billing)

## Quick Deploy Command

Once everything is set up, you can deploy with:

```bash
npm run build && gcloud app deploy
```

## Next Steps After Deployment

1. ✅ Test the live app
2. ✅ Set up Firebase Security Rules
3. ✅ Configure Firebase Authentication providers
4. ✅ Add your first restaurants to Firestore
5. ✅ Set up monitoring and alerts

