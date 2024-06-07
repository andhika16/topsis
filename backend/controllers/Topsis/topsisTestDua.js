const Alternatif = require("../../model/alternatifModel");
const Kategori = require("../../model/kategoriModel");
const Matriks = require("../../model/matriksModel");

// Fungsi untuk normalisasi matriks keputusan
function normalisasiMatriks(matriks) {
  const jumlah_vertikal = Array(matriks[0].length).fill(0);

  // Hitung jumlah vertikal dengan pangkat dua
  for (let col = 0; col < matriks[0].length; col++) {
      for (let row = 0; row < matriks.length; row++) {
      jumlah_vertikal[col] += Math.pow(matriks[row][col], 2);
    }
    jumlah_vertikal[col] = Math.sqrt(jumlah_vertikal[col]);
  }

  // Normalisasi matriks
  return matriks.map((row) =>
    row.map((val, col) => val / jumlah_vertikal[col])
  );
}

// Fungsi untuk menghitung matriks terbobot
function matriksTerbobot(matriks, bobot) {
  return matriks.map((row) => row.map((val, col) => val * bobot[col]));
}

// Fungsi untuk menyimpan nilai normalisasi atau terbobot ke database

// Fungsi untuk solusi ideal positif dan negatif
function solusiIdeal(matriksTerbobot) {
  const nKriteria = matriksTerbobot[0].length;
  const solusiIdealPositif = Array(nKriteria).fill(-Infinity);
  const solusiIdealNegatif = Array(nKriteria).fill(Infinity);

  matriksTerbobot.forEach((row) => {
      row.forEach((val, col) => {
          if (val > solusiIdealPositif[col]) solusiIdealPositif[col] = val;
          if (val < solusiIdealNegatif[col]) solusiIdealNegatif[col] = val;
        });
    });

    return { positif: solusiIdealPositif, negatif: solusiIdealNegatif };
}

// Fungsi untuk menghitung jarak Euclidean
function jarakEuclidean(alternatif, solusiIdeal) {
  const jarakPositif = Math.sqrt(
      alternatif.reduce(
          (acc, val, index) => acc + Math.pow(val - solusiIdeal.positif[index], 2),
      0
    )
    );
    const jarakNegatif = Math.sqrt(
    alternatif.reduce(
      (acc, val, index) => acc + Math.pow(val - solusiIdeal.negatif[index], 2),
      0
    )
  );

  return { jarakPositif, jarakNegatif };
}

// Fungsi untuk menghitung skor preferensi relatif
function skorPreferensiRelatif(jarakPositif, jarakNegatif) {
  return jarakNegatif / (jarakPositif + jarakNegatif);
}

async function simpanNilai(id_alternatif, id_penilaian, nilai, tipe) {
  try {
    const nilaiRounded = Number(nilai.toFixed(4));
    // let entry = await Matriks.findOne({
    //   where: { id_alternatif, id_penilaian }
    // });

    // if (!entry) {
    //     entry = await Matriks.create({
    //       id_alternatif,
    //       id_penilaian,
    //       [tipe]: nilaiRounded
    //     });
    // } else {
    //   entry[tipe] = nilaiRounded;
    //     await entry.save();
    // }
    console.log(id_alternatif,id_penilaian,nilai);

    // return { success: true, data: entry };
  } catch (error) {
    console.error(`Gagal menyimpan nilai ${tipe}:`, error);
    throw error;
  }
}
// Fungsi utama untuk TOPSIS
async function testTopsisDua(req, res) {
    try {
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

    const alternatifCount = alternatifData.length;
    const kriteriaCount = alternatifData[0].Matriks.length;
    
    let matriksKeputusan = [];
    let bobot = bobotKategori.map((item) => item.bobot);
    
    for (let i = 0; i < alternatifCount; i++) {
      matriksKeputusan.push(
        alternatifData[i].Matriks.map((item) => item.nilai)
      );
    }

    const matriksNormalisasi = normalisasiMatriks(matriksKeputusan);
    const matriksBobot = matriksTerbobot(matriksNormalisasi, bobot);

    for (let i = 0; i < alternatifCount; i++) {
      for (let j = 0; j < kriteriaCount; j++) {
        await simpanNilai(
          alternatifData[i].id,
          alternatifData[i].Matriks[j].id_penilaian,
          matriksNormalisasi[i][j],
          "normalisasi"
        );
        await simpanNilai(
          alternatifData[i].id,
          alternatifData[i].Matriks[j].id_penilaian,
          matriksBobot[i][j],
          "terbobot"
        );
      }
    }

    const { positif, negatif } = solusiIdeal(matriksBobot);
    const skorPreferensi = alternatifData.map((alternatif, i) => {
      const { jarakPositif, jarakNegatif } = jarakEuclidean(matriksBobot[i], {
        positif,
        negatif,
      });
      return {
        id: alternatif.id,
        nama_alternatif: alternatif.nama_alternatif,
        skor: skorPreferensiRelatif(jarakPositif, jarakNegatif),
      };
    });

    skorPreferensi.sort((a, b) => b.skor - a.skor);

    console.table(skorPreferensi);

    return res.json({ success: true, data: skorPreferensi });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Gagal menghitung TOPSIS." });
  }
}

module.exports = { testTopsisDua };
