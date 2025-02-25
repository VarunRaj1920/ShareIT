import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dynamically load CodeEditor so it only runs on the client side.
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export default function CodePage() {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState("");
  const [uniqueId, setUniqueId] = useState(id || "");

  // When the route changes (or initially loads), fetch the saved code
  useEffect(() => {
    if (id) {
      setUniqueId(id);
      fetch(`/api/getCode?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setContent(data.content || "");
        })
        .catch((err) => {
          console.error("Error fetching code:", err);
          setContent("");
        });
    }
  }, [id]);

  // Function to save the code by sending it to the backend
  const saveCode = async () => {
    if (!uniqueId.trim()) {
      alert("Unique ID is required!");
      return;
    }
    const response = await fetch("/api/saveCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: uniqueId, content }),
    });
    if (response.ok) {
      alert("Code saved!");
    } else {
      alert("Error saving code");
    }
  };

  return (
    <div className="p-5 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-5 rounded shadow">
        <h2 className="text-3xl font-bold text-center mb-4">Krack Code Editor</h2>
        
        {/* Unique ID input field */}
        <div className="mb-4">
          <label htmlFor="uniqueId" className="block text-gray-700 mb-1">
            Unique ID:
          </label>
          <input
            id="uniqueId"
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            placeholder="Enter Unique ID"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {/* Code Editor Container */}
        <div className="border rounded h-96 overflow-hidden mb-4">
          <CodeEditor id={uniqueId} initialContent={content} onChange={setContent} />
        </div>
        
        {/* Save Button */}
        <button
          onClick={saveCode}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow transition-all"
        >
          Save Code
        </button>
      </div>
    </div>
  );
}
