import NoteContext from "./NoteContext";
import { useState } from "react";
import axios from "axios";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //  Get All Notes
  const getNotes = async () => {
    try {
      const response = await axios.get(
        `${host}/api/notes/fetchAllNotes`,
        {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmNDljZjZmZDc0YzUxYThiMTVhYWRkIn0sImlhdCI6MTc2MTQ5MDA2OH0.Ps7qPuoPe6RUqD9h-__fxgsVOPMYrxxMAcTMmcZEfwk",
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
      console.log(`Added new note ${response} successfully!`);
    } catch (error) {
      console.error(error);
    }
    console.log("Adding a new Note");

    const note = {
      _id: "68f4ad6717186ed51456bd842new",
      user: "68f49cf6fd74c51a8b15aadd",
      title: title,
      description: description,
      tag: tag,
      date: "2025-10-19T09:20:39.513Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
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
      console.log(`Deleted ${response.data} successfully!`);
    } catch (error) {
      console.error(error);
    }
    console.log(`Deleting the note with id:${id}`);
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
      console.log(`Updated note to ${response.data} successfully!`);
    } catch (error) {
      console.error(error);
    }

    // Logic to edit in client
    console.log(`Editing Note with id: ${id}`);
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element.id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
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
