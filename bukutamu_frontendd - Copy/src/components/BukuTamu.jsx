import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BukuTamuForm = () => {
  const [namaTamu, setNamaTamu] = useState('');
  const [noHp, setNoHp] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [unitKerja, setUnitKerja] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [yangDituju, setYangDituju] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formData = {
        nama_tamu: namaTamu,
        no_hp: noHp,
        jabatan: jabatan,
        unit_kerja: unitKerja,
        tujuan: tujuan,
        yang_dituju: yangDituju,
        keterangan: keterangan
      };
  
      console.log('Form data:', formData);
  
      fetch('http://localhost:3000/api/bukutamu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
        navigate('/tamudata');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error creating buku tamu: ' + error.message);
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating buku tamu: ' + error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="kartu">
        <input type="text" name="nama_tamu" id="nama-tamu" className="form-control" placeholder="Nama Tamu" value={namaTamu} onChange={e => setNamaTamu(e.target.value)} />
        <div style={{ marginBottom: '10px' }}></div>
        <input type="text" name="no_hp" id="no-hp" className="form-control" placeholder="No. HP" value={noHp} onChange={e => setNoHp(e.target.value)} />
        <div style={{ marginBottom: '10px' }}></div>
        <input type="text" name="jabatan" id="jabatan" className="form-control" placeholder="Jabatan" value={jabatan} onChange={e => setJabatan(e.target.value)} />
        <div style={{ marginBottom: '10px' }}></div>
        <input type="text" name="unit_kerja" id="unit-kerja" className="form-control" placeholder="Unit Kerja" value={unitKerja} onChange={e => setUnitKerja(e.target.value)} />
        <div style={{ marginBottom: '10px' }}></div>
        <input type="text" name="tujuan" id="tujuan" className="form-control" placeholder="Tujuan" value={tujuan} onChange={e => setTujuan(e.target.value)} />
        <div style={{ marginBottom: '10px' }}></div>
        <input type="text" name="yang_dituju" id="yang-dituju" className="form-control" placeholder="Yang Dituju" value={yangDituju} onChange={e => setYangDituju(e.target.value)} />
        <div style={{ marginBottom: '10px' }}></div>
        <input type="text" name="keterangan" id="keterangan" className="form-control" placeholder="Keterangan" value={keterangan} onChange={e => setKeterangan(e.target.value)} />
      </div>
      <button type="submit">Kirim</button>
    </form>
  );
};

export default BukuTamuForm;