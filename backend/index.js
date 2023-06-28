const express = require('express');
const fetch = require('isomorphic-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/generate-joke', async (req, res) => {
  try {
    // Make a request to the OpenAI API to generate a joke
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: 'Tell me a joke.',
        max_tokens: 30
      })
    });

    const data = await response.json();
    
    // Send the generated joke as a response
    res.json({ joke: data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate joke' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
