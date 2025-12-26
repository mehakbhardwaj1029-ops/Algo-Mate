import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import axios from "axios";
import { toast } from "react-toastify";

//Never delay editor creation — always initialize it.
// Update content after fetching using editor.commands.setContent().

const NotesEditor = () => {
  const { publicId } = useParams();
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  // 1️⃣ Initialize editor immediately with empty content
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write your notes or code snippets here..." }),
    ],
    content: "", // initially empty
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/problem/notes/${publicId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (editor) {
          editor.commands.setContent(response.data); // update editor content
          setContent(response.data); // update state
        }
      } catch (error) {
        toast.error("Could not load Notes");
      }
    };
    fetchNotes();
  }, [publicId, token, editor]); // include editor in deps

  const handleSave = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/problem/update/${publicId}`,
        { tutorial: content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Notes updated Successfully");
    } catch (error) {
      toast.error("Failed to update Notes");
    }
  };

  if (!editor) return <p>Loading editor...</p>;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white py-10 px-4">
      
      <div className="w-full max-w-5xl bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 flex flex-col gap-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-white" onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
          <button className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-white" onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
          <button className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-white" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
          <button className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-white" onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
          <button className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-white" onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
          <button className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-white" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code</button>
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="bg-white/10 p-4 rounded-xl border border-white/20 text-white min-h-[300px] focus:outline-none"
        />

        {/* Save Button */}
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

export default NotesEditor;
