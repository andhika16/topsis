const Alternatif = require("../../model/alternatifModel");
const Kategori = require("../../model/kategoriModel");
const Matriks = require("../../model/matriksModel");

function normalisasiMatriks(matriks) {
  const nilai = [];
  const nilai_pangkat = []; // Untuk menyimpan jumlah sebelum diakarkan

  // Inisialisasi nilai dengan nilai nol
  for (let col = 0; col < matriks[0].length; col++) {
    nilai[col] = 0;
    nilai_pangkat[col] = 0;
  }

  // Pangkatkan masing-masing elemen matriks dua kali sebelum menjumlahkan
  for (let col = 0; col < matriks[0].length; col++) {
    for (let row = 0; row < matriks.length; row++) {
      // Pangkatkan nilai sebelum ditambahkan ke nilai
      const pangkat_nilai = Math.pow(matriks[row][col], 2);
      nilai[col] += pangkat_nilai;
      nilai_pangkat[col] += pangkat_nilai;
    }
  }

  // Akarkan masing-masing jumlah akhir
  for (let col = 0; col < nilai.length; col++) {
    nilai[col] = Math.sqrt(nilai[col]);
  }

  // Bagikan nilai matriks dengan hasil yang telah diakarkan
  const hasil_bagi = [];
  for (let row = 0; row < matriks.length; row++) {
    hasil_bagi[row] = [];
    for (let col = 0; col < matriks[0].length; col++) {
      hasil_bagi[row][col] = matriks[row][col] / nilai[col];
    }
  }

  // Tampilkan hasil sebelum dan setelah diakarkan
  // console.log("Jumlah sebelum diakarkan:");
  // nilai_pangkat.forEach((jumlah, index) => {
  //   console.log(`Kolom ${index + 1}: ${jumlah}`);
  // });

  // console.log("\nJumlah setelah diakarkan:");
  // nilai.forEach((jumlah, index) => {
  //   console.log(`Kolom ${index + 1}: ${jumlah}`);
  // });

  // console.log("\nNormalisasi Matriks:");
  // hasil_bagi.forEach((row) => {
  //   const formattedRow = row.map((val) => val);
  //   console.table(formattedRow.join("\t"));
  // });

  return hasil_bagi;
}

function matriksTerbobot(matriks, bobot) {
  const hasil = [];
  for (let i = 0; i < matriks.length; i++) {
    const row = matriks[i];
    const weightedRow = row.map((val, j) => val * bobot[j]);
    hasil.push(weightedRow);
  }
  console.log("Matriks Terbobot:");
  hasil.forEach((row) => {
    const formattedRow = row.map((val) => val);
    console.table(formattedRow.join("||"));
  });
  return hasil;
}

function solusiIdeal(matriksTerbobot) {
  const nKriteria = matriksTerbobot[0].length;
  const solusiIdealPositif = Array(nKriteria).fill(-Infinity);
  const solusiIdealNegatif = Array(nKriteria).fill(Infinity);

  for (let j = 0; j < nKriteria; j++) {
    for (let i = 0; i < matriksTerbobot.length; i++) {
      const val = matriksTerbobot[i][j];
      if (val > solusiIdealPositif[j]) {
        solusiIdealPositif[j] = val;
      }
      if (val < solusiIdealNegatif[j]) {
        solusiIdealNegatif[j] = val;
      }
    }
  }

  console.log("Solusi Ideal Positif:");
  console.table(solusiIdealPositif);
  console.log("Solusi Ideal Negatif:");
  console.table(solusiIdealNegatif);

  return { positif: solusiIdealPositif, negatif: solusiIdealNegatif };
}

function jarakEuclidean(alternatif, solusiIdeal) {
  const jarakPositif = Math.sqrt(
    alternatif.reduce(
      (acc, val, index) => acc + (val - solusiIdeal.positif[index]) ** 2,
      0
    )
  );
  const jarakNegatif = Math.sqrt(
    alternatif.reduce(
      (acc, val, index) => acc + (val - solusiIdeal.negatif[index]) ** 2,
      0
    )
  );

  console.log("Jarak Euclidean ke Solusi Ideal Positif:");
  console.log({ jarakPositif });
  console.log("Jarak Euclidean ke Solusi Ideal Negatif:");
  console.log({ jarakNegatif });

  return { jarakPositif, jarakNegatif };
}

// Fungsi untuk menghitung skor preferensi relatif
function skorPreferensiRelatif(jarakPositif, jarakNegatif) {
  const totalSkor = jarakNegatif / (jarakPositif + jarakNegatif);

  console.log(totalSkor);
  return totalSkor;
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
  const matriksKeputusan = [];
  const alternatifCount = alternatifData.length;
  let bobot = bobotKategori.map((item) => item.bobot);
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

  const matriksNormalisasi = normalisasiMatriks(matriksKeputusan);
  const bobotMatriks = matriksTerbobot(matriksNormalisasi, bobot);

  const { positif, negatif } = solusiIdeal(bobotMatriks);
  const skorPreferensi = alternatifData.map((alternatif, i) => {
    const { jarakPositif, jarakNegatif } = jarakEuclidean(bobotMatriks[i], {
      positif,
      negatif,
    });
    return {
      id: alternatif.id,
      nama_alternatif: alternatif.nama_alternatif,
      skor: skorPreferensiRelatif(jarakPositif, jarakNegatif),
    };
  });
  console.log(skorPreferensi);
  // res.status(201).send({ message: "data ada", data: matriksKeputusan });
};
module.exports = { topsis_inputdata };
