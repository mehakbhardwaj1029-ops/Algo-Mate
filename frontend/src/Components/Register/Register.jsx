import React, { useState } from "react";
import axios from "axios"; 
import { toast } from "react-toastify";  
import { Link } from "react-router-dom"; 




const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
       await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/register`,formData);
       toast.success("Registration Successfull")
    }catch(error){
      toast.error("error in registering form")
    }
  };

  return (
   <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white">

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[90%] max-w-md border border-white/10
                   transform hover:scale-105 hover:shadow-[0_0_25px_rgba(217,133,42,0.6)] transition-all duration-150 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg bg-neutral-800 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#d97706]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg bg-neutral-800 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#d97706]"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg bg-neutral-800 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#d97706]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg bg-neutral-800 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#d97706]"
        />

        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-[#d97706] hover:bg-[#f59e0b] rounded-lg text-white font-semibold transition"
        >
          Register
        </button>

        <p className="text-center text-gray-400 mt-2">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-[#d97706] hover:text-[#f59e0b] transition-colors"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
