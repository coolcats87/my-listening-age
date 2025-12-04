// Save as: netlify/functions/lastfm.js (for Netlify)
// Or: api/lastfm.js (for Vercel)


// Replace with your Last.fm API key
const API_KEY = 'b9b3e198db6c5a9285130b255fdd5aaa';
const API_BASE = 'https://ws.audioscrobbler.com/2.0/';

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const params = event.queryStringParameters;
    
    if (!params.method) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing method parameter' })
      };
    }

    // Build Last.fm API URL
    const url = new URL(API_BASE);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('format', 'json');
    
    // Add all query parameters
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });

    // Fetch from Last.fm
    const response = await fetch(url.toString());
    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
