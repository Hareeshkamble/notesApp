import React,{useContext,useState} from 'react'
import notecontext from "../Context/Notes/NoteContext"

export default function AddNote(props) {
let context=useContext(notecontext)
let {addNote}=context
const [note, setnote] = useState({title:"",Description:"",tag:""})

const AddNoteInDB=(value)=>{
  value.preventDefault()
  //  addNote(note.title,note.Description,note.tag)
  addNote(note.title,note.Description,note.tag)//👈 this addNote is function which declared in Notestate which accepts the title, description,tag  and we giving sending thsese values from notes.title ,notes.description , notes.tag 🥹
  setnote({title:"",Description:"",tag:""}) //👈 this is for after adding the notes the input has been empty
  props.showAlert("Note has been Added Succesfully","secondary")
}

const onchange=(e)=>{
  setnote({...note,[e.target.name]:e.target.value})// it makes the enterd data= values of the title and description 
}

  return (
    <div>
<form>
  <div className="mb-3  my-5 " id='id'>
    <label htmlFor="title" className="form-label">title</label>
    <input type="text" value={note.title} className="form-control" contentEditable={true} name='title' id="title" aria-describedby="emailHelp" onChange={onchange} required minLength={5} />
  </div>
  <div className="mb-3">
    <label htmlFor="Description" className="form-label">Description</label>
    <input type="text" value={note.Description}  className="form-control" id="Description" name="Description" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">TAG</label>
    <input type="text" value={note.tag}  className="form-control" id="tag" name="tag" onChange={onchange}/>
  </div>
  
  <button type="submit" disabled={note.title.length<5 || note.Description.length<5||note.tag.length<3} className="btn btn-primary" onClick={AddNoteInDB}>Add Note</button>
</form>
    </div>
  )
}
