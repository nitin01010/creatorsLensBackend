require('dotenv').config();
const express = require('express');
const { HfInference } = require('@huggingface/inference');
const route = express.Router();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

route.post('/', async (req, res) => {
    try {
        const { title, description, tags } = req.body;

        const inputText = `Based on the following details, generate optimized suggestions:
        Title: ${title}
        Description: ${description}
        Tags: ${tags.join(', ')}`;

        const result = await hf.textGeneration({
            model: 'EleutherAI/gpt-neo-2.7B',
            inputs: inputText,
        });

        res.json({ message: 'sussfull api call', result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch suggestions.', error });
    }
});

module.exports = route;
