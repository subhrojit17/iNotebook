import NoteContext from "./NoteContext";
import { useState } from "react";
import axios from "axios";

const NoteState = (props) => {
  const host = process.env.REACT_APP_LOCAL_HOST;
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //  Get All Notes
  const getNotes = async () => {
    try {
      const response = await axios.get(`${host}/api/notes/fetchAllNotes`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    try {
      const response = await axios.post(
        `${host}/api/notes/addNote`,
        { title: title, description: description, tag: tag },
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmNDljZjZmZDc0YzUxYThiMTVhYWRkIn0sImlhdCI6MTc2MTQ5MDA2OH0.Ps7qPuoPe6RUqD9h-__fxgsVOPMYrxxMAcTMmcZEfwk",
            "Content-Type": "application/json",
          },
        }
      );
      setNotes(notes.concat(response.data));
      console.log("Adding a new Note");
      console.log(`Added new note ${response.data.title} successfully!`);
    } catch (error) {
      console.error(error);
    }
  };
  // Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    try {
      const response = await axios.delete(
        `${host}/api/notes/deleteNote/${id}`,
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmNDljZjZmZDc0YzUxYThiMTVhYWRkIn0sImlhdCI6MTc2MTQ5MDA2OH0.Ps7qPuoPe6RUqD9h-__fxgsVOPMYrxxMAcTMmcZEfwk",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    console.log(`Note Deleted successfully!`);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    try {
      const response = await axios.put(
        `${host}/api/notes/editNote/${id}`,
        { title: title, description: description, tag: tag },
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmNDljZjZmZDc0YzUxYThiMTVhYWRkIn0sImlhdCI6MTc2MTQ5MDA2OH0.Ps7qPuoPe6RUqD9h-__fxgsVOPMYrxxMAcTMmcZEfwk",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Updated note to ${response.data.title} successfully!`);
      // After successful API call, update the state
      const newNotes = notes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            title: title,
            description: description,
            tag: tag,
          };
        }
        return note;
      });
      setNotes(newNotes);
      return true;
    } catch (error) {
      console.error("Error updating note:", error);
      return false;
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
