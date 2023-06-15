const express = require('express');
const app = express();
const fs = require('fs');

// Read the JSON files
const jsonData1 = fs.readFileSync('quiz.json');
const quiz = JSON.parse(jsonData1);

const jsonData2 = fs.readFileSync('country.json');
const country = JSON.parse(jsonData2);

const jsonData3 = fs.readFileSync('data3.json');
const data3 = JSON.parse(jsonData3);

// Define a middleware function to validate the API key
const validateApiKey = (req, res, next) => {
  const { apikey } = req.query;
  const expectedApiKey = 'notsopreety'; // Define the expected API key

  // Check if the API key is missing
  if (!apikey) {
    return res.status(400).json({
      code: 400,
      message: 'Missing API key'
    });
  }

  // Check if the API key matches the expected key
  if (apikey === expectedApiKey) {
    next(); // API key is valid, proceed to the next middleware/route
  } else {
    res.status(403).json({
      code: 403,
      message: 'Invalid API key'
    }); // Forbidden
  }
};

// Apply the API key validation middleware to the specific endpoint
app.get('/quiz', validateApiKey, (req, res) => {
  const randomIndex = Math.floor(Math.random() * quiz.length);
  const randomObject = quiz[randomIndex];

  // Send the JSON response with formatted output
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(randomObject, null, 2));
});

app.get('/country', validateApiKey, (req, res) => {
  const randomIndex = Math.floor(Math.random() * country.length);
  const randomObject = country[randomIndex];

  // Send the JSON response with formatted output
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(randomObject, null, 2));
});

app.get('/data3', validateApiKey, (req, res) => {
  const randomIndex = Math.floor(Math.random() * data3.length);
  const randomObject = data3[randomIndex];

  // Send the JSON response with formatted output
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(randomObject, null, 2));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
