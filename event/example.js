const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Add this to handle file paths
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(path.join(__dirname))); // Serve files in the same directory as this script

// MongoDB connection URL
const url = 'mongodb://localhost:27017/eventDB';  // Change this to your MongoDB connection string if needed

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database'))
  .catch(error => console.error('Database connection error:', error));

// Define a User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: String,
  college: String,
  department: String,
  phone: String
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Serve the index.html file on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Send index.html file
});

// Registration route
app.post('/register', async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    college: req.body.college,
    department: req.body.department,
    phone: req.body.phone
  });

  try {
    await user.save();
    // Send back a detailed response with all submitted user data
    res.send(`
      <h1>Thank you, ${user.firstName}! Your registration was successful.</h1>
      <h2>Registration Details:</h2>
      <p>First Name: ${user.firstName}</p>
      <p>Last Name: ${user.lastName}</p>
      <p>Gender: ${user.gender}</p>
      <p>College Name: ${user.college}</p>
      <p>Department Name: ${user.department}</p>
      <p>Phone Number: ${user.phone}</p>
    `);
  } catch (error) {
    console.error('Error saving user:', error.message);
    res.status(500).send('<h1>Failed to register. Please try again later.</h1>');
  }
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
