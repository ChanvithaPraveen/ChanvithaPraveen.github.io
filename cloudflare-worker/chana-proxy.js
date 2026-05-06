/**
 * Cloudflare Worker: Chana AI Proxy
 * 
 * Forwards chat requests from your portfolio to Google Gemini API.
 * Keeps your API key secret and handles CORS.
 * 
 * Deploy this to Cloudflare Workers and set GEMINI_API_KEY as a secret.
 * Then add the worker URL to .env.local as NEXT_PUBLIC_CHANA_ENDPOINT.
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export default {
  async fetch(request, env) {
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return jsonError('Method not allowed', 405);
    }

    try {
      const { system, history = [], message } = await request.json();

      if (!message || typeof message !== 'string') {
        return jsonError('Missing or invalid "message" field', 400);
      }

      if (!env.GEMINI_API_KEY) {
        return jsonError('GEMINI_API_KEY not configured on worker', 500);
      }

      // Build Gemini request payload
      const contents = [];

      // Add conversation history
      for (const msg of history) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.text }],
        });
      }

      // Add current user message
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const payload = {
        system_instruction: {
          parts: [{ text: system }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
          topP: 0.9,
        },
      };

      const geminiUrl = `${GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`;
      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!geminiRes.ok) {
        const errText = await geminiRes.text();
        console.error('Gemini API error:', geminiRes.status, errText);
        return jsonError(`Gemini API failed (${geminiRes.status})`, 502);
      }

      const data = await geminiRes.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!reply) {
        return jsonError('No response from Gemini', 502);
      }

      return new Response(
        JSON.stringify({ reply: reply.trim() }),
        { headers: CORS_HEADERS }
      );
    } catch (err) {
      console.error('Worker error:', err);
      return jsonError('Internal server error: ' + err.message, 500);
    }
  },
};

function jsonError(message, status) {
  return new Response(
    JSON.stringify({ error: message }),
    { status, headers: CORS_HEADERS }
  );
}
