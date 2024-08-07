import axios from 'axios';   

export async function ServicegetApi (token){
    const url = `http://localhost:3000/serviceSection`;
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
export async function ServiceAddApi (token,data){
    const url = `http://localhost:3000/serviceSection/service`;
    try {
        const response = await axios.post(url,data, {
            headers: {
              Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
            },
          });
        if(response.status === 201 ){
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
  export async function ServiceUpdateApi (token , data){
    const url = `http://localhost:3000/serviceSection`;
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
  export async function ServiceDeleteApi (token , index){
    const url = `http://localhost:3000/serviceSection/service/${index}`;
    try {
        const response = await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
            },
          });
        if(response.status === 204 ){
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