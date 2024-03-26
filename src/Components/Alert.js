import React from 'react'
export default function Alert(props) {
  return (
    <div className="container" >
 {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
        {props.alert.msg}
  </div>}
  </div>
  )
}
