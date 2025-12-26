import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

const Navbar = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");


    navigate("/login")
  };



  
  return (
    <div className="w-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white">
      <nav className="w-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg px-6 py-4 flex items-center">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-bold mr-6"
        >
          <span className="text-white">Algo</span>
          <span className="text-[#d97706]">Mate</span>
        </NavLink>

        <ul className="flex list-none gap-6 ml-auto">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `transition-colors duration-150 ${isActive ? "text-[#d97706]" : "text-white"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tutorial"
              className={({ isActive }) =>
                `transition-colors duration-150 ${isActive ? "text-[#d97706]" : "text-white"}`
              }
            >
              Tutorial
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/problems"
              className={({ isActive }) =>
                `transition-colors duration-150 ${isActive ? "text-[#d97706]" : "text-white"}`
              }
            >
              Problems
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/allTutorials"
              className={({ isActive }) =>
                `transition-colors duration-150 ${isActive ? "text-[#d97706]" : "text-white"}`
              }
            >
              Learn
            </NavLink>
          </li>

          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="transition-colors duration-150 text-white hover:text-[#d97706]"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `transition-colors duration-150 ${isActive ? "text-[#d97706]" : "text-white"}`
                }
              >
                Login
              </NavLink>
            )}
          </li>

          <li>
            <NavLink
              to="/leaderboard"
              title="Leaderboard"
              className={({ isActive }) =>
                `transition-colors duration-150 flex items-center gap-2 ${isActive ? "text-[#d97706]" : "text-white"}`
              }
            >
              <FaTrophy className="text-current text-lg" />
              <span className="hidden sm:inline"></span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
