import { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import ProtectedView from "./protected";
import "./home.scss";

const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);

  const fileType = ["application/pdf"];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPdfFile(e.target.result);
        };
      } else {
        setPdfFile(null);
      }
    } else {
      console.log("select your file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  return (
    <div
      className="home"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div className="home_title">PDF Viewer</div>
      <div className="home_upload">
        <form onSubmit={handleSubmit}>
          <input type="file" className="file" onChange={handleChange} />
          <button type="submit" className="btn btn-success">
            View PDF
          </button>
        </form>
      </div>

      <div
        className="home_viewer"
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {viewPdf && (
            <>
              <Viewer
                fileUrl={viewPdf}
                renderProtectedView={(renderProps) => (
                  <ProtectedView {...renderProps} />
                )}
              />
            </>
          )}
          {!viewPdf && <></>}
        </Worker>
      </div>
    </div>
  );
};

export default Home;
