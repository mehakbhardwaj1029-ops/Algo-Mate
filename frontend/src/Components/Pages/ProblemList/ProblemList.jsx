import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash,FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
 

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newReference, setNewReference] = useState("");
  const [newLink, setNewLink] = useState("");
  const [editingProblem, setEditingProblem] = useState("");

  const token = localStorage.getItem("token");
  const { topicName } = useParams();

  //get all problems
  useEffect(()=>{
    const fetchProblems = async ()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/problem/by-topic?topic=${topicName}`,
          {headers:{Authorization: `Bearer ${token}`}}
        );
        setProblems(response.data);
      }
      catch(error){
        toast.error("Failed to load problems");
      }
    };
    fetchProblems();
  },[topicName,token]);
//add problem
  const handleSaveProblem = async () => {
    if (!newName || !newReference || !newLink) {
      toast.error("Please fill required fields");
      return;
    }
   const newProblem = {
     problemName: newName,
     leetcodeLink: newLink,
     referenceLink: newReference,
     topic: topicName
   };


     try{
       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/problem/add`,
        newProblem,
        {
          headers:{Authorization: `Bearer ${token}`}
        }
       );
       toast.success("Problem Added");
       setProblems([...problems,response.data]);
       setNewName("")
       setNewReference("")
       setNewLink("")
       setShowForm(false);
     }catch(error){
      toast.error("Failed to add problem");
     }
    
  };

  const handleEdit = (problem)=>{
    setEditingProblem(problem);
    setShowForm(true);
    setNewName(problem.problemName);
    setNewReference(problem.setNewReference);
    setNewLink(problem.setNewLink);
  }
//update problem
  const handleUpdateProblem = async()=>{
    if(!editingProblem) return;

    const updatedData = {
      problemName:newName,
      leetcodeLink:newLink,
      referenceLink:newReference

    };

    try{
       const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/problem/update/${editingProblem.publicId}`,updatedData,
        { headers: {Authorization: `Bearer ${token}`}}
       );
       toast.success("Problem updated");
       setProblems( problems.map((p)=>(p.publicId===editingProblem.publicId ? response.data:p)));

       setEditingProblem(null);
       setShowForm(false);
       setNewName("");
       setNewLink("");
       setNewReference("");
    }catch(error){
      toast.error("Could not update problem details")
    }
  }

  //delete problem
  const handleDelete = async (publicId)=>{

    try{
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/problem/delete/${publicId}`,
        { headers: {Authorization: `Bearer ${token}`}}
      );
      toast.success("Problem deleted");
      setProblems(problems.filter((p) => p.publicId !=publicId));
    }catch(error){
      toast.error("Failed to delete Problem")
    }
  }
  const navigate = useNavigate();
  const handleNotesClick = (problem) => {
    navigate(`/notes/${problem.publicId}`)
  };


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white py-10 px-4">
      
      {/* Problems list */}
      <div className="w-full max-w-3xl flex flex-col gap-4">
        {problems.map((p, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
           className="group bg-white/5 hover:bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10
           flex flex-col sm:flex-row sm:items-center justify-between
           transition-colors duration-200 ease-in-out"

          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <strong className="text-lg font-bold font-playfair group-hover:text-[#d97706]">
                {p.problemName}
              </strong>
              <span
                className="cursor-pointer text-[#3b82f6] hover:underline"
                onClick={() => window.open(p.referenceLink, "_blank")}
              >
                Reference
              </span>
              <span
                className="cursor-pointer text-[#22c55e] hover:underline"
                onClick={() => window.open(p.leetcodeLink, "_blank")}
              >
                Problem
              </span>
              <span
                className="cursor-pointer text-[#f97316] hover:underline"
                onClick={() => handleNotesClick(p)}
              >
                Notes
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <FaEdit
                className="cursor-pointer text-[#3b82f6] hover:text-[#d97706] transition-colors"
                onClick={() => handleEdit(p)}
                title="Edit Problem"
              />
              <FaTrash
                className="cursor-pointer text-[#dc3545] hover:text-[#f87171] transition-colors"
                onClick={() => handleDelete(p.publicId)}
                title="Delete Problem"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Problem Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed top-16 right-6 bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-full shadow-lg
               hover:scale-110 transition-transform duration-150 z-50"
        >
          Add Problem
        </button>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/10
                       transform hover:scale-105 hover:shadow-[0_0_25px_rgba(217,133,42,0.6)] transition-all duration-150"
          >
            <h3 className="text-2xl font-bold mb-5 font-playfair text-white group-hover:text-[#d97706]">
              {editingProblem ? "Edit Problem" : "Add New Problem"}
            </h3>
            <input
              type="text"
              placeholder="Problem Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d97706] transition"
            />
            <input
              type="text"
              placeholder="Problem Link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d97706] transition"
            />
            <input
              type="text"
              placeholder="Reference Link"
              value={newReference}
              onChange={(e) => setNewReference(e.target.value)}
              className="w-full p-3 mb-6 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d97706] transition"
            />
            <div className="flex gap-4">
              <button
                onClick={editingProblem ? handleUpdateProblem : handleSaveProblem}
                className={`flex-1 py-3 rounded-lg text-white font-semibold transition 
                            ${editingProblem ? "bg-yellow-600 hover:bg-yellow-500" : "bg-green-600 hover:bg-green-500"}`}
              >
                {editingProblem ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingProblem(null);
                  setNewName("");
                  setNewLink("");
                  setNewReference("");
                }}
                className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProblemList;
