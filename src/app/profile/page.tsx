"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
  });

  const getUserData = async () => {
    const res = await axios.get(`/api/users/me`);
    setUserData(res.data);
  };
  
  useEffect(() => {
    getUserData();
  }, []);
  
  return userData ? (
    <div>
      <h2>User Data:</h2>
      <p>Name: {userData?.userName}</p>
      <p>Email: {userData?.email}</p>
    </div>
  ) : (
    <div>Loading user data...</div>
  );
};

export default page;
