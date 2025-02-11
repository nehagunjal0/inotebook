import { useState } from "react";
import noteContext from "./noteContext";

const NotesState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Fetch/get all notes:
  const getallNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhODUxMDNmNTRiYmQ4N2ZiZTM4NzBkIn0sImlhdCI6MTczOTEwNDY2OH0.PBth-xgWgE8xvW0iAuCoRpHcTGp4ETW2BPlejAxdKUw",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note:
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhODUxMDNmNTRiYmQ4N2ZiZTM4NzBkIn0sImlhdCI6MTczOTEwNDY2OH0.PBth-xgWgE8xvW0iAuCoRpHcTGp4ETW2BPlejAxdKUw",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //const json = await response.json();

    const note = {
      _id: "67a8f007cdd7e451b93456da21b7",
      user: "67a85103f54bbd87fbe3870d",
      title: title,
      description: description,
      tag: tag,
      date: "2025-02-09T18:12:23.863Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a note:
  const deleteNote = async (id) => {
    //API call:
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhODUxMDNmNTRiYmQ4N2ZiZTM4NzBkIn0sImlhdCI6MTczOTEwNDY2OH0.PBth-xgWgE8xvW0iAuCoRpHcTGp4ETW2BPlejAxdKUw",
      },
    });
    //const json = await response.json();

    //Client side logic  to delet note
    const newNotes = notes.filter((note) => note._id !== id);
    console.log("Deleting note" + id);
    setNotes(newNotes);
  };

  //Update/edit a note:
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhODUxMDNmNTRiYmQ4N2ZiZTM4NzBkIn0sImlhdCI6MTczOTEwNDY2OH0.PBth-xgWgE8xvW0iAuCoRpHcTGp4ETW2BPlejAxdKUw",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));

    //logic to update in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, getallNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NotesState;
