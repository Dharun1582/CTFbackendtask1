import React, { useEffect } from 'react'
import styles from "./ConfirmOTP.module.css"
import { apiSendMailOTP,apiCheckOTP } from '../../auth/auth';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function ConfirmOTP() {
    var token;
    var navigate = useNavigate();
    const [email,setEmail]=useState(localStorage.getItem("mail"));
    const [codeEntered,setCodeEntered]=useState("");
    const [isMailSent,setIsMailSent]=useState(false);
    
    useEffect(()=>{
        sendemail();
    },[]);


    const sendemail = async () =>{
        var data={email:email};
        const res=await apiSendMailOTP(data);
        if(res.status>=200 && res.status<=299){
            window.alert(res.data.message);
            setIsMailSent(true);
        }
        else{
          window.alert(res.data.message);
        }
    }

    const confirmOTP =async () => {
        var data={email:email,code:codeEntered}
        const res =await apiCheckOTP(data);
        if(res.status>=200 && res.status<=299){
            window.alert(res.data.message);
            localStorage.clear();
            localStorage.setItem("email",email);
            navigate("/detailpage");
        }
        else{
          window.alert(res.data.message);
        }
    }
  return (
    <div>

      <div className={`${styles.card}`}>

        <h1 className={`${styles.head}`}>Confirm OTP sent to mail</h1>
        <div className={`${styles.content}`}>
        <label>Enter the Code : <br /><br /><input type='password'  onChange={(event)=>{setCodeEntered(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />

          {(isMailSent)?<div>
            <h5>Check your mail for OTP</h5>
            <Button text='Verify Code' func={confirmOTP} /><br/><br/>
          </div>:<></>}
        </div>
      </div>
    </div>
  );
}

export default ConfirmOTP