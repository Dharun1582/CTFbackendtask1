import React from 'react'
import styles from "./ForgotPassword.module.css"
import { apiSendMailForgot } from '../../auth/auth';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
    var token;
    var navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [code,setCode]=useState(Math.floor(1000 + Math.random() * 9000));
    const [codeEntered,setCodeEntered]=useState("");
    const [isMailSent,setIsMailSent]=useState(false);
    const codecheck = () =>{
      if(code==codeEntered)
      {
        localStorage.clear();
        localStorage.setItem("ChnEmail",email);
        navigate(`/ChangePassword`);
      }
      else
      {
        window.alert("Codes do not match!");
      }
    }
    const sendemail = async () =>{
        var data={email:email,code:code};
        const res=await apiSendMailForgot(data);
        if(res.status>=200 && res.status<=299){
            token=res.data.token;
            window.alert(res.data.message);
            setIsMailSent(true);
        }
        else{
          window.alert(res.data.message);
        }
    }
  return (
    <div>

      <div className={`${styles.card}`}>

        <h1 className={`${styles.head}`}>Forgot Password</h1>
        <div className={`${styles.content}`}>
          <label>Enter Email : <br /><br /><input type='text' onChange={(event)=>{setEmail(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />
          <Button text='Send Mail' func={sendemail} /><br/><br/>
          {(isMailSent)?<div>
          <label>Enter the Code : <br /><br /><input type='password'  onChange={(event)=>{setCodeEntered(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />
          <Button text='Verify Code' func={codecheck} /><br/><br/>
          
          </div>:<></>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword