import React from 'react'
import styles from "./SignUp.module.css"
import {useNavigate} from 'react-router-dom'
import Button from '../../components/Button/Button';
import { apiSignUp } from '../../auth/auth';

function SignUp() {

  let navigate=useNavigate();
  const [signUpData,setSignUpData]=React.useState({
    Name:"",
    email:"",
    password:""
  })

  function handleChange(event){
    setSignUpData((prevData)=>{
        return{
            ...prevData,
            [event.target.name]:event.target.value
        }
    })
  }


  function formvalidate(data){
    var Name=/^[A-Za-z]+$/;   //alpha characters without space and min 1 char
    var email=/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    
    for(let key in data){
        console.log(key+" "+data[key]);
        switch(key){
            case "Name":
                if(!Name.test(data[key])){
                    window.alert('Enter a valid '+key)
                    return false;
                }
                break;
           
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
    var data={...signUpData}
    console.log(data);
    var x=formvalidate(data);
    console.log(x);
    if(x){
        const res=await apiSignUp(data);
        console.log(res);
        if(res.status>=200 && res.status<=299){
            navigate('/signin');
        }
        window.alert(res.data.message);
        console.log(res.data);
    //   res.redirect('/loginCustomer')
    };
  }

  return (
    <div>
           <div className={`${styles.card}`}>
    <div className={`${styles.cardchild}`}>
            <h1 className={`${styles.head}`}>SIGN UP</h1>
            <div className={`${styles.content}`}>
                <label>Name :<br/><br/> <input type='text' name='Name' onChange={handleChange} value={signUpData.firstName} className={`${styles.inputfields}`} /></label><br/><br/>
                <label>Mail ID :<br/> <br/><input type='email' name="email" onChange={handleChange} value={signUpData.email} className={`${styles.inputfields}`}/></label><br/><br/>       
                <label>Password : <br/><br/><input type='password' name='password' onChange={handleChange} val={signUpData.password} className={`${styles.inputfields}`} /></label><br/><br/>
            <Button text='Sign Up' func={onSubmit} /><br/><br/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp