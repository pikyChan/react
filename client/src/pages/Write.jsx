import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [imgUrl, setImgUrl] = useState(state?.img || "");

  const navigate = useNavigate();

  const upload = async () => {
    if (!file) return ""; // If no file, return an empty string
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
        credentials: 'include', // Ensure this is set to include credentials if necessary
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await res.json();
      return data.filename; // Return the uploaded image filename
    } catch (err) {
      console.error("Upload error:", err);
      throw err; // Rethrow error to handle it later in handleClick
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const uploadedImgUrl = await upload(); // Upload image and get URL

    try {
      const url = state ? `/posts/${state.id}` : `/posts/`;
      const method = state ? "PUT" : "POST";
      const postData = {
        title,
        desc: value,
        cat,
        img: uploadedImgUrl, // Set image URL in post data
        ...(state ? {} : { date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") }),
      };

      const response = await fetch(`http://localhost:3000/api/post`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to publish post:", error);
        return;
      }

      navigate("/"); // Navigate after successful post
    } catch (err) {
      console.log("Error occurred:", err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      {imgUrl && (
        <div className="image-preview">
          <img src={imgUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
        </div>
      )}
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {["art", "science", "technology", "cinema", "design", "food"].map((category) => (
            <div className="cat" key={category}>
              <input
                type="radio"
                checked={cat === category}
                name="cat"
                value={category}
                id={category}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
