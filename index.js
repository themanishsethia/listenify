const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/fetch', async (req, res) => {
  const url = req.query.url;
  try {
    const response = await fetch(url);
    const content = await response.text();
    res.send(content);
  } catch (error) {
    res.status(500).send('Error fetching content');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
