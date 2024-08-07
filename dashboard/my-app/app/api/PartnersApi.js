import axios from 'axios'; 

export async function PartnersgetApi (token){
    const url = `http://localhost:3000/partners`;
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

export async function PartnersaddApi (token,data){
    const url = `http://localhost:3000/partners`;
    console.log(data.image);
    
    try {
        const response = await axios.put(url, data,{
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data', 
            },
          });

          if (response.status === 200) {
            return { message: 'success' };
          }  else {
            return { message: 'Something went wrong' };
          }
    }catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
      }
}

export async function PartnersDeleteApi ( name ) {
  const url = `http://localhost:3000/partners/${name}`;
  try {
    const response = await axios.delete(url);
      if (response.status === 200) {
        return { message: 'success' };
      }  else {
        return { message: 'Something went wrong' };
      }
}catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
}