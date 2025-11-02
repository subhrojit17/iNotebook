import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-5">
      <div className="card my-3 shadow-sm rounded">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">{note.title}</h5>
          <p className="card-text mb-4">{note.description}</p>
          <div className="d-flex justify-content-end gap-3">
            <i
              className="fa-solid fa-trash btn"
              style={{
                color: "#f50000",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              title="Delete note"
              onClick={() => deleteNote(note._id)}
              onKeyPress={(e) => e.key === "Enter" && deleteNote(note._id)}
              role="button"
              tabIndex={0}
              aria-label="Delete note"
            ></i>
            <i
              className="fa-solid fa-file-pen btn  btn-tertiary"
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
              title="Edit note"
              onClick={() => updateNote(note)}
              onKeyPress={(e) => e.key === "Enter" && updateNote(note)}
              role="button"
              tabIndex={0}
              aria-label="Edit note"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
