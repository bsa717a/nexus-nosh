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

## DNS Records to Add

**Domain mapping created successfully!**

Add the following DNS record at your domain registrar (where `clifsmama.com` is registered):

### CNAME Record
- **Type**: CNAME
- **Name/Host**: `nexusnosh`
- **Value/Target**: `ghs.googlehosted.com.` (note the trailing dot)
- **TTL**: 3600 (or default)

### Example DNS Configuration
```
nexusnosh.clifsmama.com  CNAME  ghs.googlehosted.com.
```

Or if your DNS provider uses separate fields:
- Host: `nexusnosh`
- Type: `CNAME`
- Points to: `ghs.googlehosted.com.`

## Current App Engine URLs
- Default URL: https://nexus-nosh.uc.r.appspot.com
- Custom Domain: https://nexusnosh.clifsmama.com (will work after DNS propagation)

## Next Steps
1. ✅ Domain ownership verified
2. ✅ Domain mapping created in App Engine
3. ⏳ Add CNAME record at DNS provider (see above)
4. ⏳ Wait for DNS propagation (usually 1-24 hours)
5. ⏳ SSL certificate will be automatically provisioned by Google Cloud

## Notes
- DNS changes can take 24-48 hours to propagate globally (usually much faster)
- SSL certificate provisioning is automatic but may take a few hours after DNS propagates
- Both URLs will work once configured (default and custom domain)
- You can check DNS propagation status with: `dig nexusnosh.clifsmama.com` or `nslookup nexusnosh.clifsmama.com`

