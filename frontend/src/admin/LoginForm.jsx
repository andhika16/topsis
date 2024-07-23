// src/pages/LoginForm.js

import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { fa1, fa2, fa3 } from "../assets/sidebar";

const LoginForm = () => {
  const { login, authState } = useAuthContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      console.log(username,password);
      if(login) {
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-950 p-8  max-w-md w-full">
        <div className="">
          <h2 className="text-2xl font-bold  text-left text-gray-50">
            Sistem Pendukung Keputusan Penduduk Miskin
          </h2>
          <p className="text-sm font-semibold mb-6 text-left text-gray-50">
            Desa Tatung,Kec.Balong,Kab.Ponorogo
          </p>
        </div>
        <div className="flex justify-center items-center h-full">
          <img src={fa2} alt="Logo" className="max-w-56 max-h-full" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border-b border-gray-300 py-2">
            <i className="fas fa-user text-gray-100 mr-3"></i>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none bg-transparent border-none w-full text-gray-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <i className="fas fa-lock text-gray-100 mr-3"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none bg-transparent border-none w-full text-gray-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
          {authState.error && (
            <div className="text-center text-red-500">
              {authState.error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
