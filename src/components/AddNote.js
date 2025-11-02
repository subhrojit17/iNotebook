import React, { useContext, useState } from "react";
import { ReactComponent as MobileWireframe } from "../assets/Add notes-pana.svg";

import NoteContext from "../context/notes/NoteContext";
const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    // reset form after adding
    setNote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="w-50 d-flex justify-content-center align-items-center p-4">
        <MobileWireframe style={{ maxWidth: "70%", height: "auto" }} />
      </div>

      <div className="container w-50 h-auto border border-2 rounded-2 p-4 shadow-sm">
        <h2 className="mb-4 text-center">Add a Note</h2>
        <form className="my-3">
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
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              name="description"
              value={note.description}
              className="form-control"
              id="description"
              rows={3}
              onChange={onChange}
              required
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
            className="btn btn-primary w-100"
            onClick={handleClick}
            disabled={note.title.length < 3 || note.description.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
