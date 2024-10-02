import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Widgets = () => {
  const url = 'http://localhost:3000/api/post';
  const [bukuTamuData, setBukuTamuData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ title: '', description: '', img: '', cat: '' });
  const [imgFile, setImgFile] = useState(null); // State untuk menyimpan file gambar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setBukuTamuData(data);
      setLoading(false); // Set loading to false once data is fetched
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
      setLoading(false); // Stop loading on error
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete post with ID: ${id}?`)) {
      fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (!response.ok) throw new Error('Error deleting the post');
        setBukuTamuData(bukuTamuData.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error:', error));
    }
  };

  const handleEdit = (id) => {
    const item = bukuTamuData.find(item => item.id === id);
    setEditingData({ ...item });
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    setImgFile(e.target.files[0]); // Menyimpan file gambar yang dipilih
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', editingData.title);
    formData.append('description', editingData.description);
    formData.append('cat', editingData.cat);

    if (imgFile) {
      formData.append('img', imgFile); // Hanya append file jika ada gambar yang di-upload
    } else {
      formData.append('img', editingData.img); // Jika tidak ada gambar baru, gunakan yang lama
    }

    fetch(`${url}/${editingId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData // Kirim form data (mengandung file jika ada)
    })
    .then(response => {
      if (!response.ok) throw new Error('Error updating the post');
      setBukuTamuData(bukuTamuData.map(item => item.id === editingId ? { ...item, ...editingData } : item));
      setEditingId(null);
      setEditingData({ title: '', description: '', img: '', cat: '' });
      setIsModalOpen(false);
      setImgFile(null); // Reset file input setelah upload
    })
    .catch(error => console.error('Error:', error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImgFile(null); // Reset file input jika modal ditutup
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="content" style={{ width: "800px", marginLeft: '40px', height: '1600px' }}>
      <div className="card-body">
        <div className="pp" style={{ display: 'flex' }}>
          <h1 style={{ textAlign: "center", marginLeft: "240px", fontWeight: "500" }}>Blog</h1>
          <Link to="/addblog">
            <button className="btn btn-primary" style={{ margin: '10px 0 20px 700px', width: '130px' }}>Tambah Data</button>
          </Link>
        </div>

        <table className="table table-bordered table-hover" style={{ width: '920px', marginLeft: '230px', marginRight: '-100px', textAlign: 'center' }}>
          <thead style={{ background: '#f2f2f2' }}>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Foto</th>
              <th>Kategori</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bukuTamuData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    alt={item.title}
                    className="object-cover"
                    style={{ borderRadius: '10px', width: '100px', height: '70px' }} // Set width to 200px
                    src={`http://localhost:3000/Uploads/${item.img}`} // Referensi ke gambar yang di-upload
                  />
                </td>
                <td>{item.cat}</td>
                <td>
                  <button className="btn btn-success" onClick={() => handleEdit(item.id)} style={{ marginBottom: '10px', width: '70px', marginRight: '10px', marginLeft: '10px', marginTop: '10px' }}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal" style={{ display: 'block', justifyContent: 'center', alignItems: 'center', position: 'fixed', marginLeft: '140px', marginTop: '70px' }}>
          <div className="modal-dialog" style={{ maxWidth: '800px', margin: 'auto' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Post</h5>
                <button type="button" className="btn-close" onClick={closeModal}>X</button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSaveChanges}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editingData.title}
                          onChange={e => setEditingData({ ...editingData, title: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Deskripsi</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editingData.description}
                          onChange={e => setEditingData({ ...editingData, description: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Foto</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleImageChange} // Tangkap file yang diunggah
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Kategori</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editingData.cat}
                          onChange={e => setEditingData({ ...editingData, cat: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={closeModal} style={{ marginLeft: '10px' }}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Widgets;
