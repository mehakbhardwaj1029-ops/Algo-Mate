import React from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaChalkboardTeacher, FaTrophy } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-5xl font-bold mb-4 text-[#d97706]">
          Track • Teach • Compete
        </h1>
        <p className="text-white text-lg mb-8">
          A structured platform to store your coding problems, tutor other learners,
          and climb the leaderboard to earn recognition.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            to="/problems"
            className="bg-[#d97706] hover:bg-[#b85f04] text-black font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Start Solving
          </Link>
          <Link
            to="/leaderboard"
            className="border border-[#d97706] text-[#d97706] hover:bg-[#d97706] hover:text-black font-semibold px-6 py-3 rounded-lg transition-all"
          >
            View Leaderboard
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="border border-[#d97706]/40 p-6 rounded-2xl shadow-md hover:bg-[#111] transition">
          <FaBookOpen className="text-[#d97706] text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-[#d97706]">Organize Problems</h3>
          <p className="text-white text-sm">
            Save coding problems, categorize them, and track your progress effortlessly.
          </p>
        </div>

        <div className="border border-[#d97706]/40 p-6 rounded-2xl shadow-md hover:bg-[#111] transition">
          <FaChalkboardTeacher className="text-[#d97706] text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-[#d97706]">Tutor Others</h3>
          <p className="text-white text-sm">
            Share your solutions and explain complex problems to help others learn and grow.
          </p>
        </div>

        <div className="border border-[#d97706]/40 p-6 rounded-2xl shadow-md hover:bg-[#111] transition">
          <FaTrophy className="text-[#d97706] text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-[#d97706]">Earn Recognition</h3>
          <p className="text-white text-sm">
            Get ranked on the leaderboard and earn rewards for teaching and solving problems.
          </p>
        </div>
      </div>

      {/* Community Section */}
      <div className="mt-16 text-center max-w-2xl">
        <p className="text-[#d97706] italic">
          “Every problem you solve brings you closer to mastery — every problem you teach makes you a leader.”
        </p>
      </div>
    </div>
  );
};

export default Home;
