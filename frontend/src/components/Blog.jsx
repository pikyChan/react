import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

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
    <div>
     
      <section className="py-2 sm:py-1  dark:text-gray-800">
        <div className=" p-6 mx-auto space-y-4">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article key={post.id} className="flex flex-col">
                  <Link to={`/post/${post.id}`} aria-label={post.title}>
                    <img
                      alt={post.title}
                      className="object-cover w-full h-52 dark:bg-gray-500"
                      style={{ borderRadius: '10px' }}
                      src={`http://localhost:3000/Uploads/${post.img}`} // Fixed the syntax error here
                    />
                  </Link>
                  <div className="flex flex-col flex-1 p-4">
                    <Link to={`/post/${post.id}`} aria-label={post.title}></Link>
                    <a
                      href="#"
                      className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600"
                    >
                      {post.cat} {/* Display post category */}
                    </a>
                    <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                      {post.title} {/* Display post title */}
                    </h3>
                    <p>{getText(post.description)}</p>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                      <span>{new Date(post.date).toLocaleDateString()}</span> {/* Display creation date */}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center col-span-full">
                <p>No posts available</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
