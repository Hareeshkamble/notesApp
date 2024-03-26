import React, { } from 'react'
import { Link,  useLocation, useNavigate } from 'react-router-dom'
export default function Navbar() {

  let location = useLocation()
  let navigate =useNavigate()
const logout=()=>{
localStorage.removeItem("token")
navigate("/login")
// window.location.reload()
}
  // console.log(pathname)


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">I-note</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/About' ? "active" : ""}`} to="/About">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/">Moree</Link>
              </li>
            </ul>
            <span className="navbar-text">
              {!localStorage.getItem("token")?<div>
              <Link to='/login' className='btn btn-primary m-1' role='button'>Login</Link>
              <Link to='/signup' className='btn btn-primary m-1' role='button'> Sign Up</Link>
              </div>:<button onClick={logout} className='btn btn-primary'>Logout</button>}
              {/* {add the user details and signout button like a pro websites} */}
            </span>
          </div>
        </div>
      </nav>
    </>
  )
}
// ===?"":idu//