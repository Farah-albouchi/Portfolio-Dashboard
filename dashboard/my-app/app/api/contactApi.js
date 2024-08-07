import axios from 'axios';


export async function ContactgetApi (token){
    const url = `http://localhost:3000/user/LoadUser`;
    try {
        const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
            },
          });
        if(response.status === 200 ){
            return response.data;
        }
        else  {
            return {message:"Something went wrong"}
        }
    }catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
      }
}

export async function ContactUpdateApi (token , data){
    const url = `http://localhost:3000/user`;
    try {
        const response = await axios.put(url,data, {
            headers: {
              Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
            },
          });
        if(response.status === 200 ){
            return response.data;
        }
        else  {
            return {message:"Something went wrong"}
        }
    }catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
      }
  }