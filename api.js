// api.js (AI Email Writer Backend API)
// There are TWO endpoints for the api here
// One for the extension and wrbsite the other is for the context menu

import express from 'express';
import 'dotenv/config';
import fetch from 'node-fetch';

const app = express();

app.use(express.json());

// Adding endpoint to handle requests sent from the chrome extension and website
app.post('/api/generate-email', async (req, res) => {
    // Input values for the api
    const { tone, promptText } = req.body;

    // Construct the messages for OpenAI API
    const messages = [
        { role: 'system', content: `You are going to act as the user. Write an email from the user's perspective using a ${tone} tone. The email should address the following prompt: ${promptText}. Ensure that the tone and content is relevant to the user's intent. Keep the email concise and ensure it is within a short length to stay within token limits.` },
        { role: 'user', content: promptText }
    ];

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: 125,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData.error?.message });
        }

        // Wait for response from Open AI
        const data = await response.json();
        // Grab the email they generate
        const generatedEmail = data.choices[0].message.content.trim();
        // Adding a json file with my newly generated email inside to my API response
        res.json({ generatedEmail });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Adding an endpoint for the context menu (It produes the same style email just with no subject line)
app.post('/api/context-menu/generate-email', async (req, res) => {
    // Input value for the api
    const { promptText } = req.body;

    // Construct the messages for OpenAI API
    const messages = [
        { role: 'system', content: `Write a body paragragh of an email from the user's perspective using a reasonable tone. The paragragh should address the following prompt: ${promptText}. Ensure that the tone and content is relevant to the user's intent. Make sure its only the body paragragh and stay within token limits.` },
        { role: 'user', content: promptText }
    ];

    // Contact Open AI API
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: 100,
                temperature: 0.7
            })
        });

        // Check if there is an error in the response
        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData.error?.message });
        }

        // Wait for response from Open AI
        const data = await response.json();
        // Grab the email they generate
        const generatedEmail = data.choices[0].message.content.trim();
        // Adding a json file with my newly generated email inside to my API response
        res.json({ generatedEmail });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Backend server running on port 3000');
});
