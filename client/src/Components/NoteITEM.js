import React,{useContext} from 'react'
import notecontext from "../Context/Notes/NoteContext"


export default function NoteITEM(props) {
  let context=useContext(notecontext)
  let {DeleteNote}=context
  const{note,updateNote}=props
  const Delete=()=>{
  DeleteNote(note._id)
props.showAlert(" Note has been deleted Successfully","warning")
  }


// const [shake, setshake] = useState("")
//  function DeleteNote(){
// setshake("fa-shake")
// setTimeout(() => {
//     setshake("");
//   }, 500)
// }

    // let {title,description,tag}=props
  return (
    <div className="col-md-3 my-2" >
        <div className="card">
  <div className="card-body">
    <h5 key={note.title} className="card-title">{note.title}</h5>
<div className="d-flex align-itmes-center justify-content-center flex-column">
<p key={note.description}   className="card-text">{note.description}
 </p>
 <span key={note.tag}  className="badge h-25 m-2 text-bg-success  w-50">{note.tag}</span>
</div>  

    <div className="d-flex justify-content-between align-items-center">
    <i className={`fa-solid fa-pen-to-square fa-edit h-25`} style={{color:"#1c67e9"}} onClick={()=>{updateNote(note)}}></i>
    <i className={`fa-solid h-25 fa-trash ${"shake"}`}  style={{color:"red"}} onClick={Delete}></i>
    </div>
  </div>
</div>
    </div>
  )
}
