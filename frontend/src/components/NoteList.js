import React, { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api/notesAPI";

const NoteList = ({ onEdit }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <button onClick={() => onEdit(note)}>Edit</button>
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
