import React from 'react'
import styles from "./SignIn.module.css"
import {useNavigate} from 'react-router-dom'
import Button from '../../components/Button/Button';
import { apiSignIn } from '../../auth/auth';

function SignIn() {
  let navigate=useNavigate();
  const [signInData,setSignInData]=React.useState({
    email:"",
    password:""
  })

  function handleChange(event){
    setSignInData((prevData)=>{
        return{
            ...prevData,
            [event.target.name]:event.target.value
        }
    })
  }


  function formvalidate(data){
    var email=/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    
    for(let key in data){
        switch(key){
           
            case "email":
                if(!email.test(data[key])){
                    window.alert('Enter a valid '+key);
                    return false;
                }
                break;
            case "password":
                if(data[key].length<8){
                    window.alert('Password should be atleast 8 characters long');
                    return false;
                }
                break;
        }
    }
    return true;
  }

  const onSubmit= async() => {
    var data={...signInData}
    var x=formvalidate(data);
    if(x){
        const res=await apiSignIn(data);
        if(res.status>=200 && res.status<=299){
          localStorage.setItem("mail",res.data.email)
          navigate('/confirmOTP');
        }
        window.alert(res.data.message);
    };
  }

  const onForgot= async() => {
    navigate('/forgotpassword');
  }

  return (
    <div>
           <div className={`${styles.card}`}>
    <div className={`${styles.cardchild}`}>
            <h1 className={`${styles.head}`}>SIGN IN</h1>
            <div className={`${styles.content}`}>
                <label>Mail ID :<br/> <br/><input type='email' name="email" onChange={handleChange} value={signInData.email} className={`${styles.inputfields}`}/></label><br/><br/>       
                <label>Password : <br/><br/><input type='password' name='password' onChange={handleChange} val={signInData.password} className={`${styles.inputfields}`} /></label><br/><br/>
            <Button text='Sign In' func={onSubmit} /><br/><br/>
            <Button text='Forgot password' func={onForgot} /><br/><br/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default SignIn