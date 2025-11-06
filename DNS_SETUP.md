# DNS Setup for nexusnosh.clifsmama.com

## Steps to Configure Custom Domain

### 1. Verify Domain Ownership

First, you need to verify ownership of the domain `clifsmama.com` (or `nexusnosh.clifsmama.com`) in Google Search Console:

1. Go to: https://www.google.com/webmasters/verification/verification?domain=clifsmama.com
2. Follow the verification process (usually involves adding a TXT record to your DNS)
3. Once verified, you can proceed with App Engine domain mapping

### 2. Create Domain Mapping in App Engine

After domain verification, run:
```bash
gcloud app domain-mappings create nexusnosh.clifsmama.com
```

### 3. Get DNS Records

After creating the domain mapping, Google Cloud will provide DNS records. Get them with:
```bash
gcloud app domain-mappings describe nexusnosh.clifsmama.com
```

### 4. Configure DNS at Your Domain Registrar

You'll need to add DNS records at your domain registrar (where `clifsmama.com` is registered). The records will typically be:

**Option A: CNAME Record (Recommended)**
- **Type**: CNAME
- **Name**: nexusnosh
- **Value**: `ghs.googlehosted.com.` (or the value provided by Google Cloud)

**Option B: A Records (if CNAME not supported)**
- Google will provide specific A record IP addresses

### 5. SSL Certificate

Google Cloud App Engine will automatically provision an SSL certificate for your custom domain once DNS is configured correctly. This usually takes a few minutes to a few hours.

### 6. Verify Setup

After DNS propagation (can take up to 48 hours, usually much faster):
- Visit: https://nexusnosh.clifsmama.com
- The site should load with SSL

## Current App Engine URL
- Default URL: https://nexus-nosh.uc.r.appspot.com
- Custom Domain (after setup): https://nexusnosh.clifsmama.com

## Notes
- DNS changes can take 24-48 hours to propagate globally
- SSL certificate provisioning is automatic but may take a few hours
- Both URLs will work once configured (default and custom domain)

