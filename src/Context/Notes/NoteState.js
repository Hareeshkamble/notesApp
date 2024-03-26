import React, { useState } from "react";
import Notecontext from "./NoteContext";


export default function NoteState(props) {

  let host = "http://localhost";
  const initialNotes=[]
  const [notes, setnotes] = useState(initialNotes);


  // get all notes
  const getNotes = async() => {
    // apicall
    const response = await fetch(`${host}/api/notes/fetchnotes`,{
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },  
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const json = await response.json()
    console.log(json)
    setnotes(json)
  };

  // ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note
  const addNote = async(title,description,tag) => {
    // apicall
    const response = await fetch(`${host}/api/notes/addnotes`,{
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body:JSON.stringify({title,description,tag }),
    });
    const data= await response.json()
    setnotes(notes.concat(data));
  };


  // Delete Note// Delete Note// Delete Note// Delete Note// Delete Note// Delete Note// Delete Note
  const DeleteNote = async (id) => {
    console.log("deleting the note"+ id)
    // Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    // const json=response.json();
    const newnotes=notes.filter((note)=>{return note._id !==id })
    setnotes(newnotes)
  };

  // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note
  const EditNote = async (title,description,tag,id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json)

    let newNotes=JSON.parse(JSON.stringify(notes))

    // logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
     }
    }
    setnotes(newNotes);
    setTimeout(() => {
      window.location.reload()
    }, 3000);
  };




  return (
    <Notecontext.Provider
      value={{ notes, setnotes, addNote, DeleteNote, EditNote,getNotes}}>
      {props.children}
    </Notecontext.Provider>
  );
}

