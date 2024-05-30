const Alternatif = require("../../model/alternatifModel");
const Kriteria = require("../../model/kriteriaModel");
const Matriks = require("../../model/matriksModel");

// Fungsi untuk normalisasi matriks keputusan
async function normalisasiMatriks(matriks) {
  const jumlah_vertikal = [];
  const jumlah_vertikal_pangkat = []; // Untuk menyimpan jumlah sebelum diakarkan

  // Inisialisasi jumlah_vertikal dengan nilai nol
  for (let col = 0; col < matriks[0].values.length; col++) {
    jumlah_vertikal[col] = 0;
    jumlah_vertikal_pangkat[col] = 0;
  }

  // Pangkatkan masing-masing elemen matriks dua kali sebelum menjumlahkan
  for (let col = 0; col < matriks[0].values.length; col++) {
    for (let row = 0; row < matriks.length; row++) {
      const pangkat_nilai = Math.pow(matriks[row].values[col].nilai, 2);
      jumlah_vertikal[col] += pangkat_nilai;
      jumlah_vertikal_pangkat[col] += pangkat_nilai;
    }
  }

  // Akarkan masing-masing jumlah akhir
  for (let col = 0; col < jumlah_vertikal.length; col++) {
    jumlah_vertikal[col] = Math.sqrt(jumlah_vertikal[col]);
  }

  // Bagikan nilai matriks dengan hasil yang telah diakarkan
  const hasil_bagi = matriks.map((row) => {
    return {
      id: row.id,
      nama_alternatif: row.nama_alternatif,
      values: row.values.map((val, col) => ({
        nilai: val.nilai / jumlah_vertikal[col],
        kriteriaId: val.kriteriaId,
        alternatifId: val.alternatifId,
      })),
    };
  });




  console.log("Normalisasi Matriks:");
  const {values} = hasil_bagi
  console.log(values);
  

  return hasil_bagi;
}

// Fungsi untuk menghitung matriks terbobot

// Fungsi utama untuk TOPSIS
async function testTopsis(req, res) {
  try {
    // Ambil data alternatif, kriteria, dan nilai matriks dari database
    const alternatifData = await Alternatif.findAll({
      attributes: ["id", "nama_alternatif"],
      include: [
        {
          model: Kriteria,
          as: "Kriteria",
          attributes: ["nama_kriteria", "bobot", "id", "alternatifId"],
        },
        {
          model: Matriks,
          as: "Matriks",
          attributes: ["nilai", "id", "alternatifId", "kriteriaId"],
        },
      ],
    });

    // Proses data untuk TOPSIS
    const alternatifCount = alternatifData.length;
    const kriteriaCount = alternatifData[0].Kriteria.length;

    // Matriks keputusan
    let matriksKeputusan = [];

    // Bobot kriteria
    let bobot = [];

    // Isi matriks keputusan dan bobot dari data yang sudah diambil
    for (let i = 0; i < alternatifCount; i++) {
      const alternatif = alternatifData[i];
      let alternatifValues = [];

      for (let j = 0; j < kriteriaCount; j++) {
        const nilai = alternatif.Matriks[j] ? alternatif.Matriks[j].nilai : 0; // Penanganan jika Matriks[j] undefined
        alternatifValues.push({
          nilai,
          kriteriaId: alternatif.Kriteria[j].id,
          alternatifId: alternatif.id,
        });

        // Simpan bobot dari kriteria ke array bobot
        if (i === 0) {
          bobot.push(alternatif.Kriteria[j].bobot);
        }
      }

      matriksKeputusan.push({
        id: alternatif.id,
        nama_alternatif: alternatif.nama_alternatif,
        values: alternatifValues,
      });
    }

    console.log("Matriks Keputusan:");
    console.table(matriksKeputusan);

    // Normalisasi matriks keputusan
    const matriksNormalisasi = await normalisasiMatriks(matriksKeputusan);

    res.status(201).json({ success: true, data: matriksNormalisasi });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Gagal menghitung TOPSIS." });
  }
}

module.exports = { testTopsis };
  // // Simpan hasil normalisasi ke database
  // for (let row of hasil_bagi) {
  //   for (let i = 0; i < row.values.length; i++) {
  //     await Kriteria.update(
  //       { [`poin${i + 1}`]: row.values[i].nilai },
  //       { where: { id: row.values[i].kriteriaId } }
  //     );
  //   }
  // }
