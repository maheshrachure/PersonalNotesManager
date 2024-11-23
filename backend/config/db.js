const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Correct the path to point to the database in the 'database' folder
const dbPath = path.join(__dirname, '../database/notes.db');  // Correct path

// Open or create the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;
