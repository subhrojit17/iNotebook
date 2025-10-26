import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Notes from "./Notes";
const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    // reset form after adding
    setNote({ title: "", description: "", tag: "default" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3 ">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            name="title"
            value={note.title}
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            value={note.description}
            className="form-control"
            id="description"
            rows={3}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            name="tag"
            value={note.tag}
            type="text"
            className="form-control"
            id="tag"
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          disabled={note.title.length < 3 || note.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
