import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addtamu = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log values for debugging
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Category:", cat);
    console.log("Image:", img);

    // Validate inputs
    if (!title || !description || !cat) {
        alert("Please fill in all required fields.");
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('cat', cat);
    if (img) {
        formData.append('img', img);
    }

    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:3000/api/post', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to create buku tamu:", errorData);
            throw new Error(errorData.message || 'Network response was not ok');
        }

        const data = await response.json();
        console.log('Response data:', data);
        navigate('/blog-content');
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating buku tamu: ' + error.message);
    }
};



  return (
    <div style={{ padding: '20px', margin: '0px 100px 50px 250px' }}>
      <h1>Create Buku Tamu</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              placeholder="Image"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              placeholder="Category"
              className="form-control"
              value={cat}
              onChange={e => setCat(e.target.value)}
            />
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-success btn-lg">Create</button>
      </form>
    </div>
  );
};

export default Addtamu;
