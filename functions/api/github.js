/**
 * Cloudflare Pages Function - GitHub Activity Feed
 * Endpoint: /api/github
 * 
 * Optional Environment Variable (set in Cloudflare Dashboard):
 * - GITHUB_TOKEN (increases rate limit from 60 to 5000 requests/hour)
 */

export async function onRequestGet(context) {
  const { env } = context;
  const GITHUB_USERNAME = 'blitzwolfz'; // Change this to your GitHub username

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
  };

  // Handle preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    // Build request headers
    const requestHeaders = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App',
    };

    // Add auth token if available (increases rate limit)
    if (env.GITHUB_TOKEN) {
      requestHeaders['Authorization'] = `Bearer ${env.GITHUB_TOKEN}`;
    }

    // Fetch public events
    const eventsRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      { headers: requestHeaders }
    );

    if (!eventsRes.ok) {
      if (eventsRes.status === 403) {
        return new Response(
          JSON.stringify({
            error: 'Rate limit exceeded',
            message: 'GitHub API rate limit reached. Try again later or add a GITHUB_TOKEN.',
            resetTime: eventsRes.headers.get('X-RateLimit-Reset'),
          }),
          { status: 429, headers }
        );
      }
      throw new Error(`GitHub API error: ${eventsRes.status}`);
    }

    const events = await eventsRes.json();

    // Get rate limit info
    const rateLimit = {
      limit: eventsRes.headers.get('X-RateLimit-Limit') || '60',
      remaining: eventsRes.headers.get('X-RateLimit-Remaining') || '0',
      reset: eventsRes.headers.get('X-RateLimit-Reset'),
    };

    // Process and format events
    const processedEvents = events.map(event => {
      const base = {
        id: event.id,
        type: event.type,
        repo: event.repo?.name?.replace(`${GITHUB_USERNAME}/`, '') || 'unknown',
        repoUrl: event.repo?.url?.replace('api.github.com/repos', 'github.com') || '#',
        createdAt: event.created_at,
        date: new Date(event.created_at).toLocaleDateString(),
        time: new Date(event.created_at).toLocaleTimeString(),
      };

      // Add specific details based on event type
      switch (event.type) {
        case 'PushEvent':
          return {
            ...base,
            message: event.payload?.commits?.[0]?.message || 'Pushed commits',
            branch: event.payload?.ref?.replace('refs/heads/', '') || 'main',
            commitCount: event.payload?.commits?.length || 0,
            commitUrl: event.payload?.commits?.[0]?.url?.replace('api.github.com/repos', 'github.com').replace('/commits/', '/commit/') || '#',
          };

        case 'CreateEvent':
          return {
            ...base,
            message: `Created ${event.payload?.ref_type || 'repository'}: ${event.payload?.ref || event.repo?.name}`,
            refType: event.payload?.ref_type,
            ref: event.payload?.ref,
          };

        case 'PullRequestEvent':
          return {
            ...base,
            message: `${event.payload?.action} PR #${event.payload?.number}: ${event.payload?.pull_request?.title}`,
            prNumber: event.payload?.number,
            prUrl: event.payload?.pull_request?.html_url,
          };

        case 'IssuesEvent':
          return {
            ...base,
            message: `${event.payload?.action} issue #${event.payload?.issue?.number}: ${event.payload?.issue?.title}`,
            issueNumber: event.payload?.issue?.number,
            issueUrl: event.payload?.issue?.html_url,
          };

        case 'ReleaseEvent':
          return {
            ...base,
            message: `Released ${event.payload?.release?.tag_name}: ${event.payload?.release?.name}`,
            releaseUrl: event.payload?.release?.html_url,
          };

        case 'WatchEvent':
          return {
            ...base,
            message: `Starred ${event.repo?.name}`,
          };

        default:
          return {
            ...base,
            message: `${event.type} on ${event.repo?.name}`,
          };
      }
    });

    // Get unique repos contributed to
    const uniqueRepos = [...new Set(events.map(e => e.repo?.name))].filter(Boolean);

    // Calculate contribution stats
    const stats = {
      totalEvents: events.length,
      pushEvents: events.filter(e => e.type === 'PushEvent').length,
      prEvents: events.filter(e => e.type === 'PullRequestEvent').length,
      uniqueRepos: uniqueRepos.length,
      mostActiveRepo: uniqueRepos[0] || 'N/A',
    };

    const response = {
      username: GITHUB_USERNAME,
      profileUrl: `https://github.com/${GITHUB_USERNAME}`,
      events: processedEvents.slice(0, 10), // Return last 10 events
      stats,
      rateLimit,
      fetchedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), { headers });

  } catch (error) {
    console.error('GitHub function error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        message: 'Failed to fetch GitHub activity',
      }),
      { status: 500, headers }
    );
  }
}
