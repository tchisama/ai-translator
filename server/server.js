// app.js
const express = require('express');
const cors = require('cors');
const OpenAI =require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000; // Change this to your desired port number

// Enable CORS for all routes (You can customize this further)
app.use(cors());

// Use body-parser middleware to parse JSON
app.use(express.json());

// Define a simple route
app.post('/api/translate', async(req, res) => {
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "you will provide with this object\n{\nfrom_country: country,\nto_country: country,\ninput_text:  text\n}\n\nand your work is to translate the input_text from the local \" from_country \" to the local of the to_country and return the translation"
    },
    {
      "role": "user",
      "content": "{\nfrom_country:\"Morocco\",\nto_country:\"Yemen\",\ninput_text:\"ahlan labas 3lik akhoya\"\n}"
    },
    {
      "role": "assistant",
      "content": "هلا وسهلا عليك أخي"
    },
    {
      "role": "user",
      "content": "{\nfrom_country:\"Morocco\",\nto_country:\"United States\",\ninput_text:\"afin akhoya\"\n}"
    },
    {
      "role": "assistant",
      "content": "what's up, brother"
    },
    {
      "role": "user",
      "content": "{\nfrom_country:\"yemen\",\nto_country:\"United States\",\ninput_text:\"أنا مريض \"\n}"
    },
    {
      "role": "assistant",
      "content": "I am sick"
    },
    {
      "role": "user",
      "content": `{\nfrom_country:\"${req.body?.from_country}\",\nto_country:\"${req.body?.to_country}\",\ninput_text:\"${req.body?.input_text}\"\n}`
    },
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
  res.send(response.choices[0].message.content);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




// This code is for v4 of the openai package: npmjs.com/package/openai

