import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";

function Files() {
  const { classId } = useParams();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:3000/api/files/${classId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [classId]);

  return (
    <div className="files-container">
      <h1>Files</h1>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <a
              href={file.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Files;
