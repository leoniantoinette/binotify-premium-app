import React, { useEffect, useState } from "react";
import Axios from "axios";
import SubscriptionReq from "./SubscriptionReq";
import MySongs from "./MySongs";
import { useNavigate } from "react-router-dom";
export default function Homepage() {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
    window.location.reload();
  };
  const register = () => {
    navigate("/registers");
    window.location.reload();
  };
  const [role, setRole] = useState("");
  useEffect(() => {
    document.title = "Binotify Premium App - Freaky Fun  ";
  });

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setRole(response.data.user[0].isAdmin);
      }
    });
  }, []);

  return (
    
      <div className ="h-screen w-full  bg-home">
        <h1 className ='m-auto text-center text-white text-lg'>Binotify Premium App</h1>
        <div className="m-auto">
        <button onClick={login} className='fa-fa-user float-right focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-0.5 mx-4'>login</button>
        <button onClick={register} className='fa-fa-user float-right focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-0.5 mx-4'>register</button>
   </div>  
   
   {role === 0 && <MySongs />}
      {role === 1 && <SubscriptionReq/>}
    </div>
  );
}
