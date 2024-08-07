import { userContext } from '../app/Context/userContext'
const { useEffect, useContext } = require("react")
import { useRouter } from "next/router";

 const Home = () => {
    const router = useRouter();
    const {user,setUser,loadMe} = useContext(userContext)
    useEffect (()=>{
        const fetchData = async ()=>{
             if(user){
                router.replace('/dashboard');
             }else {
                router.replace('/login');
             }
        }
        fetchData();
    },[] 
)

}
export default Home;