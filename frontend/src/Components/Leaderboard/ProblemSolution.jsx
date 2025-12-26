import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProblemSolution = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/tutor/tutorial/${problemId}`)
      .then((res) => {
        setProblem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching problem solution:", err);
        setLoading(false);
      });
  }, [problemId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E293B] text-white flex items-center justify-center text-lg">
        Loading solution...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#1E293B] text-white flex items-center justify-center text-lg">
        Problem not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E293B] text-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-[#FACC15]">
        {problem.problemName}
      </h1>
      <div className="bg-[#0F172A] p-6 rounded-2xl shadow-lg border border-[#FACC15]/30">
        <h2 className="text-2xl font-semibold mb-3 text-[#FACC15]">Explanation</h2>
        <p className="text-gray-300 whitespace-pre-line leading-relaxed">
          {problem.explanation}
        </p>
      </div>
    </div>
  );
};

export default ProblemSolution;
