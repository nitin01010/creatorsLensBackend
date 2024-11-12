require('dotenv').config();
const express = require('express');
const { HfInference } = require('@huggingface/inference');
const router = express.Router();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

router.post('/', async (req, res) => {
    try {
        const { title, description, tags = [] } = req.body;  // Default tags to an empty array if undefined

        const inputText = `Based on the following details, generate optimized suggestions:
        Title: ${title}
        Description: ${description}
        Tags: ${tags.join(', ')}`;

        const result = await hf.textGeneration({
            model: 'EleutherAI/gpt-neo-2.7B',
            inputs: inputText,
        });

        res.json({ message: 'Successful API call', result });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({ error: 'Failed to fetch suggestions.' });
    }
});

module.exports = router;
