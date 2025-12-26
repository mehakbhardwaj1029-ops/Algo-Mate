import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Tutorials = () => {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProblemName, setNewProblemName] = useState("");
  const [newExplanation, setNewExplanation] = useState("");
  const [newCodeSnippet, setNewCodeSnippet] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/tutor/tutorial/all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProblems(response.data);
      } catch (error) {
        toast.error("Could not fetch problems!!!");
      }
    };
    fetchProblems();
  }, [token]);

  const handleAddProblem = async () => {
    try {
      if (!newProblemName) {
        toast.error("Please fill the required fields!!");
        return;
      }

      const newTutorial = {
        problemName: newProblemName,
        explanation: newExplanation,
        codeSnippet: newCodeSnippet,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/tutor/tutorial/add`,
        newTutorial,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Tutorial added successfully");
      setProblems([...problems, response.data]);
      setNewProblemName("");
      setNewExplanation("");
      setNewCodeSnippet("");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleExplainationSave = (problemId) => {
    navigate(`/tutorial/${problemId}?type=solution`);
  };

  const handleCodeSave = (problemId) => {
    navigate(`/tutorial/${problemId}?type=code`);
  };

  const handleDeleteTutorial = async (problemId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/tutor/tutorial/delete/${problemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Tutorial deleted");
      setProblems(problems.filter((p) => p.problemId !== problemId));
    } catch (error) {
      toast.error("Error in deleting problem");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white py-10 px-4">
      <ToastContainer />

      {/* Add Tutorial Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed top-16 right-6 bg-gray-900 hover:bg-gray-700 text-[#d9852a] px-6 py-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-150 z-50"
          title="Add Tutorial"
        >
          <FaPlus />
        </button>
      )}

      {/* Add Tutorial Full-Screen Form */}
      {showForm && (
         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex">
         <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
         className="flex flex-col w-full h-full bg-black/90 text-white p-8 border-t border-white/10 overflow-auto"
        >

            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-white font-playfair">Add Tutorial</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-red-500 hover:text-red-400 font-semibold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col flex-grow gap-6">
              <input
                type="text"
                placeholder="Problem Name"
                value={newProblemName}
                onChange={(e) => setNewProblemName(e.target.value)}
                className="w-full p-4 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b4a21] transition"
              />
              <textarea
                placeholder="Explanation"
                value={newExplanation}
                onChange={(e) => setNewExplanation(e.target.value)}
                rows={6}
                className="w-full flex-grow p-4 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b4a21] transition resize-none"
              />
              <textarea
                placeholder="Code Snippet"
                value={newCodeSnippet}
                onChange={(e) => setNewCodeSnippet(e.target.value)}
                rows={8}
                className="w-full flex-grow p-4 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 font-mono focus:outline-none focus:ring-2 focus:ring-[#7b4a21] transition resize-none"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={handleAddProblem}
                className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold transition"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-8 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tutorials List */}
      <div className="w-full max-w-5xl flex flex-col gap-4 mt-6">
        {problems.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-md border border-[#7b4a21]/30 flex flex-col sm:flex-row sm:items-center justify-between transform transition-all duration-150 hover:bg-[#111] hover:shadow-[0_8px_30px_rgba(123,74,33,0.18)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
              <strong className="text-lg font-bold font-playfair text-white group-hover:text-[#7b4a21] transition-colors duration-150">
                {t.problemName}
              </strong>
              <button
                onClick={() => handleExplainationSave(t.problemId)}
                className="cursor-pointer text-[#3b82f6] hover:underline"
              >
                Solution
              </button>
              <button
                onClick={() => handleCodeSave(t.problemId)}
                className="cursor-pointer text-[#22c55e] hover:underline"
              >
                Code
              </button>
            </div>

            <div className="flex flex-col items-end gap-1 mt-2 sm:mt-0">
              <FaTrash
                className="cursor-pointer text-[#dc3545] hover:text-[#f87171] transition-colors"
                onClick={() => handleDeleteTutorial(t.problemId)}
                title="Delete Tutorial"
              />
              <span className="text-sm text-gray-400 mt-1">
                Uploaded at: {new Date(t.uploadedAt).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
