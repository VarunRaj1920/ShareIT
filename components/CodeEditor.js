import { useEffect, useRef } from "react";
import io from "socket.io-client";

let socket;

export default function CodeEditor({ id, initialContent, onChange }) {
  const editorRef = useRef(null);
  const cmInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !cmInstanceRef.current) {
      const initializeCodeMirror = async () => {
        const CodeMirrorModule = await import("codemirror");
        // Dynamically import the JavaScript mode.
        await import("codemirror/mode/javascript/javascript");
        const CodeMirror = CodeMirrorModule.default;

        cmInstanceRef.current = CodeMirror(editorRef.current, {
          value: initialContent || "",
          mode: "javascript",
          theme: "dracula", // Use the dark Dracula theme
          lineNumbers: true,
        });

        // Setup Socket.io connection.
        socket = io({ path: "/api/socket" });

        // When the editor content changes, notify parent and emit via socket.
        cmInstanceRef.current.on("change", (cm) => {
          const content = cm.getValue();
          if (onChange) onChange(content);
          socket.emit("updateCode", { id, content });
        });

        // Listen for incoming updates.
        socket.on(`codeUpdate-${id}`, (newContent) => {
          if (cmInstanceRef.current && cmInstanceRef.current.getValue() !== newContent) {
            cmInstanceRef.current.setValue(newContent);
            if (onChange) onChange(newContent);
          }
        });
      };
      initializeCodeMirror();
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [id, onChange, initialContent]);

  // Sync CodeMirror if initialContent prop changes.
  useEffect(() => {
    if (cmInstanceRef.current && cmInstanceRef.current.getValue() !== initialContent) {
      cmInstanceRef.current.setValue(initialContent || "");
    }
  }, [initialContent]);

  return <div ref={editorRef} style={{ height: "100%" }} />;
}
