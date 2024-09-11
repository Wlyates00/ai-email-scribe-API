// api.js (AI Email Writer Backend API)
import express from 'express';
import 'dotenv/config';
import fetch from 'node-fetch';

const app = express();

app.use(express.json());

// Adding endpoint to handle requests sent from the chrome extension
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
                max_tokens: 100,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData.error?.message });
        }

        const data = await response.json();
        const generatedEmail = data.choices[0].message.content.trim();
        res.json({ generatedEmail });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Backend server running on port 3000');
});
