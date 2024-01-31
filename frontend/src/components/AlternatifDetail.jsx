
/* eslint-disable react/prop-types */
export function AlternatifDetail({ alternatif }) {



  const hapusData = async (id) => {
    try {
      await fetch(`http://localhost:4000/alternatif/${id}`, {
        method: "DELETE",
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-auto h-1/2 bg-slate-800 m-2 p-3 rounded-md text-white font-mono">
      <p> nama : {alternatif.nama_alternatif}</p>
      <p> Nomor KK :{alternatif.no_kk}</p>
      <p> NIK :{alternatif.no_telp}</p>
      <p> Jenis kelamin :{alternatif.jenis_kelamin}</p>
      <p>alamat :{alternatif.alamat}</p>
      <p>Pekerjaan : {alternatif.pekerjaan}</p>
      <button
        className="button bg-red-800 p-2 rounded"
        onClick={() => hapusData(alternatif.id)}
      >
        delete
      </button>
    </div>
  );
}
