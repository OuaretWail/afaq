"use client";

import React, { useEffect, useRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill();
  const isInitializing = useRef(true); // Track whether we are initializing

  useEffect(() => {
    if (quill) {
      // Initialize only once with the value
      if (isInitializing.current) {
        quill.clipboard.dangerouslyPasteHTML(value);
        isInitializing.current = false;
      }

      // Set up text-change listener
      const handleChange = () => {
        onChange(quill.root.innerHTML);
      };
      quill.on("text-change", handleChange);

      // Cleanup listener on unmount
      return () => {
        quill.off("text-change", handleChange);
      };
    }
  }, [quill, onChange]);

  return <div ref={quillRef} />;
};

export default Editor;
