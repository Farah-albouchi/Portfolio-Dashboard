import axios from 'axios';

export async function Apireg(data) {
  const url = 'http://localhost:3000/auth/register';
  try {
    const rep = await axios.post(url, data);
    if (rep.status === 201) {
      localStorage.setItem('token', rep.data.token);
      return { message: "success" };
    } else {
      return { error: "Something went wrong" };
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { error: error.response.data.message };
    }
    console.error(error);
    return { error: "Something went wrong" };
  }
}
