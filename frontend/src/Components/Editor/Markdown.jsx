import React, { useEffect, useRef, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import "./Markdown.css";

const Markdown = () => {
  const { problemId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const [value, setValue] = useState("");
  const token = localStorage.getItem("token");

  // useRef to track mount status
  const isMounted = useRef(true);

useEffect(() => {
  isMounted.current = true;
  const controller = new AbortController(); 

  const fetchTutorial = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/tutor/tutorial/${problemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal, // 👈 attach signal
        }
      );
      if (!isMounted.current) return;

      if (type === "solution") {
        setValue(response.data.explanation);
      } else if (type === "code") {
        setValue(response.data.codeSnippet);
      }
    } catch (error) {
      if (axios.isCancel(error)) return; 
      if (isMounted.current) toast.error("Failed to load content");
    }
  };

  fetchTutorial();

  return () => {
    isMounted.current = false;
    controller.abort(); 
  };
}, [problemId, type, token]);


  const handleSave = async () => {
    try {
      const payload =
        type === "code" ? { codeSnippet: value } : { explanation: value };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/tutor/tutorial/update/${problemId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      
      if (isMounted.current) toast.success("saved successfully!");
    } catch (error) {
      if (isMounted.current) toast.error("Failed to save explanation");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white py-10 px-4">
      <div className="w-full max-w-5xl bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 flex flex-col gap-4">
        <SimpleMDE
          value={value}
          onChange={setValue}
          options={{
            spellChecker: false,
            autofocus: true,
            placeholder: "Write your notes or code snippets here...",
            status: false,
          }}
        />

        <button
          onClick={handleSave}
          className="self-start mt-4 px-6 py-2 bg-[#d97706] hover:bg-[#f59e0b] rounded-lg text-white font-semibold transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Markdown;
