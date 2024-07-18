const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create an instance of an Express application
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the port the server will listen on
const PORT = 3000;

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create a table for reviews
db.serialize(() => {
  db.run(`
    CREATE TABLE reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      rating INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Define a route for POST requests to /reviews to save a new review
app.post('/reviews', (req, res) => {
  const { author, content, rating } = req.body;
  const query = 'INSERT INTO reviews (author, content, rating) VALUES (?, ?, ?)';

  db.run(query, [author, content, rating], function (err) {
    if (err) {
      return res.status(400).send('Error saving review: ' + err.message);
    }
    res.status(201).send('Review saved successfully');
  });
});

// Define a route for GET requests to /reviews to fetch all reviews
app.get('/reviews', (req, res) => {
  const query = 'SELECT * FROM reviews';

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).send('Error fetching reviews: ' + err.message);
    }
    res.status(200).json(rows);
  });
});

// Start the server and have it listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
