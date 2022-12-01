import React, { useEffect, useState } from "react";
import Axios from "axios";
import SubscriptionReq from "./SubscriptionReq";
import MySongs from "./MySongs";

export default function Homepage() {
  const [role, setRole] = useState("");

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setRole(response.data.user[0].isAdmin);
      }
    });
  }, []);

  return (
    <div>
      {role === 0 && <MySongs />}
      {role === 1 && <SubscriptionReq/>}
    </div>
  );
}
