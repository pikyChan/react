import React, { useState, useEffect } from "react";

function Tamu() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/bukutamu")
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Buku Tamu</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Tamu</th>
            <th>No HP</th>
            <th>Jabatan</th>
            <th>Unit Kerja</th>
            <th>Tujuan</th>
            <th>Yang Dituju</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nama_tamu}</td>
              <td>{item.no_hp}</td>
              <td>{item.jabatan}</td>
              <td>{item.unit_kerja}</td>
              <td>{item.tujuan}</td>
              <td>{item.yang_dituju}</td>
              <td>{item.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tamu;