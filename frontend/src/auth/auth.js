import axios from 'axios';


const api =axios.create({
    baseURL: "http://localhost:3001"
});

export const apiSignUp = async (SignUpData) => {
    try {
        console.log(SignUpData);
      const response = await api.post("SignUp", SignUpData);
      return response;
    } 
    catch (error) {
      return error.response;
    }
};


export const apiSignIn = async (SignInData) => {
    try {
        console.log(SignInData);
      const response = await api.post("SignIn", SignInData);
      return response;
    } 
    catch (error) {
      return error.response;
    }
};

export const apiSendMailForgot = async(data) => {
  try{
    const response =await api.post('sendMailForgot',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}


export const apiUpdatePw = async(data) => {
  try{
    const response =await api.post('updatePw',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}


export const apiSendMailOTP = async(data) => {
  try{
    const response =await api.post('sendMailOTP',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}


export const apiCheckOTP = async(data) => {
  try{
    const response =await api.post('checkOTP',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}