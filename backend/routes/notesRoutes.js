const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// Route to create a new note
router.post('/notes', async (req, res) => {
  const { title, description, category } = req.body;

  // Validate the required fields
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const noteId = await notesController.createNote(title, description, category);
    res.status(201).json({ message: 'Note created successfully', id: noteId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Route to get all notes, with optional filters for search and category
router.get('/notes', async (req, res) => {
  const { search, category } = req.query;

  try {
    const notes = await notesController.getNotes(search, category);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Route to update a note by ID
router.put('/notes/:id', async (req, res) => {
  const { title, description, category } = req.body;
  const noteId = req.params.id;

  // Validate the required fields
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const message = await notesController.updateNote(noteId, title, description, category);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Route to delete a note by ID
router.delete('/notes/:id', async (req, res) => {
  const noteId = req.params.id;

  try {
    const message = await notesController.deleteNote(noteId);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
