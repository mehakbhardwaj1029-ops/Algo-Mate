import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy } from "react-icons/fi";

const CodeDetails = () => {
  const { problemId } = useParams();
  const [code, setCode] = useState(""); 
  const [copied, setCopied] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    const root = document.getElementById("root");
    if (root) root.style.backgroundColor = "#000000";

    return () => {
      document.body.style.backgroundColor = null;
      if (root) root.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/tutor/tutorial/${problemId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCode(response.data.code || ""); 
      } catch (error) {
        toast.error("Error while loading problem");
        console.error("Error fetching problem", error);
      }
    };
    fetchProblem();
  }, [problemId, token]);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy code: ", err);
    });
  };

  if (!code) {
    return (
      <div className="text-center text-[#EAD7C3] mt-10 text-lg">
        Loading ...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#EAD7C3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div style={{ width: "80%", position: "relative" }}>
        <button
          onClick={handleCopy}
          style={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            background: "none",
            border: "none",
            color: "#C9B39E",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.9rem",
          }}
        >
          <FiCopy />
          {copied ? "Copied!" : "Copy"}
        </button>

        <SyntaxHighlighter
          language="java"
          style={oneDark}
          showLineNumbers
          wrapLines
          customStyle={{
            borderRadius: "12px",
            padding: "1rem",
            backgroundColor: "#1E1E1E",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeDetails;
