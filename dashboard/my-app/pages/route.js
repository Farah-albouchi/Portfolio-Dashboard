import { userContext } from '../app/Context/userContext'
const { useEffect, useContext } = require("react")
import { useRouter } from "next/router";

const  RouteApp =({ Component, pageProps }) =>{
    const router = useRouter();
    const {user,setUser,loadMe} = useContext(userContext)
    useEffect (()=>{
        const fetchData = async ()=>{
             const rep = await loadMe() ;
             if(rep){
                setUser(rep);
             }else {
    
                if (router.pathname !== '/signup') {
                    router.replace('/login');
                }
             }
        }
        fetchData();
    },[] 
)
    return  <Component {...pageProps} />
};

export default RouteApp;
