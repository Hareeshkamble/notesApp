import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {
  let navigate=useNavigate()
  const [credentials,setcredentials] = useState({email:"",name:"",password:"",cpassword:""})
  const submitform=async(e)=>{
    e.preventDefault()
    let {email,name,password}=credentials;
  const response = await fetch("http://localhost/api/auth/createuser",{
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
          headers:{
            "Content-Type":"application/json"
          },
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body:JSON.stringify({name,email,password})
   })
     const json= await response.json()
    console.log(json);
    if(json.success){
    localStorage.setItem("token",json.authToken)
            props.showAlert("Acount created Succesfully","success")
            navigate("/")
  }
  else{
    props.showAlert("invalid Credentials","danger")
  }
  }
let onchange=(e)=>{
setcredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
<form onSubmit={submitform} className="container">
  <h2>Create a Account to Use I_NOTEBOOK</h2>
  <div className="mb-3">

    <label htmlFor="name" className="form-label">User Name</label>
    <input type="text" className="form-control name" id="name" name='name' onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control email" id="email" name='email' onChange={onchange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control password" id="password" name='password' onChange={onchange} required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control cpassword" id="cpassword" name='cpassword' onChange={onchange}required minLength={5}/>
  </div>

  <button type="submit" className="btn btn-primary">Register</button>
</form>
  )
}
