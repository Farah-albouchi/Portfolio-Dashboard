import axios from 'axios';


export async function MessagegetApi (token){
    const url = `http://localhost:3000/Messages`;
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

export async function MessagesDeleteApi (token , id){
  const url = `http://localhost:3000/Messages/${id}`;
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
