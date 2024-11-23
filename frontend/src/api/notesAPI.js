
const BASE_URL = "http://localhost:5000/api";

export const getNotes = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    throw error;
  }
};

export const addNote = async (note) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error("Failed to save note");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding note:", error.message);
    throw error;
  }
};

export const updateNote = async (id, updatedNote) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });
    if (!response.ok) {
      throw new Error("Failed to update note");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating note:", error.message);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting note:", error.message);
    throw error;
  }
};
