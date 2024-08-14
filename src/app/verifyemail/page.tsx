"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { win32 } from "node:path/win32";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const verifyPage = () => {


  const router = useRouter()

  // const router = useRouter();
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   if (router.isReady) {
  //     const query = router.query;
  //     const { token } = query;

  //     if (typeof token === "string") {
  //       setToken(token);
  //     }

  //     console.log(query);
  //     console.log(token);
  //   }
  // }, [router.isReady, router.query]);

  const getToken = window.location.search.split("=")[1];
  console.log(getToken);
  

  const verifyHandler = async () => {
    try {
      const res = await axios.post("/api/users/verify", { token: getToken });
      // console.log(res);
      alert("Email verified successfully!");
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
      alert("An error occurred while verifying your email. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center gap-2 items-center">
      <h1 className="text-3xl">Verify Your Email</h1>
      <button className="my-2 px-3 text-xl bg-zinc-500" onClick={verifyHandler}>
        verify email
      </button>
    </div>
  );
};

export default verifyPage;
