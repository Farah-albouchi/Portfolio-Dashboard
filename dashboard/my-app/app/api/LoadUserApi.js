import axios from 'axios';

export async function LoadApi (token) {
    const url ='http://localhost:3000/user/LoadUser';
    try{
        const head = {
            headers: {Authorization: `Bearer ${token}`},
};
        const rep = await axios.get(url,head);
        console.log("lenna  "+rep)
        if(rep.status === 200) {
            return rep.data;
        }
        else {
            return null;
        }
    }catch (error) {
        console.log(error);
    }
}