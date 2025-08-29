/**
 * Cloudflare Worker to handle Sanity webhooks and trigger GitHub Actions
 * Deploy this to Cloudflare Workers
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    // Parse the webhook payload
    const payload = await request.json()
    
    // Optional: Validate the webhook (check for specific fields)
    if (!payload._type || !payload._id) {
      return new Response('Invalid payload', { status: 400 })
    }

    console.log('Received Sanity webhook:', payload._type, payload._id)

    // Trigger GitHub Actions workflow
    const githubResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'sanity-content-update',
          client_payload: {
            document_type: payload._type,
            document_id: payload._id,
            timestamp: new Date().toISOString()
          }
        })
      }
    )

    if (!githubResponse.ok) {
      console.error('GitHub API error:', githubResponse.status, await githubResponse.text())
      return new Response('Failed to trigger deployment', { status: 500 })
    }

    console.log('Successfully triggered GitHub Actions workflow')
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Deployment triggered',
      document: `${payload._type}:${payload._id}`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}

// Environment variables (set these in Cloudflare Workers dashboard):
// GITHUB_OWNER = your-github-username
// GITHUB_REPO = viverlisboa (or your repo name)  
// GITHUB_TOKEN = your personal access token
