import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Dynamically import CodeEditor so it only runs on the client.
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export default function CodePage() {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (id) {
      setUniqueId(id);
      fetch(`/api/getCode?id=${id}`)
        .then((res) => res.json())
        .then((data) => setContent(data.content || ""))
        .catch((err) => {
          console.error("Error fetching code:", err);
          setContent("");
        });
    }
  }, [router.isReady, id]);

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

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
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      alert("Error saving code");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="container">
        <h1 className="text-3xl font-bold text-center mb-4">Krack Code Editor</h1>
        
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
        <button onClick={saveCode} className="save-button">
          Save Code
        </button>
      </div>
      
      {/* Toast Popup */}
      <div className={`toast ${showToast ? "show" : ""}`}>
        Code saved successfully!
      </div>
    </div>
  );
}
