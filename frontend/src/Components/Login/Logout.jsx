import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("authChanged", handleAuthChange);
    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      // Logout logic
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("authChanged"));
      toast.success("Logged out successfully!"); 
      navigate("/login");
    } else {
      
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-3 py-1 rounded text-sm border border-white/20 hover:bg-white/5 transition text-white"
      aria-label={isLoggedIn ? "Logout" : "Login"}
    >
      {isLoggedIn ? ".in" : ".out"} 
    </button>
  );
};

export default Logout;
