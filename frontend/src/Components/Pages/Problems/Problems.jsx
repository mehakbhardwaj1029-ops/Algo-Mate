import React from 'react'
import Topic from '../Topic/Topic'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";



const Problems = () => {
  const navigate = useNavigate();
    const topics = [
        "Arrays",
        "Sliding Window",
        "2 Pointer",
        "Kadane's Algorithm",
        "Strings",
        "Stacks",
        "Queues",
        "HashMap",
        "Linked List",   
        "Intervals",
        "Matrix",
        "Backtracking",
        "Divide and Conquer",
        "Bit Manipulation",
        "Math",
        "Heap",
        "Trees",
        "Graphs",
        "Dynamic Programming",
                
    ];

    const handleTopic = (topicName)=>{
        navigate(`/problems/${topicName}`);
    };


    

 return (
   <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white py-10">
 <div className="w-full flex flex-wrap gap-4 px-16 justify-center">
    {topics.map((t, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="group bg-white/5 backdrop-blur-md w-40 h-40 flex items-center justify-center rounded-2xl shadow-lg border border-white/10
                   cursor-pointer transform hover:scale-105 hover:shadow-[0_0_25px_rgba(217,133,42,0.6)]
                   transition-all duration-150"
        onClick={() => handleTopic(t)}
      >
        <span className="text-white font-inter font-semibold group-hover:text-[#d97706] text-center">
          {t}
        </span>
      </motion.div>
    ))}
  </div>
</div>

    
  );
};

export default Problems;