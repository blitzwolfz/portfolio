# Cloudflare Pages API Setup Guide

This portfolio uses **Cloudflare Pages Functions** to securely proxy API requests to Spotify and GitHub, keeping your API keys hidden from the client-side code.

---

## 📁 File Structure

```
functions/
└── api/
    ├── spotify.js    # Spotify Now Playing endpoint
    └── github.js     # GitHub Activity endpoint
```

These files automatically deploy as serverless functions when you push to Cloudflare Pages.

---

## 🎵 Spotify Setup

### 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click **"Create App"**
3. Fill in:
   - **App Name**: Portfolio
   - **App Description**: Personal portfolio now playing
   - **Redirect URI**: `http://localhost:8888/callback` (we'll get a refresh token locally)
4. Save your **Client ID** and **Client Secret**

### 2. Get a Refresh Token

Run this in your terminal:

```bash
# Replace with your actual Client ID
CLIENT_ID="your_client_id"

# Open this URL in your browser and authorize:
open "https://accounts.spotify.com/authorize?client_id=$CLIENT_ID&response_type=code&redirect_uri=http://localhost:8888/callback&scope=user-read-currently-playing,user-read-playback-state"

# After authorization, you'll get a code in the URL
# Exchange it for tokens:
curl -X POST https://accounts.spotify.com/api/token \
  -H "Authorization: Basic $(echo -n CLIENT_ID:CLIENT_SECRET | base64)" \
  -d "grant_type=authorization_code" \
  -d "code=CODE_FROM_URL" \
  -d "redirect_uri=http://localhost:8888/callback"
```

**Save the `refresh_token`** - you'll need it for Cloudflare.

### 3. Add Environment Variables to Cloudflare

Go to **Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables**

Add these **Production** variables:

| Variable | Value |
|----------|-------|
| `SPOTIFY_CLIENT_ID` | Your Spotify Client ID |
| `SPOTIFY_CLIENT_SECRET` | Your Spotify Client Secret |
| `SPOTIFY_REFRESH_TOKEN` | The refresh token from step 2 |

Click **Save** and redeploy your site.

---

## 🐙 GitHub Setup

### Option A: No Token (Limited)

The GitHub API works without a token (60 requests/hour), which is fine for personal use.

### Option B: Personal Access Token (Recommended)

1. Go to **GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Select scope: `public_repo` (or no scopes for public data only)
4. Generate and copy the token

### Add to Cloudflare

| Variable | Value |
|----------|-------|
| `GITHUB_TOKEN` | Your GitHub Personal Access Token (optional but recommended) |

---

## 🧪 Testing Locally

Cloudflare Pages Functions can be tested locally with Wrangler:

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Run local dev server
wrangler pages dev .
```

Your functions will be available at:
- `http://localhost:8788/api/spotify`
- `http://localhost:8788/api/github`

---

## 🔍 Troubleshooting

### Spotify returns "No credentials configured"

✅ Check that all 3 environment variables are set in Cloudflare Dashboard and redeploy.

### GitHub shows "Rate limit exceeded"

✅ Add a `GITHUB_TOKEN` to increase limit from 60 to 5000 requests/hour.

### Functions not working

✅ Make sure your folder structure is exactly:
```
functions/api/spotify.js
functions/api/github.js
```

✅ Check Cloudflare Pages **Functions** tab in the dashboard for logs.

### Spotify token expired

The refresh token is permanent unless you:
- Revoke access in Spotify settings
- Generate a new token

If it stops working, repeat Step 2 to get a new refresh token.

---

## 📊 API Response Formats

### Spotify (`/api/spotify`)

```json
{
  "isPlaying": true,
  "title": "Midnight City",
  "artist": "M83",
  "album": "Hurry Up, We're Dreaming",
  "albumArt": "https://i.scdn.co/image/...",
  "trackUrl": "https://open.spotify.com/track/...",
  "progress": 123000,
  "duration": 243000,
  "timestamp": "2026-01-30T20:30:00.000Z"
}
```

### GitHub (`/api/github`)

```json
{
  "username": "blitzwolfz",
  "profileUrl": "https://github.com/blitzwolfz",
  "events": [
    {
      "type": "PushEvent",
      "repo": "portfolio",
      "message": "Added new features",
      "date": "1/30/2026",
      "time": "8:30:00 PM"
    }
  ],
  "stats": {
    "totalEvents": 30,
    "pushEvents": 12,
    "prEvents": 3,
    "uniqueRepos": 5,
    "mostActiveRepo": "portfolio"
  }
}
```

---

## 🔒 Security Notes

- **Never commit API keys to Git** - that's why we use Cloudflare environment variables
- The `GITHUB_TOKEN` should have minimal scopes (just `public_repo` or no scopes)
- Spotify credentials are server-side only - users can never see them
- The refresh token is long-lived but can be revoked anytime

---

## 🚀 Deployment

Just push to your Git repo - Cloudflare Pages automatically:
1. Builds your static site
2. Deploys functions from `/functions` folder
3. Injects environment variables

```bash
git add .
git commit -m "Add API functions"
git push
```

Check **Cloudflare Dashboard → Pages → Your Project → Functions** to verify deployment.
