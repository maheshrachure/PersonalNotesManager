const db = require('../config/db');

// Create a new note
exports.createNote = (req, res) => {
  const { title, description, category } = req.body;

  // Validation
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  const query = `
    INSERT INTO notes (title, description, category)
    VALUES (?, ?, ?)
  `;

  db.run(query, [title, description, category || 'Others'], function (err) {
    if (err) {
      console.error('Error creating note:', err.message);
      return res.status(500).json({ error: 'Failed to create note.' });
    }
    res.status(201).json({ message: 'Note created successfully!', id: this.lastID });
  });
};

// Get all notes
exports.getNotes = (req, res) => {
  const { search, category } = req.query;

  let query = 'SELECT * FROM notes';
  const params = [];

  // Apply filters if provided
  if (search || category) {
    query += ' WHERE';
    if (search) {
      query += ' title LIKE ? OR description LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
      if (search) query += ' AND';
      query += ' category = ?';
      params.push(category);
    }
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching notes:', err.message);
      return res.status(500).json({ error: 'Failed to fetch notes.' });
    }
    res.status(200).json(rows);
  });
};

// Update a note
exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;

  // Validation
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  const query = `
    UPDATE notes
    SET title = ?, description = ?, category = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [title, description, category || 'Others', id], function (err) {
    if (err) {
      console.error('Error updating note:', err.message);
      return res.status(500).json({ error: 'Failed to update note.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Note not found.' });
    }

    res.status(200).json({ message: 'Note updated successfully!' });
  });
};

// Delete a note
exports.deleteNote = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM notes WHERE id = ?';

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error deleting note:', err.message);
      return res.status(500).json({ error: 'Failed to delete note.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Note not found.' });
    }

    res.status(200).json({ message: 'Note deleted successfully!' });
  });
};
