const Alternatif = require("../../model/alternatifModel");
const Kategori = require("../../model/kategoriModel");
const Matriks = require("../../model/matriksModel");
// FIXME:nilai normalisasi dan bobot belum terurut dengan rangking
// Fungsi untuk normalisasi matriks keputusan
function normalisasiMatriks(matriks) {
  const nilai_matriks = Array(matriks[0].length).fill(0);

  // Hitung jumlah vertikal dengan pangkat dua
  for (let col = 0; col < matriks[0].length; col++) {
    for (let row = 0; row < matriks.length; row++) {
      nilai_matriks[col] += Math.pow(matriks[row][col], 2);
    }
    nilai_matriks[col] = Math.sqrt(nilai_matriks[col]);
  }

  // Normalisasi matriks
  return matriks.map((row) => row.map((val, col) => val / nilai_matriks[col]));
}

// Fungsi untuk menghitung matriks terbobot
function matriksTerbobot(matriks, bobot) {
  return matriks.map((row) => row.map((val, col) => val * bobot[col]));
}

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

// Fungsi untuk menyimpan nilai ke dalam tabel Matriks
async function simpanNilai(
  id_alternatif,
  id_penilaian,
  normalisasi,
  terbobot,
  nilai_akhir,
  rangking
) {
  try {
    const nilaiNormalisasi = Number(normalisasi.toFixed(3));
    const nilaiTerbobot = Number(terbobot.toFixed(3));
    const skor = Number(nilai_akhir.toFixed(3));

    let entry = await Matriks.findOne({
      where: { id_alternatif, id_penilaian },
    });
    if (!entry) {
      entry = await Matriks.create({
        id_alternatif,
        id_penilaian,
        normalisasi: nilaiNormalisasi,
        terbobot: nilaiTerbobot,
        nilai_akhir: skor,
        rank: rangking,
      });
    } else {
      entry.id_alternatif;
      entry.id_penilaian;
      entry.normalisasi = nilaiNormalisasi;
      entry.terbobot = nilaiTerbobot;
      entry.nilai_akhir = skor;
      entry.rank = rangking;
      await entry.save();
    }

    return { success: true, message: "Hasil nilai", data: entry };
  } catch (error) {
    console.error(`Gagal menyimpan nilai:`, error);
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
    const nama_matriks = alternatifData.filter(
      (item) => item.Matriks?.length === 0
    );
    if (nama_matriks.length !== 0) {
      res.status(422).send({
        message: "mohon maaf data alternatif yang terinput belum lengkap",
        data: nama_matriks,
      });
      return true;
    }
    let matriksKeputusan = [];

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
    const matriksBobot = matriksTerbobot(matriksNormalisasi, bobot);

    const { positif, negatif } = solusiIdeal(matriksBobot);
    const skorPreferensi = alternatifData.map((alternatif, i) => {
      const { jarakPositif, jarakNegatif } = jarakEuclidean(matriksBobot[i], {
        positif,
        negatif,
      });
      return {
        id: alternatif.id,
        nama_alternatif: alternatif.nama_alternatif,
        jarakPositif,
        jarakNegatif,
        skor: skorPreferensiRelatif(jarakPositif, jarakNegatif),
      };
    });

    skorPreferensi.sort((a, b) => b.skor - a.skor);
    skorPreferensi.forEach((alternatif, index) => {
      alternatif.ranking = index + 1;
    });

    let isComplete = true;
    for (let i = 0; i < alternatifCount; i++) {
      for (let j = 0; j < kriteriaCount; j++) {
        try {
          const nilai_akhir = skorPreferensi[i].skor;
          const rangking = skorPreferensi[i].ranking;

          // await simpanNilai(
          //   alternatifData[i].id,
          //   alternatifData[i].Matriks[j].id_penilaian,
          //   matriksNormalisasi[i][j],
          //   matriksBobot[i][j],
          //   nilai_akhir,
          //   rangking
          // );

          // console.log("data tersimpan");
        } catch (error) {
          isComplete = false;
          console.error(
            `Error processing alternatif ${i}, kriteria ${j}:`,
            error
          );
          break;
        }
      }
      if (!isComplete) break;
    }

    if (!isComplete) {
      return res
        .status(500)
        .json({ success: false, message: "Gagal menyimpan beberapa nilai." });
    }

    // Update ranks

    return res.json({
      success: true,
      data: skorPreferensi,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Gagal menghitung TOPSIS." });
  }
}

module.exports = { testTopsisDua };
