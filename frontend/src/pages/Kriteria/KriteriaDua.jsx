import React, { useState } from 'react';

const KriteriaDua = () => {
  const [formData, setFormData] = useState({
    penghasilan: '',
    luasRumah: '',
    jenisDinding: '',
    lantai: '',
    pekerjaan: '',
    pendidikan: '',
    hartaBenda: '',
    peneranganRumah: '',
    jumlahKeluarga: '',
    aksesKesehatan: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Lakukan sesuatu dengan data formData, misalnya kirim ke backend
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Form Input Kriteria</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="penghasilan" className="block text-gray-700 font-medium mb-2">
            Penghasilan:
          </label>
          <select
            id="penghasilan"
            name="penghasilan"
            value={formData.penghasilan}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Pilih Penghasilan</option>
            <option value="<Rp.600.000">&lt;Rp.600.000</option>
            <option value=">Rp.700.000 dan <Rp.1.100.000">&gt;Rp.700.000 dan &lt;Rp.1.100.000</option>
            <option value="> Rp.1.100.000 dan < Rp.1.600.000">&gt; Rp.1.100.000 dan &lt; Rp.1.600.000</option>
            <option value="> Rp.1.600.000 dan <1.900.000">&gt; Rp.1.600.000 dan &lt;1.900.000</option>
            <option value=">2.000.000 dan < 2.200.000">&gt;2.000.000 dan &lt; 2.200.000</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="luasRumah" className="block text-gray-700 font-medium mb-2">
            Luas Rumah:
          </label>
          <select
            id="luasRumah"
            name="luasRumah"
            value={formData.luasRumah}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Pilih Luas Rumah</option>
            <option value="<8 m^2">&lt;8 m^2</option>
            <option value="10-15 m^2">10-15 m^2</option>
            <option value="15-20 m^2">15-20 m^2</option>
            <option value="20-30 m^2">20-30 m^2</option>
            <option value=">30 m^2">&gt;30 m^2</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="jenisDinding" className="block text-gray-700 font-medium mb-2">
            Jenis Dinding:
          </label>
          <select
            id="jenisDinding"
            name="jenisDinding"
            value={formData.jenisDinding}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Pilih Jenis Dinding</option>
            <option value="Bambu">Bambu</option>
            <option value="Triplek">Triplek</option>
            <option value="Papan">Papan</option>
            <option value="Tembok">Tembok</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="lantai" className="block text-gray-700 font-medium mb-2">
            Lantai:
          </label>
          <select
            id="lantai"
            name="lantai"
            value={formData.lantai}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Pilih Jenis Lantai</option>
            <option value="Tanah">Tanah</option>
            <option value="Papan">Papan</option>
            <option value="Semen cor">Semen cor</option>
            <option value="Keramik">Keramik</option>
          </select>
        </div>
        {/* Tambahkan form untuk kriteria lainnya sesuai dengan struktur yang sama */}
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default KriteriaDua;
