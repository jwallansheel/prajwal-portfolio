import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import pdfFile from "../pages/Prajjwal_VernekarNew.pdf"; // Adjust the path to your PDF file

function ResumeViewer() {
  // Email for the "Get in Touch" button
  const email = "prajwalbutcorporate@gmail.com";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">PDF Viewer</h1>

      {/* PDF Viewer */}
      <div className="w-full max-w-2xl mb-4 shadow-lg">
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={pdfFile} />
        </Worker>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        {/* Download Button */}
        <a
          href={pdfFile}
          download
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Download PDF
        </a>

        {/* Get in Touch Button */}
        <a
          href={`mailto:${email}`}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}

export default ResumeViewer;
