import axios from "axios";

export async function Apilog(email, password) {
  const url = 'http://localhost:3000/auth/login';
  const data = { email, password };
  try {
    const rep = await axios.post(url, data);
    console.log(rep);
    if (rep.status === 200) {
      localStorage.setItem('token', rep.data.token);
      return { message: "success" };
    } else if (rep.status === 404) {
      return { email: "Account Not Found" };
    } else if (rep.status === 401) {
      return { password: "Invalid Password" };
    } else if (rep.status === 422) {
      return { password:rep.data.message};
    } else {
      return { error: "Something went wrong" };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return { error: error.response.data.message };
    }
    return { error: "Something went wrong" };
  }
}
