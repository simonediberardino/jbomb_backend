const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Define the port the server will listen on
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reviewsdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for reviews
const reviewSchema = new mongoose.Schema({
  author: String,
  content: String,
  rating: Number,
  created_at: { type: Date, default: Date.now }
});

// Create a model for reviews
const Review = mongoose.model('Review', reviewSchema);

// Define a route for POST requests to /reviews to save a new review
app.post('/reviews', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).send('Review saved successfully');
  } catch (error) {
    res.status(400).send('Error saving review: ' + error.message);
  }
});

// Define a route for GET requests to /reviews to fetch all reviews
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send('Error fetching reviews: ' + error.message);
  }
});

// Start the server and have it listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
