import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/post${cat}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Check the structure of the data
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`http://localhost:3000/Uploads/${post.img}`} alt={post.title} />
            </div>
            <div className="content">
              <Link className="links" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.description)}</p>
              <Link to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
