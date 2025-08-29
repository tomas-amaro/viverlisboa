/**
 * Cloudflare Worker to handle Sanity webhooks and trigger GitHub Actions
 * Deploy this to Cloudflare Workers
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const requestId = crypto.randomUUID().slice(0, 8)
  console.log(`[${requestId}] Incoming request: ${request.method} ${request.url}`)
  
  // Only allow POST requests
  if (request.method !== 'POST') {
    console.log(`[${requestId}] Method not allowed: ${request.method}`)
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    // Parse the webhook payload
    const payload = await request.json()
    console.log(`[${requestId}] Parsed payload:`, JSON.stringify(payload, null, 2))
    
    // Optional: Validate the webhook (check for specific fields)
    if (!payload._type || !payload._id) {
      console.log(`[${requestId}] Invalid payload - missing _type or _id`)
      return new Response('Invalid payload', { status: 400 })
    }

    console.log(`[${requestId}] Valid Sanity webhook: ${payload._type}/${payload._id}`)
    console.log(`[${requestId}] Environment check - GITHUB_OWNER: ${GITHUB_OWNER}, GITHUB_REPO: ${GITHUB_REPO}`)

    // Trigger GitHub Actions workflow
    const githubUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`
    const dispatchPayload = {
      event_type: 'sanity-content-update',
      client_payload: {
        document_type: payload._type,
        document_id: payload._id,
        timestamp: new Date().toISOString()
      }
    }
    
    console.log(`[${requestId}] Triggering GitHub dispatch to: ${githubUrl}`)
    console.log(`[${requestId}] Dispatch payload:`, JSON.stringify(dispatchPayload, null, 2))
    
    const githubResponse = await fetch(githubUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Sanity-Webhook-Handler/1.0 (Cloudflare Workers)',
      },
      body: JSON.stringify(dispatchPayload)
    })

    console.log(`[${requestId}] GitHub API response: ${githubResponse.status} ${githubResponse.statusText}`)

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text()
      console.error(`[${requestId}] GitHub API error:`, githubResponse.status, errorText)
      return new Response('Failed to trigger deployment', { status: 500 })
    }

    console.log(`[${requestId}] ✅ Successfully triggered GitHub Actions workflow`)
    
    const successResponse = {
      success: true,
      message: 'Deployment triggered',
      document: `${payload._type}:${payload._id}`,
      requestId: requestId,
      timestamp: new Date().toISOString()
    }
    
    console.log(`[${requestId}] ✅ Response:`, JSON.stringify(successResponse, null, 2))
    
    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error(`[${requestId}] ❌ Webhook error:`, error.message, error.stack)
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      requestId: requestId,
      timestamp: new Date().toISOString()
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Environment variables (set these in Cloudflare Workers dashboard):
// GITHUB_OWNER = your-github-username
// GITHUB_REPO = viverlisboa (or your repo name)  
// GITHUB_TOKEN = your personal access token
