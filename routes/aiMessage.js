const express = require('express');
const route = express.Router();

const User = require('../modules/users');

route.post('/', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: 'Data saved successfully', user: newUser });
    } catch (err) {
        console.error('Error saving user data:', err.message);
        res.status(500).json({ message: 'Error saving user data' });
    }
});

module.exports = route;
