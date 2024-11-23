const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the notes routes
app.use('/api', notesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
