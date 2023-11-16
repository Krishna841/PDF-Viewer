import { useState, useRef } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

import ProtectedView from "./protected";
import "./home.scss";

const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const [upload, setUpload] = useState(false);

  const fileType = ["application/pdf"];
  const inputRef = useRef(null);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { CurrentPageLabel } = pageNavigationPluginInstance;

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPdfFile(e.target.result);
          setUpload(true);
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

  document.addEventListener("keydown", function (event) {
    console.log(event);
    if (event.ctrlKey && (event.key === "s" || event.key === "p")) {
      alert("Save or Print detected! Please avoid this.");
    }
    event.preventDefault();
  });

  return (
    <div
      className="home"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div className="home_title">PDF Viewer</div>
      <form onSubmit={handleSubmit} className="home_upload">
        <input
          type="file"
          className="home_upload_input"
          onChange={handleChange}
          ref={inputRef}
        />
        <button
          onClick={() => {
            inputRef.current.click();
          }}
          className="home_upload_btn"
        >
          Upload file
        </button>
        <button type="submit" className="view_btn">
          View PDF
        </button>
      </form>

      {upload && (
        <div className="home_upload_status">File uploaded successfully</div>
      )}

      <div
        className="home_viewer"
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {viewPdf && (
            <>
              <div className="home_viewer_pagelabel">
                <CurrentPageLabel>
                  {(props) => (
                    <>
                      {`Page ${props.currentPage + 1} ${
                        props.pageLabel === `${props.currentPage + 1}`
                          ? ""
                          : `${props.pageLabel}`
                      } of ${props.numberOfPages}`}
                    </>
                  )}
                </CurrentPageLabel>
              </div>
              <Viewer
                fileUrl={viewPdf}
                plugins={[pageNavigationPluginInstance]}
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
