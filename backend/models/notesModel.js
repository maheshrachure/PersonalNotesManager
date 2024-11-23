const db = require('../config/db');

// Create a new note
exports.createNote = (title, description, category = 'Others') => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO notes (title, description, category)
      VALUES (?, ?, ?)
    `;
    
    db.run(query, [title, description, category], function (err) {
      if (err) {
        console.error('Error creating note:', err.message);
        reject('Failed to create note.');
      } else {
        resolve(this.lastID);
      }
    });
  });
};

// Get all notes with optional filters
exports.getNotes = (search = '', category = '') => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM notes WHERE 1=1';
    const params = [];

    // Apply search filter
    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    // Apply category filter
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';

    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Error fetching notes:', err.message);
        reject('Failed to fetch notes.');
      } else {
        resolve(rows);
      }
    });
  });
};

// Update a note by ID
exports.updateNote = (id, title, description, category = 'Others') => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE notes
      SET title = ?, description = ?, category = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    db.run(query, [title, description, category, id], function (err) {
      if (err) {
        console.error('Error updating note:', err.message);
        reject('Failed to update note.');
      } else if (this.changes === 0) {
        reject('Note not found.');
      } else {
        resolve('Note updated successfully!');
      }
    });
  });
};

// Delete a note by ID
exports.deleteNote = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM notes WHERE id = ?';

    db.run(query, [id], function (err) {
      if (err) {
        console.error('Error deleting note:', err.message);
        reject('Failed to delete note.');
      } else if (this.changes === 0) {
        reject('Note not found.');
      } else {
        resolve('Note deleted successfully!');
      }
    });
  });
};
