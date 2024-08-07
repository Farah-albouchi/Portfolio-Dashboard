import axios from 'axios';   

export async function ProjectgetApi (token){
    const url = `http://localhost:3000/projectSection`;
    try {
        const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
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
export async function TypeAddApi (token,data){
    const url = `http://localhost:3000/projectSection/type`;
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
  export async function TypeDeleteApi (token , index){
    const url = `http://localhost:3000/projectSection/type/${index}`;
    try {
        const response = await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
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

  export async function ProjectAddApi (token,data){
    const url = `http://localhost:3000/projectSection/Newproject`;
    try {
        const response = await axios.post(url,data, {
            headers: {
              Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
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
  export async function ProjectDeleteApi (token , index){
    const url = `http://localhost:3000/projectSection/Newproject/${index}`;
    try {
        const response = await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
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
  export async function ProjectUpdateApi (token , data){
    const url = `http://localhost:3000/projectSection`;
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