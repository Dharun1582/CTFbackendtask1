import React from 'react';
import { useState } from "react";
import styles from "./ChangePassword.module.css";
// import { apiUpdatePwCust } from "../../auth/auth";
import Button from '../../components/Button/Button';
import {useNavigate} from 'react-router-dom';
import { apiUpdatePw } from '../../auth/auth';

function ChangePassword() {
    var navigate = useNavigate();
    let email = localStorage.getItem("ChnEmail");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");
    const passwordchange = async () => {
        if (newPassword==reNewPassword) {
            var data = { email: email, password: newPassword };
            const res=await apiUpdatePw(data);
            if (res.status >= 200 && res.status <= 299) {
                window.alert(res.data.message);
                localStorage.clear();
                navigate('/signin');
            }
            else {
                window.alert(res.data.message);
            }
        }
        else {
            window.alert("Passwords do no match!");
        }

    }
      
  return (
    <div>

      <div className={`${styles.card}`}>

        <h1 className={`${styles.head}`}>Update Password</h1>
        <div className={`${styles.content}`}>
          <label>Enter New Password : <br /><br /><input type='password' onChange={(event)=>{setNewPassword(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />
          <label>Re-Enter Password : <br /><br /><input type='password' onChange={(event)=>{setReNewPassword(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />
          <Button text='Update' func={passwordchange} /><br/><br/>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;