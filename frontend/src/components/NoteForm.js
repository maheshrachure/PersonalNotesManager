import React, { useState } from "react";
import { addNote, updateNote } from "../api/notesAPI";

const NoteForm = ({ selectedNote, onSave }) => {
  const [note, setNote] = useState(
    selectedNote || { title: "", description: "", category: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (note.id) {
        await updateNote(note.id, note);
      } else {
        await addNote(note);
      }
      onSave();
      setNote({ title: "", description: "", category: "" });
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={note.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="category"
        value={note.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;
