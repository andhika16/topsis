const Alternatif = require("../../model/alternatifModel");
const Kategori = require("../../model/kategoriModel");
const Matriks = require("../../model/matriksModel");

// Fungsi untuk normalisasi matriks keputusan
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
  console.log("Normalisasi Matriks:");
  console.log("Sebelum Diakarkan:");
  console.log(
    "\t| " +
      jumlah_vertikal_pangkat
        .map((jumlah, index) => `Kolom ${index + 1}`)
        .join(" | ") +
      " |"
  );
  console.log(
    "\t| " +
      jumlah_vertikal_pangkat.map((jumlah) => "-----------").join(" | ") +
      " |"
  );
  console.log(
    "\t| " +
      jumlah_vertikal_pangkat.map((jumlah) => jumlah.toFixed(2)).join(" | ") +
      " |"
  );

  console.log("Setelah Diakarkan:");
  console.log(
    "\t| " +
      jumlah_vertikal.map((jumlah, index) => `Kolom ${index + 1}`).join(" | ") +
      " |"
  );
  console.log(
    "\t| " + jumlah_vertikal.map((jumlah) => "-----------").join(" | ") + " |"
  );
  console.log(
    "\t| " +
      jumlah_vertikal.map((jumlah) => jumlah.toFixed(4)).join(" | ") +
      " |"
  );

  console.log("\nNormalisasi Matriks:");
  hasil_bagi.forEach((row) => {
    console.log(
      "\t| " + row.map((value) => value.toFixed(4)).join(" | ") + " |"
    );
  });
  console.log(hasil_bagi);
  return hasil_bagi;
}

// Fungsi untuk menghitung matriks terbobot
function matriksTerbobot(matriks, bobot) {
  const hasil = [];
  for (let i = 0; i < matriks.length; i++) {
    const row = matriks[i];
    const weightedRow = row.map((val, j) => val * bobot[j]);
    hasil.push(weightedRow);
  }
  console.log("Matriks Terbobot:");
  console.table(hasil);
  return hasil;
}

// // Fungsi untuk mencari solusi ideal positif dan negatif
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

// Fungsi untuk menghitung jarak euclidean dari suatu alternatif ke solusi ideal
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
  console.table({ jarakPositif });
  console.log("Jarak Euclidean ke Solusi Ideal Negatif:");
  console.table({ jarakNegatif });

  return { jarakPositif, jarakNegatif };
}

// Fungsi untuk menghitung skor preferensi relatif
function skorPreferensiRelatif(jarakPositif, jarakNegatif) {
  const skor = jarakNegatif / (jarakPositif + jarakNegatif);
  console.log("Skor Preferensi Relatif:");
  console.table({ skor });
  return skor;
}
async function simpanNilaiNormalisasi(id_alternatif, id_penilaian, terbobot) {
  try {
    // Cari entri Matriks berdasarkan id_alternatif

    const normalisasiRounded = Number(terbobot.toFixed(4));

    let nilaiNormalisasi = await Matriks.findOne({
      where: {
        id_alternatif,
        id_penilaian, // Jika id_penilaian diperlukan untuk mencari spesifik entri
      },
    });

    if (!nilaiNormalisasi) {
      // Jika tidak ada entri yang ditemukan, buat entri baru
      nilaiNormalisasi = await Matriks.create({
        id_alternatif,
        id_penilaian,
        normalisasi: normalisasiRounded,
        // Selain normalisasi, pastikan Anda memasukkan nilai-nilai lain yang diperlukan
        // seperti nilai_akhir, rank, dll sesuai kebutuhan aplikasi Anda
      });

      console.log(
        `Data normalisasi untuk id_alternatif ${id_alternatif} berhasil disimpan:\n`,
        terbobot
      );

      return { success: true, data: nilaiNormalisasi };
    }

    // Jika entri sudah ada, perbarui nilai normalisasi dan simpan perubahan
    // nilaiNormalisasi.normalisasi = normalisasiRounded;
    // await nilaiNormalisasi.save();

    console.log(
      `Nilai normalisasi untuk id_alternatif ${id_alternatif} berhasil diperbarui:\n`,
      terbobot
    );

    return { success: true, data: nilaiNormalisasi };
  } catch (error) {
    console.error("Gagal menyimpan nilai normalisasi:", error);
    throw error;
  }
}

// Fungsi utama untuk TOPSIS
async function testTopsis(req, res) {
  try {
    // Ambil data alternatif, kriteria, dan nilai matriks dari database
    const alternatifData = await Alternatif.findAll({
      attributes: ["id", "nama_alternatif"],
      include: [
        {
          model: Matriks,
          as: "Matriks",
          attributes: ["id_nilai", "nilai", "id_penilaian", "id_alternatif"],
        }, // Hanya ambil nama kriteria
      ],
    });

    const bobotKategori = await Kategori.findAll({
      attributes: ["bobot"],
    });

    // // Proses data untuk TOPSIS
    const alternatifCount = alternatifData.length;
    const kriteriaCount = alternatifData[0].Matriks.length;

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
        alternatifValues.push(nilai);

        // Simpan bobot dari kriteria ke array bobot
        if (i === 0) {
          bobot.push(bobotKategori[j].bobot);
        }
      }

      matriksKeputusan.push(alternatifValues);
    }

    console.log("Matriks Keputusan:");
    console.table(matriksKeputusan);

    // Normalisasi matriks keputusan
    const matriksNormalisasi = normalisasiMatriks(matriksKeputusan);
    for (let i = 0; i < alternatifCount; i++) {
      const id_alternatif = alternatifData[i].id;
      const matriksNormalisasiAlternatif = matriksNormalisasi[i]; // Ambil nilai normalisasi untuk alternatif ini
      for (let j = 0; j < kriteriaCount; j++) {
        const id_nilai = alternatifData[i].Matriks[j].id_penilaian;
        const nilai_normalisasi = matriksNormalisasiAlternatif[j];
        await simpanNilaiNormalisasi(
          id_alternatif,
          id_nilai,
          nilai_normalisasi
        );
      }
    }

    // Matriks terbobot
    const matriksBobot = matriksTerbobot(matriksNormalisasi, bobot);
    for (let i = 0; i < alternatifCount; i++) {
      const id_alternatif = alternatifData[i].id;
      const matriksNormalisasiAlternatif = matriksBobot[i]; // Ambil nilai normalisasi untuk alternatif ini
      for (let j = 0; j < kriteriaCount; j++) {
        const id_nilai = alternatifData[i].Matriks[j].id_penilaian;
        const nilai_normalisasi = matriksNormalisasiAlternatif[j];
        await simpanNilaiNormalisasi(
          id_alternatif,
          id_nilai,
          nilai_normalisasi
        );
      }
    }

    // // // Solusi ideal positif dan negatif
    // const { positif, negatif } = solusiIdeal(matriksBobot);

    // // // Hitung skor preferensi relatif untuk setiap alternatif
    // const skorPreferensi = [];
    // for (let i = 0; i < alternatifCount; i++) {
    //   const alternatifValues = matriksBobot[i];

    //   // Jarak alternatif terhadap solusi ideal positif dan negatif
    //   const { jarakPositif, jarakNegatif } = jarakEuclidean(alternatifValues, {
    //     positif,
    //     negatif,
    //   });

    //   // Skor preferensi relatif
    //   const skor = skorPreferensiRelatif(jarakPositif, jarakNegatif);

    //   // Simpan hasil skor preferensi relatif untuk alternatif ini
    //   skorPreferensi.push({
    //     id: alternatifData[i].id,
    //     nama_alternatif: alternatifData[i].nama_alternatif,
    //     skor,
    //   });
    // }

    // // Urutkan hasil berdasarkan skor preferensi relatif tertinggi ke terendah
    // skorPreferensi.sort((a, b) => b.skor - a.skor);

    // // Cetak hasil akhir sebelum dikirim ke database
    // console.log("Hasil perangkingan dengan metode TOPSIS:");
    // console.table(skorPreferensi);

    // return { success: true, data: skorPreferensi };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal menghitung TOPSIS." };
  }
}

module.exports = { testTopsis };
