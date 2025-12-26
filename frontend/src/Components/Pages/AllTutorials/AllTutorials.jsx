import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllTutorials = () => {
  const [problems, setProblems] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/tutor/tutorial/all/tutorials`
        );
        setProblems(response.data);
      } catch (error) {
        toast.error("Could'nt fetch problems");
      }
    };
    fetchProblems();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center py-8">
      <h1 className="text-3xl font-semibold mb-6 text-[#EAD7C3]">
      </h1>

      <div className="w-[95%] space-y-5">
        {problems.map((p) => (
          <div
            key={p.problemId}
            className="flex items-start justify-between bg-[#2C1E1E] rounded-2xl shadow-lg p-2 border border-[#A67856] hover:bg-[#3B2A2A] transition duration-200"
          >
            {/* Left section - Tutor info */}
            <div className="flex items-center gap-4 w-1/5">
              <img
                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${p.tutorUsername}`}
                alt="profile"
                className="w-12 h-12 rounded-full border border-[#C9B39E]"
              />
              <div>
                <h2 className="font-semibold text-[#EAD7C3]">
                  {p.tutorUsername}
                </h2>
                <p className="text-xs text-[#C9B39E]">Tutor</p>
              </div>
            </div>

            {/* Middle section - Problem details (centered name) */}
            <div className="flex flex-col items-center justify-center w-3/5">
              <a
                href="#"
                className="text-lg font-semibold text-[#D1B38B] hover:text-[#F4E3C1] hover:underline text-center"
              >
                {p.problemName}
              </a>
            </div>

            {/* Right section - Code & Explanation + Upload time */}
            <div className="flex flex-col items-end w-1/5">
              <div className="text-sm text-[#C9B39E]">
                <span
                  onClick={() => navigate(`/solution/${p.problemId}`)}
                  className="hover:text-[#D1B38B] underline cursor-pointer"
                >
                  Explanation
                </span>
                {" | "}
                <span
                  onClick={() => navigate(`/code/${p.problemId}`)}
                  className="hover:text-[#D1B38B] underline cursor-pointer"
                >
                  Code Snippet
                </span>
              </div>
              <p className="text-xs text-[#BFA688] mt-2">
                Uploaded at: {new Date(p.uploadedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTutorials;
