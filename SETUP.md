# Cloudflare Pages API Setup Guide

This portfolio uses **Cloudflare Pages Functions** to securely proxy API requests to Last.fm and GitHub, keeping your API keys hidden from the client-side code.

---

## 📁 File Structure

```
functions/
└── api/
    ├── spotify.js    # Last.fm Now Playing endpoint (filename kept for compatibility)
    └── github.js     # GitHub Activity endpoint
```

These files automatically deploy as serverless functions when you push to Cloudflare Pages.

---

## 🎵 Last.fm Setup

### 1. Create a Last.fm Account

1. Go to [Last.fm](https://www.last.fm) and create an account if you don't have one
2. **Connect your music apps:**
   - **Spotify:** Settings → Notifications → Scrobbling → Connect Spotify
   - **Apple Music:** Use an app like [Sofi](https://sofi.app/) or [Marvis Pro](https://apps.apple.com/us/app/marvis-pro/id1447768809)
   - **Other apps:** Check [Last.fm apps page](https://www.last.fm/about/trackmymusic)

### 2. Get a Last.fm API Key

1. Go to [Last.fm API Account Creation](https://www.last.fm/api/account/create)
2. Fill in:
   - **Application name**: Portfolio
   - **Application description**: Personal portfolio now playing widget
   - **Callback URL**: (leave blank)
3. Submit and save your **API Key**

### 3. Add Environment Variables to Cloudflare

Go to **Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables**

Add these **Production** variables:

| Variable | Value |
|----------|-------|
| `LASTFM_API_KEY` | Your Last.fm API Key |
| `LASTFM_USERNAME` | Your Last.fm username (optional, defaults to 'blitzwolfz') |

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
- `http://localhost:8788/api/spotify` (Last.fm data)
- `http://localhost:8788/api/github`

---

## 🔍 Troubleshooting

### Last.fm returns "API key not configured"

✅ Check that `LASTFM_API_KEY` is set in Cloudflare Dashboard and redeploy.

### Last.fm shows "No recent tracks found"

✅ Make sure you're scrobbling music:
- Check your Last.fm profile - do you see recent tracks?
- Connect Spotify or your music app to Last.fm
- Wait 2-3 minutes after starting a song for it to appear

### GitHub shows "Rate limit exceeded"

✅ Add a `GITHUB_TOKEN` to increase limit from 60 to 5000 requests/hour.

### Functions not working

✅ Make sure your folder structure is exactly:
```
functions/api/spotify.js
functions/api/github.js
```

✅ Check Cloudflare Pages **Functions** tab in the dashboard for logs.

---

## 📊 API Response Formats

### Last.fm (`/api/spotify`)

```json
{
  "isPlaying": true,
  "title": "Midnight City",
  "artist": "M83",
  "album": "Hurry Up, We're Dreaming",
  "albumArt": "https://lastfm.freetls.fastly.net/i/u/...",
  "trackUrl": "https://www.last.fm/music/M83/_/Midnight+City",
  "source": "lastfm",
  "scrobbledAt": "now",
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
- The `LASTFM_API_KEY` is read-only and low-risk
- Last.fm usernames and scrobble data are public by default

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

---

## 🎵 About Last.fm vs Spotify

| Feature | Spotify API | Last.fm |
|---------|-------------|---------|
| **Setup** | Complex OAuth | Simple API key |
| **Real-time** | ✅ Yes (live playback) | ⚠️ 2-3 min delay |
| **Works with** | Spotify only | Spotify, Apple Music, any scrobbler |
| **Rate limits** | Strict | Very generous |
| **Free tier** | ✅ Yes | ✅ Yes |

**Last.fm is the better choice for portfolios** - it's simpler, works with any music app, and doesn't require complex authentication.

---

## 📱 Scrobbling Apps by Platform

### Spotify
- Built-in: Settings → Scrobbling → Connect Last.fm

### Apple Music (iOS/Mac)
- [Sofi](https://sofi.app/) (Free)
- [Marvis Pro](https://apps.apple.com/us/app/marvis-pro/id1447768809) (Paid, but excellent)

### YouTube Music
- [Web Scrobbler](https://web-scrobbler.com/) browser extension

### Tidal / Deezer / etc.
- Most have built-in Last.fm support in settings

### Windows/Mac Desktop
- [Last.fm Desktop Scrobbler](https://www.last.fm/about/trackmymusic)
