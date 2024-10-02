import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/post/?cat=${cat}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
    <h1>Other posts you may like</h1>
    {posts.map((post) => (
      <div className="post" key={post.id}>
         <img src={`http://localhost:3000/Uploads/${post.img}`} alt='' /> {/* Use the URL from the API */}
        <h2>{post.title}</h2>
        {/* Wrap the "Read More" button with a Link */}
        <Link to={`/post/${post.id}`}>
          <button>Read More</button>
        </Link>
      </div>
    ))}
  </div>
  );
};

export default Menu;
