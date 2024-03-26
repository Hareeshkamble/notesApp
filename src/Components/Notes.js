import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useRef } from 'react'
import contextvalue from "../Context/Notes/NoteContext"
import AddNote from './AddNote'
import NoteITEM from "./NoteITEM"
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
  let context = useContext(contextvalue)
  let navigate=useNavigate()

  // let notes=context.notes
  let { notes, getNotes, EditNote } = context
  useEffect(() => {
    if(localStorage.getItem("token")){
      getNotes()
    }else{
      navigate("/login")
    }
    // eslint-disable-next-line 
  }, [])

  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setnote] = useState({ etitle: "", eDescription: "", etag: "", id: "" })

  const updateNote = (currentNote) => {
    ref.current.click()
    setnote({ etitle: currentNote.title, eDescription: currentNote.Description, etag: currentNote.tag, id: currentNote._id })
  }
  const AddNoteInDB = (value) => {
    value.preventDefault()
    console.log("Updating the Notes", note)
    EditNote(note.etitle, note.eDescription, note.etag, note.id)
    refclose.current.click()
    props.showAlert("your note has been updated","primary")
{}
  }

  const onchange = (e) => {
    setnote({ ...note,[e.target.name]:e.target.value }) // it makes the enterd data= values of the title and description 
  }
  // let setnotes=context.setnotes
  return (
    <div className="row">
      <AddNote showAlert={props.showAlert}/>
      <div className="model">
        <button ref={ref} type="button" className="btn btn-primary modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        </button>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">title</label>
                  <input type="text" className="form-control" name='etitle' id="etitle" onChange={onchange}
                    value={note.etitle} />
                </div>
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label">Description</label>
                  <input type="text" value={note.eDescription} className="form-control" id="eDescription" name="eDescription" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">TAG</label>
                  <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onchange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="close" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" disabled={note.etitle.length<5||note.etag.length<3} className="btn btn-primary" onClick={AddNoteInDB}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>MY NOTES</h2>
      <div className="container"><h2 className='text-center fs-1'>
        {notes.length === 0 ? "Please add the Notes" :" "}
      </h2>
      </div>
      {notes.map((note) => {
        return <NoteITEM key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
      })}

    </div>
  )
}
