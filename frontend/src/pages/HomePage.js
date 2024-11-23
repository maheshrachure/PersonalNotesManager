import React, { useState, useEffect } from "react";
import { getNotes } from "../api/notesAPI";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await getNotes();
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error.message);
      }
    };
    fetchNotes();
  }, []);

  const addNote = (newNote) => {
    if (editNote) {
      setNotes(
        notes.map((note) => (note.id === editNote.id ? newNote : note))
      );
      setEditNote(null);
    } else {
      setNotes([newNote, ...notes]);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <SearchBar onSearch={setSearchQuery} />
      <NoteForm onSave={addNote} editNote={editNote} onCancel={() => setEditNote(null)} />
      <NoteList
        notes={filteredNotes}
        onDelete={deleteNote}
        onEdit={(note) => setEditNote(note)}
      />
    </div>
  );
};

export default HomePage;
