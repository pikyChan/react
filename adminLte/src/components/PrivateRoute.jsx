import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const BukuTamuList = () => {
  const url = 'http://localhost:3000/api/post';
  const [bukutamu, setBukutamu] = useState([]);
  const [selectedTamu, setSelectedTamu] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate(); 
 
  const getBukuTamu = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`, // Use backticks for template literals
        'Content-Type': 'application/json',
      },
    });
    const dataTamu = await response.json();
    setBukutamu(dataTamu);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${url}/${id}`, { // Use backticks for string interpolation
      method: 'DELETE',
    });
    if (response.ok) {
      setBukutamu(bukutamu.filter((item) => item.id !== id));
    } else {
      console.error('Error deleting item:', response.status);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/${selectedTamu.id}`, { // Use backticks for string interpolation
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedTamu),
    });
    if (response.ok) {
      setIsModalOpen(false);
      getBukuTamu(); 
    } else {
      console.error('Error updating item:', response.status);
    }
  };

  const openModal = (item) => {
    setSelectedTamu(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTamu(null);
  };

  useEffect(() => {
    getBukuTamu();
  }, []);

  return (
    <div>
      <div className="content" style={{ width: "800px", marginLeft:'40px' }}>
        <div className="card-body">
          <h1 style={{textAlign: "center", marginLeft:"180px", fontWeight: "500"}}>Buku Tamu</h1>
          <a href="/addblog">
            <button className="btn btn-primary" style={{ margin: '10px 0px 20px 0px', width: '127%' }}>Tambah Data</button>
          </a>
          <table className="table table-bordered table-hover" style={{ maxWidth: '200px', marginLeft: '0px', marginRight: '-100px' }}>
            <thead style={{ background: '#f2f2f2' }}>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Deskripsi</th>
                <th>Foto</th>
                <th>Deskripsi</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bukutamu.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.img}</td>
                  <td>{item.cat}</td>
                  <td>
                    <button className="btn btn-success" onClick={() => openModal(item)} style={{ marginBottom: '10px', width: '98%' }}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for editing */}
      {isModalOpen && (
        <div className="modal" style={{ display: 'block', justifyContent: 'center', alignItems: 'center', marginLeft : "120px" }}>
          <div className="modal-dialog" style={{ maxWidth: '800px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Tamu</h5>
                <button type="button" className="btn-close" onClick={closeModal}>X</button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEdit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTamu?.title || ''}
                          onChange={(e) => setSelectedTamu({ ...selectedTamu, title: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Deskripsi</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTamu?.description || ''}
                          onChange={(e) => setSelectedTamu({ ...selectedTamu, description: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Foto</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTamu?.img || ''}
                          onChange={(e) => setSelectedTamu({ ...selectedTamu, img: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Kategori</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTamu?.cat || ''}
                          onChange={(e) => setSelectedTamu({ ...selectedTamu, cat: e.target.value })}
                        />
                      </div>
                      
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BukuTamuList;
