import React from 'react'
import styles from "./Detailpage.css"
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Detailpage() {
  var navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("email")==null){
      navigate("/signin");
      window.alert("Login First");
    }
  },[]);
 
  return (
    <div>Detailpage</div>
  )
}

export default Detailpage