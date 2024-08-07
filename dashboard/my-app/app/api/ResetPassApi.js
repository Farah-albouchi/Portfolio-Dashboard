import axios from "axios";

export async function ApiResetPass(email){
    const url = 'http://localhost:3000/resetPassword/forgot-password';
    const data = {email} ;
    try {
        const rep = await axios.post(url,data);
       if(rep.status===200){
        return {message:"success"}
       }else {
        return {message:"Verify your email ! "}
       }
    }catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          return { message: error.response.data.message };
        }
        console.error(error);
        return { message: "Something went wrong" };
      }
}

export async function ApiCodeOTP(email,code){
  const url = 'http://localhost:3000/resetPassword/verify-code';
  const data = {email,code} ;
  try {
      const rep = await axios.post(url,data);
     if(rep.status===200){
      localStorage.setItem('token', rep.data.token);
      return {message:"success"}
     }else {
      return {message: "Invalid or expired code"}
     }
  }catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return { message: error.response.data.message };
      }
      console.error(error);
      return { message: "Something went wrong" };
    }
}
export async function ApiNewPass(password,token){
  const url = 'http://localhost:3000/resetPassword/NewPassword';
  const data = {password} ;
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
   if(response.status===200) {
    return {message:"success"}
   }
   else if (response.status === 402) {
    return {message: "Password is same as old password"}
   }
   else {
    return {message: "Something went wrong"}
   }
    
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message };
    }
    console.error(error);
    return { message: "Something went wrong" };
  }
 
}



