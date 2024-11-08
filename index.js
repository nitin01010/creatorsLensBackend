require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: process.env.DOMAIN,
}));

const aiSuggestions = require("./routes/aiSuggestions");
const aiMessage = require("./routes/aiMessage");

app.use('/api/v1/ai/suggestion', aiSuggestions);
app.use('/api/v1/ai/message', aiMessage);

const connectDB = require("./db/db");
connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});