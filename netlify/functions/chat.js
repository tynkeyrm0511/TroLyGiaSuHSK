// Netlify Serverless Function - Coze API Proxy
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed', message: 'Only POST requests are allowed' })
    };
  }

  // Get token from environment variable
  const COZE_TOKEN = process.env.COZE_TOKEN;
  const BOT_ID = process.env.BOT_ID || '7565532352127647751';

  console.log('Environment check:', {
    hasToken: !!COZE_TOKEN,
    botId: BOT_ID,
    tokenPrefix: COZE_TOKEN ? COZE_TOKEN.substring(0, 10) + '...' : 'missing'
  });

  if (!COZE_TOKEN) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Server configuration error',
        message: 'COZE_TOKEN environment variable is not set. Please configure it in Netlify dashboard.'
      })
    };
  }

  try {
    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON'
        })
      };
    }

    const { message, conversation_id, user_id } = requestBody;

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Message is required',
          message: 'Please provide a message in the request body'
        })
      };
    }

    console.log('Calling Coze API with:', { 
      bot_id: BOT_ID, 
      user_id: user_id || `user_${Date.now()}`,
      messageLength: message.length
    });

    // Call Coze Chat API
    const response = await fetch('https://api.coze.com/v3/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bot_id: BOT_ID,
        user_id: user_id || `user_${Date.now()}`,
        stream: false,
        auto_save_history: true,
        additional_messages: [{
          role: 'user',
          content: message,
          content_type: 'text'
        }]
      })
    });

    const responseText = await response.text();
    console.log('Coze API response status:', response.status);
    console.log('Coze API response:', responseText.substring(0, 200));

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (jsonError) {
      console.error('Failed to parse Coze response:', responseText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid response from AI service',
          message: 'The AI service returned an invalid response. Please try again.'
        })
      };
    }

    if (!response.ok) {
      console.error('Coze API Error:', data);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to get response from AI',
          message: data.msg || data.message || 'Unknown error from AI service',
          code: data.code
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};
