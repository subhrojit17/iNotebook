import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "68f51fbcd984dd7a5c453e6b",
      user: "68f51f2dd984dd7a5c453e68",
      title: "My Journey in Football",
      description:
        "From a young boy in Madeira with big dreams to becoming one of the greatest footballers in history, my journey has been about hard work, dedication, and passion. I've had the honor to win 5 Ballon d'Or awards and score nearly 950 goals, but more importantly, I've always strived to give my best for every team I represent. Winning league titles, Champions Leagues, and the European Championship with Portugal are memories I cherish, but inspiring others and pushing my limits every day is what drives me.",
      tag: "my story, football career, passion, hard work, Ronaldo",
      date: "2025-10-19T17:28:28.879Z",
      __v: 0,
    },
    {
      _id: "68f4ad6717186ed51456bd84",
      user: "68f49cf6fd74c51a8b15aadd",
      title: "Champion of Dreams",
      description:
        "From Rosario to the stars — leading Argentina to World Cup glory in 2022 was the fulfillment of a lifelong dream. Every goal, every battle, and every tear shaped this moment — lifting the trophy for my country after 36 years of waiting. Football gave me everything, and this was my way of giving back to Argentina.",
      tag: "WorldCup2022, Argentina, GoldenBall, Legacy, GOAT",
      date: "2025-10-19T09:20:39.513Z",
      __v: 0,
    },
    {
      _id: "68f4ad6717186ed51456bd841",
      user: "68f49cf6fd74c51a8b15aadd",
      title: "Champion of Dreams",
      description:
        "From Rosario to the stars — leading Argentina to World Cup glory in 2022 was the fulfillment of a lifelong dream. Every goal, every battle, and every tear shaped this moment — lifting the trophy for my country after 36 years of waiting. Football gave me everything, and this was my way of giving back to Argentina.",
      tag: "WorldCup2022, Argentina, GoldenBall, Legacy, GOAT",
      date: "2025-10-19T09:20:39.513Z",
      __v: 0,
    },
    {
      _id: "68f4ad6717186ed51456bd842",
      user: "68f49cf6fd74c51a8b15aadd",
      title: "Champion of Dreams",
      description:
        "From Rosario to the stars — leading Argentina to World Cup glory in 2022 was the fulfillment of a lifelong dream. Every goal, every battle, and every tear shaped this moment — lifting the trophy for my country after 36 years of waiting. Football gave me everything, and this was my way of giving back to Argentina.",
      tag: "WorldCup2022, Argentina, GoldenBall, Legacy, GOAT",
      date: "2025-10-19T09:20:39.513Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  // Add a Note
  const addNote = (title, description, tag) => {
    // TODO: API Call
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
  const deleteNote = (id) => {
    // TODO: API Call
    console.log(`Deleting the note with id:${id}`);
    const newNotes = notes.filter((note)=>{ return note._id!==id})
    setNotes(newNotes);
  };
  
  // Edit a Note
  const editNote = () => {};
  // TODO: API Call

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
