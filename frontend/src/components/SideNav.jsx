import React from "react";

const SideNav = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-lg font-bold">User</h1>
        <div>
          <Link to="/admin" className="text-white px-4">
            Home
          </Link>
          <Link to="/add-blog" className="text-white px-4">
            Tambah Blog
          </Link>
          <Link to="/edit-blog" className="text-white px-4">
            Edit Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
