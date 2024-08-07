// pages/_app.js
import { UserProvider } from '../app/Context/userContext';
import '../public/globals.css';
import { userContext } from '../app/Context/userContext'
const { useEffect, useContext } = require("react")
import { useRouter } from "next/router";
import  RouteApp  from './route';

function MyApp({ Component, pageProps }) {
  
  return <UserProvider>
   <RouteApp Component={Component} pageProps={pageProps} />
   </UserProvider>
}

export default MyApp;
