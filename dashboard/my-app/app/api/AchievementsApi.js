import axios from 'axios';   

export async function AchievementgetApi (token){
    const url = `http://localhost:3000/work`;
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
export async function AchievementAddApi (token,data){
    const url = `http://localhost:3000/work/achievement`;
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
  export async function AchievementDeleteApi (token , index){
    const url = `http://localhost:3000/work/achievement/${index}`;
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



  export async function AchievementUpdateApi (token , data){
    const url = `http://localhost:3000/work`;
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