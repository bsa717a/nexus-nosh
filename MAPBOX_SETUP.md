# Mapbox Setup Guide

## How to Get a Mapbox Access Token

### Step 1: Sign Up for Mapbox
1. Go to https://account.mapbox.com/
2. Click **"Sign up"** (or **"Log in"** if you already have an account)
3. Create a free account (credit card not required for basic usage)

### Step 2: Create an Access Token
1. After logging in, go to your **Account page** (click your profile icon in the top right)
2. Scroll down to the **"Access tokens"** section
3. You'll see your **Default public token** - you can use this, OR
4. Click **"Create a token"** to create a new one:
   - Give it a name (e.g., "Nexus Nosh")
   - Set scopes: Make sure **"Public"** is checked
   - Click **"Create token"**

### Step 3: Copy Your Token
- Copy the token (it will look like: `pk.eyJ1Ijoi...`)

### Step 4: Add Token to Your Project
1. Open your `.env.local` file in the project root
2. Add this line (replace `YOUR_TOKEN_HERE` with your actual token):
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiYOUR_TOKEN_HERE
   ```
3. Save the file

### Step 5: Restart Your Dev Server
- Stop your current dev server (Ctrl+C)
- Start it again: `npm run dev`
- The map should now work!

## Free Tier Limits
- Mapbox offers a generous free tier: **50,000 map loads per month**
- This is more than enough for development and testing
- No credit card required for basic usage

## Troubleshooting
- Make sure the token starts with `pk.` (public token)
- Make sure the variable name is exactly `NEXT_PUBLIC_MAPBOX_TOKEN`
- Restart your dev server after adding the token
- Check the browser console for any errors

