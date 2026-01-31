/**
 * Cloudflare Pages Function - Last.fm Now Playing
 * Endpoint: /api/spotify (kept for backward compatibility)
 * 
 * Required Environment Variables (set in Cloudflare Dashboard):
 * - LASTFM_API_KEY (get from https://www.last.fm/api/account/create)
 * 
 * Optional:
 * - LASTFM_USERNAME (defaults to 'blitzwolfz')
 */

export async function onRequestGet(context) {
  const { env } = context;
  const LASTFM_USERNAME = env.LASTFM_USERNAME || 'blitzwolfz';

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
  if (!env.LASTFM_API_KEY) {
    return new Response(
      JSON.stringify({ 
        error: 'Last.fm API key not configured',
        isPlaying: false,
        message: 'Set LASTFM_API_KEY in Cloudflare Dashboard'
      }), 
      { status: 500, headers }
    );
  }

  try {
    // Fetch recent tracks from Last.fm
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${env.LASTFM_API_KEY}&format=json&limit=2`;
    
    const res = await fetch(apiUrl);
    
    if (!res.ok) {
      throw new Error(`Last.fm API error: ${res.status}`);
    }

    const data = await res.json();
    
    if (data.error) {
      throw new Error(`Last.fm error: ${data.message}`);
    }

    const tracks = data.recenttracks?.track;
    
    if (!tracks || tracks.length === 0) {
      return new Response(
        JSON.stringify({ 
          isPlaying: false,
          message: 'No recent tracks found'
        }), 
        { headers }
      );
    }

    // Get the most recent track
    const currentTrack = tracks[0];
    const isNowPlaying = currentTrack['@attr']?.nowplaying === 'true';
    
    // Get album art (Last.fm provides multiple sizes)
    const images = currentTrack.image || [];
    const albumArt = images.find(img => img.size === 'large')?.['#text'] || 
                     images.find(img => img.size === 'medium')?.['#text'] ||
                     images.find(img => img.size === 'small')?.['#text'] ||
                     null;

    // Format response (matching the old Spotify format for compatibility)
    const response = {
      isPlaying: isNowPlaying,
      title: currentTrack.name || 'Unknown Track',
      artist: currentTrack.artist?.['#text'] || currentTrack.artist?.name || 'Unknown Artist',
      album: currentTrack.album?.['#text'] || '',
      albumArt: albumArt,
      trackUrl: currentTrack.url || null,
      // Last.fm specific fields
      source: 'lastfm',
      scrobbledAt: isNowPlaying ? 'now' : currentTrack.date?.['#text'] || 'recently',
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), { headers });

  } catch (error) {
    console.error('Last.fm function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        isPlaying: false,
        message: 'Failed to fetch Last.fm data'
      }), 
      { status: 500, headers }
    );
  }
}
