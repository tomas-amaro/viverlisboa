# Sanity Webhook Setup

This guide explains how to set up automatic deployments when content is updated in Sanity.

## 🎯 Architecture

```
Sanity Content Update → Webhook → Cloudflare Worker → GitHub Actions → Deploy Sites
```

## 📋 Setup Steps

### 1. Create GitHub Personal Access Token

1. Go to [GitHub Settings → Personal Access Tokens](https://github.com/settings/personal-access-tokens/new)
2. Create a **Fine-grained personal access token**
3. **Repository access**: Select only your repository
4. **Permissions**:
   - `Actions: Write` (to trigger workflows)
   - `Contents: Read` (required for actions)
5. **Copy the token** (you'll need it in step 3)

### 2. Deploy Webhook Handler

```bash
# Deploy the webhook worker to Cloudflare
pnpm webhook:deploy
```

### 3. Configure Cloudflare Worker Environment Variables

1. Go to [Cloudflare Workers Dashboard](https://dash.cloudflare.com/)
2. Find your `sanity-webhook-handler` worker
3. Go to **Settings → Variables**
4. Add these environment variables:
   - `GITHUB_OWNER`: Your GitHub username
   - `GITHUB_REPO`: `viverlisboa` (or your repository name)
   - `GITHUB_TOKEN`: Your personal access token from step 1

### 4. Get Worker URL

1. In Cloudflare Workers dashboard
2. Click on your `sanity-webhook-handler` worker
3. Copy the **Worker URL** (e.g., `https://sanity-webhook-handler.your-subdomain.workers.dev`)

### 5. Configure Sanity Webhook

1. Go to [Sanity Management Console](https://sanity.io/manage)
2. Select your project
3. Go to **Settings → Webhooks**
4. Click **Add webhook**
5. Configure:
   - **Name**: `Auto Deploy`
   - **URL**: Your Cloudflare Worker URL from step 4
   - **Dataset**: `production`
   - **HTTP method**: `POST`
   - **API version**: `v2021-06-07`
   - **Include drafts**: `No` (only trigger on published content)
   - **Trigger on**: Select the content types you want to trigger deployments:
     - `campaign`
     - `page`
     - `post`
     - `event`
     - `proposal`

## 🎯 Result

After setup, any content changes in Sanity will:

1. ✅ **Trigger webhook** → Cloudflare Worker
2. ✅ **Worker calls GitHub API** → Triggers workflow
3. ✅ **GitHub Actions runs** → Builds all domains
4. ✅ **Sites deploy** → Content goes live automatically

## 🧪 Testing

1. **Edit content** in Sanity Studio (`https://viverlisboa.sanity.studio`)
2. **Publish changes**
3. **Check GitHub Actions** → Should see workflow running
4. **Wait ~3-5 minutes** → Sites update automatically

## 🔧 Troubleshooting

### Webhook not triggering?
- Check Cloudflare Worker logs
- Verify Sanity webhook URL is correct
- Ensure webhook is enabled in Sanity

### GitHub Actions not running?
- Check GitHub token permissions
- Verify environment variables in Cloudflare Worker
- Check repository dispatch is enabled

### Build failing?
- Same troubleshooting as manual deployments
- Check GitHub Actions logs

## 📊 Benefits

- ✅ **Instant updates** - Content goes live automatically
- ✅ **No manual deployments** - Edit in Sanity, changes deploy automatically
- ✅ **All domains update** - One change updates all campaign sites
- ✅ **Free infrastructure** - Uses Cloudflare Workers free tier
- ✅ **Reliable** - Built on proven webhook infrastructure

Your content team can now focus on creating content without worrying about deployments!
