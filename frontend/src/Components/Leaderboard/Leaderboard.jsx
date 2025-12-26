import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/rating/summary/all`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard:", error);
        toast.error("Failed to load leaderboard");
      });
  }, []);

  const handleTutorClick = (username) => {
    navigate(`/tutor/${username}/problems`);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center py-8">
      <h1 className="text-3xl font-semibold mb-8 text-[#EAD7C3]">
        
      </h1>

      {/* Leaderboard list */}
      <div className="w-[95%] max-w-5xl space-y-4">
        {users.length === 0 ? (
          <p className="text-[#C9B39E] text-center">No tutors found.</p>
        ) : (
          users.map((user, index) => (
            <div
              key={user.tutorId}
              onClick={() => handleTutorClick(user.tutorUsername)}
              className="flex items-center justify-between bg-[#2C1E1E] rounded-2xl p-4 border border-[#A67856] shadow-lg hover:bg-[#3B2A2A] transition duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4 w-1/3">
                {index === 0 && (
                  <span className="text-yellow-400 text-lg font-bold">🏆</span>
                )}
                {index === 1 && (
                  <span className="text-gray-300 text-lg font-bold">🥈</span>
                )}
                {index === 2 && (
                  <span className="text-amber-700 text-lg font-bold">🥉</span>
                )}
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.tutorUsername}`}
                  alt="avatar"
                  className="w-12 h-12 rounded-full border border-[#C9B39E]"
                />
                <div>
                  <h2 className="font-semibold text-[#EAD7C3]">
                    {user.tutorUsername}
                  </h2>
                </div>
              </div>

              {/* Middle section (spacer) */}
              <div className="w-1/3"></div>

              {/* Right section - Rating + Rank */}
              <div className="flex flex-col items-end w-1/3">
                <p className="text-[#D1B38B] text-sm font-medium flex items-center gap-1">
                  {user.averageRatings.toFixed(1)} ⭐
                </p>
                <p className="text-[#C0C0C0] text-sm font-semibold mt-1">
                  Rank #{index + 1}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
