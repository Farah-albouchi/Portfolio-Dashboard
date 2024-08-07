import axios from 'axios';  


export async function AboutgetApi (token){
    const url = `http://localhost:3000/about`;
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

export async function AboutUpdateApi (token , data){
  const url = `http://localhost:3000/about`;
  try {
      const response = await axios.put(url,data, {
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

export async function SkillAddApi (token,data){
  const url = `http://localhost:3000/about/skills`;
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
export async function AwardAddApi (token,data){
  const url = `http://localhost:3000/about/awards`;
  try {
      const response = await axios.post(url,data, {
          headers: {
            Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
          },
        });
      if(response.status === 201 ){
        console.log(response);
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
export async function EducationAddApi (token,data){
  const url = `http://localhost:3000/about/education`;
  try {
      const response = await axios.post(url,data, {
          headers: {
            Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
          },
        });
      if(response.status === 201 ){
        console.log(response);
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


export async function SkillDeleteApi (token , index){
  const url = `http://localhost:3000/about/skills/${index}`;
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

export async function AwardDeleteApi (token , index){
  const url = `http://localhost:3000/about/award/${index}`;
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
export async function educationDeleteApi (token , index){
  const url = `http://localhost:3000/about/education/${index}`;
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
