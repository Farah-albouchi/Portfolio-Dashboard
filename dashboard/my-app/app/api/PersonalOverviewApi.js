import axios from 'axios';

export async function UsergetApi (token){
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

export async function OverviewApi(token) {
  const url = `http://localhost:3000/home`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' 
      },
    });
    if(response.status === 200) {
        return response.data;
    }else if (response.status===404) {
        return {message : "this user does't have personal section"}
    }else {
        return {message:"Something went wrong"}
    }
    
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch home data');
  }
}

export async function UpdateOverviewApi (token,data) {
  const url = `http://localhost:3000/home`;
  console.log(token);
  try {
    const response = await axios.put(url,data,{
      headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', 
      },
     
    });
    console.log(response);
    if(response.status === 200) {
        return { message: "success" };
    }else if (response.status===400) {
        return {message : "verify your informations"}
    }else {
        return {message:"Something went wrong"}
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch home data');
  }
}


export async function UpdateNameApi(token, data) {
  const url = `http://localhost:3000/user`;
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
    });
    if (response.status === 200) {
      return { message: 'success' };
    } else if (response.status === 400) {
      return { message: 'verify your informations' };
    } else {
      return { message: 'Something went wrong' };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch home data');
  }
}