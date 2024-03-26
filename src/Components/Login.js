
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login(props) {
    let navigate=useNavigate() // this replacememt of UseHistory
const  [credentials, setcredentials] = useState({email:"",password:""})
  let onchange=(e)=>{
setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    let loginsubmit=async(e)=>{
        e.preventDefault()//👈 this is helps to not to reload the page
        // hitting the api with help of the url
        const response = await fetch("http://localhost/api/auth/login",{
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
          headers:{
            "Content-Type":"application/json"
          },
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: JSON.stringify({email:credentials.email, password:credentials.password}), 
        });
        setcredentials({email:"",password:""})// this is helps to after entering the values it will be empty
        const json= await response.json()
        console.log(json)
        if(json.success){
            // save the auth token and redirect to the home page
          localStorage.setItem('token',json.authToken)
          props.showAlert("Successfully Logged in","success")
          navigate("/")
        }
        else{
          props.showAlert("invalid Credentials","danger")
        }
    }

const clear=()=>{
}
  return (
    <>
    <form onSubmit={loginsubmit} className="container">
      <h2>Login to Inote book</h2>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control email" id="email" value={credentials.email} name='email' aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control password" id="password" name='password' value={credentials.password} onChange={onchange}/>
  </div>

  <button type="submit" onClick={clear} className="btn btn-primary">Login</button>
</form>

  </>
  )
}
