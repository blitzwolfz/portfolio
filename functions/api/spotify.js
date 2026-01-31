/**
 * Cloudflare Pages Function - Spotify Now Playing
 * Endpoint: /api/spotify
 * 
 * Required Environment Variables (set in Cloudflare Dashboard):
 * - SPOTIFY_CLIENT_ID
 * - SPOTIFY_CLIENT_SECRET
 * - SPOTIFY_REFRESH_TOKEN
 */

export async function onRequestGet(context) {
  const { env } = context;

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  };

  // Handle preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // Check environment variables
  if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !env.SPOTIFY_REFRESH_TOKEN) {
    return new Response(
      JSON.stringify({ 
        error: 'Spotify credentials not configured',
        isPlaying: false,
        message: 'Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN in Cloudflare Dashboard'
      }), 
      { status: 500, headers }
    );
  }

  try {
    // Step 1: Get access token using refresh token
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${env.SPOTIFY_REFRESH_TOKEN}`,
    });

    if (!tokenRes.ok) {
      const error = await tokenRes.text();
      throw new Error(`Token refresh failed: ${error}`);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Step 2: Get currently playing track
    const nowPlayingRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // 204 = no track playing
    if (nowPlayingRes.status === 204) {
      return new Response(
        JSON.stringify({ 
          isPlaying: false,
          message: 'Not currently playing'
        }), 
        { headers }
      );
    }

    if (!nowPlayingRes.ok) {
      throw new Error(`Spotify API error: ${nowPlayingRes.status}`);
    }

    const data = await nowPlayingRes.json();

    // Format response
    const response = {
      isPlaying: data.is_playing,
      title: data.item?.name || 'Unknown',
      artist: data.item?.artists?.map(a => a.name).join(', ') || 'Unknown Artist',
      album: data.item?.album?.name || '',
      albumArt: data.item?.album?.images?.[0]?.url || null,
      trackUrl: data.item?.external_urls?.spotify || null,
      progress: data.progress_ms || 0,
      duration: data.item?.duration_ms || 0,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), { headers });

  } catch (error) {
    console.error('Spotify function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        isPlaying: false,
        message: 'Failed to fetch Spotify data'
      }), 
      { status: 500, headers }
    );
  }
}

// Helper for base64 encoding
function btoa(str) {
  const buffer = new ArrayBuffer(str.length * 2);
  const view = new Uint16Array(buffer);
  for (let i = 0; i < str.length; i++) {
    view[i] = str.charCodeAt(i);
  }
  return btoaPolyfill(str);
}

function btoaPolyfill(str) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  for (let i = 0; i < str.length; i += 3) {
    const a = str.charCodeAt(i);
    const b = str.charCodeAt(i + 1);
    const c = str.charCodeAt(i + 2);
    const bitmap = (a << 16) | ((b || 0) << 8) | (c || 0);
    output += chars.charAt(bitmap >> 18 & 63);
    output += chars.charAt(bitmap >> 12 & 63);
    output += chars.charAt(bitmap >> 6 & 63);
    output += chars.charAt(bitmap & 63);
  }
  return output.slice(0, output.length - (3 - (str.length % 3 || 3)) % 3) + '=='.slice(0, (3 - (str.length % 3 || 3)) % 3);
}
