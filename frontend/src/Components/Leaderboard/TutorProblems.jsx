import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import RatingPage from "../Leaderboard/RatingPage"; 

const TutorProblems = () => {
  const { username } = useParams();
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/v1/tutor/tutorial/${username}/tutorials`
      )
      .then((res) => setProblems(res.data))
      .catch((err) => console.error("Error fetching tutor problems:", err));
  }, [username]);

  const handleRatingClick = (problem) => {
    setSelectedProblem(problem);
  };

  const closeModal = () => {
    setSelectedProblem(null);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAD7C3] p-8">
      <h1 className="text-3xl font-semibold mb-8 text-[#EAD7C3]">
        <span className="text-[#D1B38B]">{username}</span>
      </h1>

      {problems.length === 0 ? (
        <p className="text-[#C9B39E]">No problems found for this tutor.</p>
      ) : (
        <ul className="space-y-4">
          {problems.map((p) => (
            <li
              key={p.problemId}
              className="flex justify-between items-center bg-[#2C1E1E] border border-[#A67856] rounded-2xl p-5 shadow-lg hover:bg-[#3B2A2A] transition duration-300"
            >
              <div>
                <h2 className="font-semibold text-xl text-[#EAD7C3]">
                  {p.problemName}
                </h2>
              </div>

              <div className="flex space-x-8">
                <Link
                  to={`/solution/${p.problemId}`}
                  className="text-[#D1B38B] hover:text-[#EAD7C3] font-medium transition duration-200"
                >
                  Solution
                </Link>
                <button
                  onClick={() => handleRatingClick(p)}
                  className="text-[#A67856] hover:text-[#EAD7C3] font-medium transition duration-200"
                >
                  Rating
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedProblem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#2C1E1E] border border-[#A67856] rounded-2xl shadow-lg w-[90%] max-w-[600px] p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-[#D1B38B] hover:text-[#EAD7C3] text-xl"
            >
              ✖
            </button>

            <RatingPage problemId={selectedProblem.problemId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProblems;
