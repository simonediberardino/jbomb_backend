// Import the Express module
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port the server will listen on
const PORT = 3000;

// Define a route for GET requests to /reviews
app.get('/reviews', (req, res) => {
  // Send "test" as the response
  res.send('test');
});

// Start the server and have it listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
