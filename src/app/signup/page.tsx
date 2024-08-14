"use client";

import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/users/signup", userData);
      console.log(res);
      setUserData({ userName: "", email: "", password: "" });
      alert("User created successfully!");
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      alert("An error occurred while signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center my-5 text-3xl">Sign-up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col"
      >
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="mt-1 w-full px-3 py-2 text-sm outline-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-zinc-800"
            type="text"
            name="userName"
            id="username"
            value={userData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            className="mt-1 w-full px-3 py-2 text-sm outline-none rounded-md focus bg-zinc-800"
            type="text"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-1 w-full px-3 py-2 text-sm outline-none rounded-md focus bg-zinc-800"
            type="text"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className={`w-[10rem] px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:bg-indigo-700 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >Create account</button>
      </form>
    </>
  );
};

export default page;
