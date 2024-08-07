import axios from 'axios';   

export async function TestimonialsgetApi (token){
    const url = `http://localhost:3000/Testimonials`;
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

export async function TestimonialsAddApi (token,data){
  const url = `http://localhost:3000/Testimonials`;
  try {
      const response = await axios.post(url,data, {
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
export async function TestimonialsDeleteApi (token , id){
  const url = `http://localhost:3000/Testimonials/${id}`;
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

export async function TestimonialsUpdateApi (token ,id, data){
  const url = `http://localhost:3000/Testimonials/${id}`;
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