const Alternatif = require("../../model/alternatifModel");
const Kategori = require("../../model/kategoriModel");
const Matriks = require("../../model/matriksModel");

function normalisasiMatriks(matriks) {
  const jumlah_vertikal = [];
  const jumlah_vertikal_pangkat = []; // Untuk menyimpan jumlah sebelum diakarkan

  // Inisialisasi jumlah_vertikal dengan nilai nol
  for (let col = 0; col < matriks[0].length; col++) {
    jumlah_vertikal[col] = 0;
    jumlah_vertikal_pangkat[col] = 0;
  }

  // Pangkatkan masing-masing elemen matriks dua kali sebelum menjumlahkan
  for (let col = 0; col < matriks[0].length; col++) {
    for (let row = 0; row < matriks.length; row++) {
      // Pangkatkan nilai sebelum ditambahkan ke jumlah_vertikal
      const pangkat_nilai = Math.pow(matriks[row][col], 2);
      jumlah_vertikal[col] += pangkat_nilai;
      jumlah_vertikal_pangkat[col] += pangkat_nilai;
    }
  }

  // Akarkan masing-masing jumlah akhir
  for (let col = 0; col < jumlah_vertikal.length; col++) {
    jumlah_vertikal[col] = Math.sqrt(jumlah_vertikal[col]);
  }

  // Bagikan nilai matriks dengan hasil yang telah diakarkan
  const hasil_bagi = [];
  for (let row = 0; row < matriks.length; row++) {
    hasil_bagi[row] = [];
    for (let col = 0; col < matriks[0].length; col++) {
      hasil_bagi[row][col] = matriks[row][col] / jumlah_vertikal[col];
    }
  }

  // Tampilkan hasil sebelum dan setelah diakarkan
  console.log("Jumlah sebelum diakarkan:");
  jumlah_vertikal_pangkat.forEach((jumlah, index) => {
    console.log(`Kolom ${index + 1}: ${jumlah}`);
  });

  console.log("\nJumlah setelah diakarkan:");
  jumlah_vertikal.forEach((jumlah, index) => {
    console.log(`Kolom ${index + 1}: ${jumlah}`);
  });

  console.log("\nNormalisasi Matriks:");
  hasil_bagi.forEach((row) => {
    console.log(row.join("\t"));
  });

  return hasil_bagi;
}

const topsis_inputdata = async (req, res) => {
  const alternatifData = await Alternatif.findAll({
    attributes: ["id", "nama_alternatif"],
    include: [
      {
        model: Matriks,
        as: "Matriks",
        attributes: ["id_nilai", "nilai", "id_penilaian", "id_alternatif"],
      },
    ],
  });
  const bobotKategori = await Kategori.findAll({
    attributes: ["bobot"],
  });
  const nama_matriks = alternatifData.filter(
    (item) => item.Matriks?.length === 0
  );
  if (nama_matriks.length !== 0) {
    res.send({
      message: "mohon maaf data alternatif yang terinput belum lengkap",
      data: nama_matriks,
    });
    return true;
  }
  const alternatifCount = alternatifData.length;
  const matriksKeputusan = [];
  for (let i = 0; i < alternatifCount; i++) {
    const nilaiData = alternatifData[i].Matriks.map((item) => item.nilai);
    if (
      nilaiData.length > 0 &&
      nilaiData.every(
        (item) => item !== null && item !== undefined && item !== 0
      )
    ) {
      matriksKeputusan.push(nilaiData);
    }
  }

  res.status(201).send({ message: "data ada", data: matriksKeputusan });
};
module.exports = { topsis_inputdata };
