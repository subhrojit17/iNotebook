import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Updating your note..", note);
    const success = await editNote(
      note.id,
      note.etitle,
      note.edescription,
      note.etag
    );
    if (success) {
      refClose.current.click();
      setNote({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
      });
    } else {
      alert("Failed to update note");
    }
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-light border border-2 rounded shadow-sm p-3">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    name="etitle"
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="title"
                    onChange={onChange}
                    minLength={5}
                    required
                    placeholder="Enter note title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="edescription"
                    value={note.edescription}
                    className="form-control"
                    id="edescription"
                    rows={3}
                    onChange={onChange}
                    minLength={5}
                    required
                    placeholder="Enter note description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    name="etag"
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    onChange={onChange}
                    placeholder="Tag (optional)"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-1">
        <h2>Your Notes</h2>
        {notes.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center text-secondary my-4 p-4 border border-dashed rounded"
            style={{
              minHeight: "150px",
              fontSize: "1.25rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <span style={{ marginRight: "8px", fontSize: "1.5rem" }}>🗒️</span>
            No notes to display!
          </div>
        ) : (
          notes.map((note) => (
            <div key={note._id}>
              <NoteItem updateNote={updateNote} note={note} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Notes;
