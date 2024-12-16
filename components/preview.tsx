"use client";

import React from "react";


interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div className="ql-container ql-snow">
      <div
        className="ql-editor preview-container"
        dangerouslySetInnerHTML={{ __html: content }} // Render raw HTML content
      />
    </div>
  );
};

export default Preview;
