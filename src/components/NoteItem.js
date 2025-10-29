import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-5">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title p-2 d-flex align-items-center justify-content-center">
            {" "}
            {note.title}
          </h5>
          <p className="card-text p-2">{note.description}</p>
          <div className="d-flex align-items-center justify-content-end">
            <i
              className="fa-solid fa-trash btn"
              style={{ color: "#f50000" }}
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i className="fa-solid fa-file-pen btn btn-tertiary mx-2" onClick={()=>updateNote(note)}></i>
          </div>

          {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
