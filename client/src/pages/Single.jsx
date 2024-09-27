import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/post/${postId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.log(err);  // Log the error message for debugging
      }
    };
    
    fetchData();
  }, [postId]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
      <img src={`http://localhost:3000/Uploads/${post.img}`} alt='' />
        <div className="user">
          {post.userImg && (
            <img src={post.userImg} alt="" />
          )}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
        </div>
        <h1>{post.title || "No Title"}</h1> {/* Fallback title */}
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description || "No description available."),
          }}
        ></p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
