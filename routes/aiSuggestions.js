require('dotenv').config();
const express = require('express');
const route = express.Router();
const OpenAIApi = require('openai');
const Configuration = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

route.post('/', async (req, res) => {
    const { itemName } = req.body;
    if (!itemName) {
        return res.status(400).json({ error: 'Item name is required.' });
    }
    try {
        const prompt = `Provide suggestions related to the item: ${itemName}.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 50,
        });
        const suggestions = response.data.choices[0].message.content.trim();
        res.json({ suggestions });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({ error: 'Failed to fetch suggestions.' });
    }
});

module.exports = route;
