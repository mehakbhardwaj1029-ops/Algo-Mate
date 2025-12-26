import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(import.meta.env.VITE_API_URL);
    try{
      console.log()
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/login`,credentials,
      {
        withCredentials: true,
        headers: {
          'Content-Type':'application/json'
        }
      }
    );

    const token = response.data.token;

    localStorage.setItem("token",token);
    window.dispatchEvent(new Event("authChanged"));
    toast.success('Login Successfull');
    navigate('/');
    } 

    catch(error){
      toast.error("Invalid email or password");
    }
  };

  return (
<div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[90%] max-w-md border border-white/10
                   transform hover:scale-105 hover:shadow-[0_0_25px_rgba(217,133,42,0.6)] transition-all duration-150 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={credentials.email}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg bg-neutral-800 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#d97706]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg bg-neutral-800 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#d97706]"
        />

        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-[#d97706] hover:bg-[#f59e0b] rounded-lg text-white font-semibold transition"
        >
          Login
        </button>

        <p className="text-center text-gray-400 mt-2">
          Not registered?{" "}
          <Link
            to="/register"
            className="text-[#d97706] hover:text-[#f59e0b] transition-colors"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
