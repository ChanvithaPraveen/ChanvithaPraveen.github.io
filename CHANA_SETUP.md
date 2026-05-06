# Chana AI Assistant — Setup Guide

**Chana** is the AI-powered portfolio assistant embedded in your site. It answers questions about your projects, experience, skills, education, and contact info using Google Gemini.

This guide walks you through deploying the Cloudflare Worker proxy and connecting it to your site.

---

## Architecture

```
[Your Portfolio Site]
       ↓
  (NEXT_PUBLIC_CHANA_ENDPOINT)
       ↓
[Cloudflare Worker Proxy]
  (GEMINI_API_KEY secret)
       ↓
   [Google Gemini API]
```

**Why a proxy?**
- Keeps your Gemini API key secret (never exposed to browsers)
- Handles CORS so the chat works from any domain
- Free tier: 100,000 requests/day on Cloudflare Workers

---

## Prerequisites

1. **Google Gemini API Key**  
   - Go to [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
   - Sign in with your Google account
   - Click **"Create API Key"**
   - Copy the key (starts with `AIza...`)
   - **Free tier**: 60 requests/minute, no credit card required

2. **Cloudflare Account**  
   - Sign up free at [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
   - No credit card required for Workers free tier

---

## Step-by-Step Deployment

### 1. Install Wrangler (Cloudflare CLI)

```bash
npm install -g wrangler
```

Verify installation:
```bash
wrangler --version
```

### 2. Login to Cloudflare

```bash
wrangler login
```

This opens your browser to authorize the CLI.

### 3. Create a New Worker

From your project root:

```bash
cd cloudflare-worker
wrangler init chana-proxy
```

When prompted:
- **"Would you like to use TypeScript?"** → No
- **"Would you like to create a Worker?"** → Yes
- **"Would you like to install dependencies?"** → Yes

### 4. Replace Worker Code

Copy the contents of `chana-proxy.js` into the new worker:

```bash
# If wrangler created src/index.js:
cp chana-proxy.js src/index.js

# Or if it created worker.js:
cp chana-proxy.js worker.js
```

### 5. Configure wrangler.toml

Edit `wrangler.toml` in the `cloudflare-worker/` directory:

```toml
name = "chana-proxy"
main = "src/index.js"  # or "worker.js" depending on init
compatibility_date = "2024-01-01"

[env.production]
name = "chana-proxy"
```

### 6. Set the Gemini API Key Secret

```bash
wrangler secret put GEMINI_API_KEY
```

When prompted, paste your Gemini API key (the one starting with `AIza...`).

### 7. Deploy the Worker

```bash
wrangler deploy
```

You'll see output like:

```
Published chana-proxy (X.XX sec)
  https://chana-proxy.your-subdomain.workers.dev
```

**Copy this URL** — you'll need it in the next step.

### 8. Test the Worker

```bash
curl -X POST https://chana-proxy.your-subdomain.workers.dev \
  -H "Content-Type: application/json" \
  -d '{
    "system": "You are a helpful assistant.",
    "message": "Hello!"
  }'
```

Expected response:
```json
{"reply":"Hello! How can I help you today?"}
```

If you get an error, check:
- Worker logs: `wrangler tail`
- Gemini API key is correct: `wrangler secret list`

---

## Connecting to Your Portfolio

### 9. Add the Worker URL to Your Environment

Create or edit `.env.local` in your project root:

```bash
# Chana AI Assistant
NEXT_PUBLIC_CHANA_ENDPOINT=https://chana-proxy.your-subdomain.workers.dev
```

Replace `your-subdomain` with your actual worker URL from step 7.

### 10. Restart Your Dev Server

```bash
npm run dev
```

Open your portfolio at `http://localhost:3000`.

You should see a **"CHANA AI"** floating button in the bottom-right corner. Click it to open the chat!

---

## Updating the Knowledge Base

Chana's knowledge comes from `/src/data/knowledgeBase.ts`, which aggregates:
- Projects (`/src/data/projects.ts`)
- Experience (`/src/data/experience.ts`)
- Education (`/src/data/education.ts`)
- Skills (`/src/data/techStack.ts`)
- Certifications (hardcoded in `knowledgeBase.ts`)

**When you add/update projects or experience:**

1. Edit the relevant data file (e.g., `projects.ts`)
2. Re-deploy your site — Chana will automatically use the new data
3. No need to redeploy the worker

**To customize Chana's personality:**

Edit `/src/components/chana/system-prompt.ts` to change tone, response style, or knowledge boundaries.

---

## Troubleshooting

### "chana offline · NEXT_PUBLIC_CHANA_ENDPOINT not configured"

**Cause**: The environment variable isn't set or the dev server wasn't restarted.

**Fix**:
1. Check `.env.local` has `NEXT_PUBLIC_CHANA_ENDPOINT=...`
2. Restart: `npm run dev`

### "request failed (401) ..."

**Cause**: Gemini API key is invalid or expired.

**Fix**:
1. Get a new key from [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Update the secret: `wrangler secret put GEMINI_API_KEY`
3. Redeploy: `wrangler deploy`

### "request failed (500) GEMINI_API_KEY not configured"

**Cause**: The worker doesn't have the secret set.

**Fix**:
```bash
cd cloudflare-worker
wrangler secret put GEMINI_API_KEY
```

### "transmission error — could not reach chana"

**Cause**: Network issue or worker is down.

**Fix**:
1. Test the worker directly (see step 8)
2. Check worker logs: `wrangler tail`
3. Verify your worker URL is correct in `.env.local`

### Worker responds but Chana stays silent

**Cause**: The response format doesn't match what the UI expects.

**Fix**:
- Check browser console for errors (F12 → Console tab)
- Verify the worker returns `{"reply": "..."}`
- Test with `curl` (see step 8)

---

## Cost & Limits

### Cloudflare Workers (Free Tier)
- **100,000 requests/day**
- **10ms CPU time per request**
- **More than enough** for a personal portfolio

### Google Gemini API (Free Tier)
- **60 requests/minute** (3,600/hour)
- **1,500 requests/day** for Gemini 1.5 Flash
- **No credit card required**

If you exceed these limits, the worker will return an error. For higher traffic, upgrade to Cloudflare Workers Paid ($5/mo for 10M requests).

---

## Production Deployment

### GitHub Actions

If you deploy via GitHub Actions (like your current setup), add the worker URL as a repository secret:

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `CHANA_ENDPOINT`
4. Value: `https://chana-proxy.your-subdomain.workers.dev`
5. Click **"Add secret"**

Then update `.github/workflows/nextjs.yml`:

```yaml
- name: Build with Next.js
  run: npm run build
  env:
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
    NEXT_PUBLIC_CHANA_ENDPOINT: ${{ secrets.CHANA_ENDPOINT }}  # <-- ADD THIS
```

Commit, push, and your site will have Chana live!

---

## Security Notes

- **Never commit** your Gemini API key to git
- **Never expose** `GEMINI_API_KEY` as a `NEXT_PUBLIC_*` variable (it must stay in the worker)
- The worker has no authentication — anyone with the URL can call it. For a personal portfolio, this is fine (rate limits protect you). For production apps, add API key auth.

---

## Need Help?

- **Cloudflare Workers Docs**: [https://developers.cloudflare.com/workers/](https://developers.cloudflare.com/workers/)
- **Google Gemini API Docs**: [https://ai.google.dev/docs](https://ai.google.dev/docs)
- **Wrangler CLI Reference**: [https://developers.cloudflare.com/workers/wrangler/](https://developers.cloudflare.com/workers/wrangler/)

---

**You're all set!** 🚀  
Chana is now live on your portfolio, ready to answer visitor questions 24/7.
