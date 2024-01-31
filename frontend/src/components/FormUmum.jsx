import { useState } from "react";

export default function FormUmum() {
  const [alternatif, setAlternatif] = useState({
    nama: "",
    nomor_kk: "",
    nik: "",
    jenis_kelamin: "pria",
    alamat: "",
    pekerjaan: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setAlternatif((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/alternatif", {
        method: "POST",
        body: JSON.stringify(alternatif),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();



      if (!response.ok) {
        setError(json.error);
        
      }
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Nama :</label>
      <input
        type="text"
        onChange={handleChange}
        name="nama"
        value={alternatif.nama}
        placeholder="nama"
      />
      <label>Nomor KK :</label>
      <input
        type="number"
        onChange={handleChange}
        name="nomor_kk"
        value={alternatif.nomor_kk}
        placeholder="nomor_kk"
      />
      <label>nik :</label>
      <input
        type="number"
        onChange={handleChange}
        name="nik"
        value={alternatif.nik}
        placeholder="nik"
      />
      <label>Alamat :</label>
      <input
        type="text"
        onChange={handleChange}
        name="alamat"
        value={alternatif.alamat}
        placeholder="alamat"
      />
      <label>Jenis Kelamin :</label>
      <select
        value={alternatif.jenis_kelamin}
        onChange={handleChange}
        name="jenis_kelamin"
        id="jenisKelamin"
      >
        <option value="pria">Pria</option>
        <option value="wanita">Wanita</option>
      </select>

      <label>Pekerjaan :</label>
      <input
        type="text"
        onChange={handleChange}
        name="pekerjaan"
        value={alternatif.pekerjaan}
        placeholder="pekerjaan"
      />

      <button type="submit">Add Workout</button>
      {error && <h1>{error}</h1>}
    </form>
  );
}
