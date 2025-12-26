import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";


import { toast } from "react-toastify";

const Solution = () => {
  const { problemId } = useParams(); 
  const [explanation, setExplanation] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
  document.body.style.backgroundColor = "#000000";
}, []);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/tutor/tutorial/${problemId}`,{
            headers: { Authorization: `Bearer ${token}`}
          }
        );
        setExplanation(response.data.explanation);
      } catch (error) {
        toast.error("Error while loading problem")
        console.error("Error fetching problem", error);
      }
    };
    fetchProblem();
  }, [problemId,token]);

  if (!explanation) {
    return (
      <div className="text-center text-[#EAD7C3] mt-10 text-lg">
        Loading problem details...
      </div>
    );
  }

 return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#000000",
      color: "#EAD7C3",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
    }}
  >
    <h1 className="text-3xl font-bold mb-4"></h1>

    <div className="w-[80%] bg-[#2C1E1E] p-6 rounded-2xl mb-6 shadow-lg border border-[#A67856]">
      <h2 className="text-2xl font-semibold mb-3 text-[#D1B38B]">Explanation</h2>
      <p className="text-[#C9B39E] leading-relaxed whitespace-pre-line">
        {explanation}
      </p>
    </div>
  </div>
);
};

export default Solution;
