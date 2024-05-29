// Contoh data matriks keputusan dan bobot
const matriksKeputusan = [
    [250, 400, 600],  // Alternatif 1
    [200, 300, 700],  // Alternatif 2
    [400, 500, 800]   // Alternatif 3
];

const bobot = [0.4, 0.3, 0.3];  // Bobot untuk setiap kriteria

// Fungsi untuk normalisasi matriks keputusan
function normalisasiMatriks(matriks) {
    const hasil = [];
    for (let i = 0; i < matriks.length; i++) {
        const row = matriks[i];
        const total = row.reduce((acc, val) => acc + val, 0);
        const normalizedRow = row.map(val => val / total);
        hasil.push(normalizedRow);
    }
    return hasil;
}

// Fungsi untuk menghitung matriks terbobot
function matriksTerbobot(matriks, bobot) {
    const hasil = [];
    for (let i = 0; i < matriks.length; i++) {
        const row = matriks[i];
        const weightedRow = row.map((val, j) => val * bobot[j]);
        hasil.push(weightedRow);
    }
    return hasil;
}

// Fungsi untuk mencari solusi ideal positif dan negatif
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

    return { positif: solusiIdealPositif, negatif: solusiIdealNegatif };
}

// Fungsi untuk menghitung jarak euclidean dari suatu alternatif ke solusi ideal
function jarakEuclidean(alternatif, solusiIdeal) {
    return Math.sqrt(
        alternatif.reduce((acc, val, index) => acc + (val - solusiIdeal[index]) ** 2, 0)
    );
}

// Fungsi untuk menghitung skor preferensi relatif
function skorPreferensiRelatif(jarakPositif, jarakNegatif) {
    return jarakNegatif / (jarakPositif + jarakNegatif);
}

// Fungsi utama untuk TOPSIS
function topsis(matriksKeputusan, bobot) {
    const matriksNormalisasi = normalisasiMatriks(matriksKeputusan);
    const matriksTerbobot = matriksTerbobot(matriksNormalisasi, bobot);
    const { positif, negatif } = solusiIdeal(matriksTerbobot);

    const skorPreferensi = [];
    for (let i = 0; i < matriksKeputusan.length; i++) {
        const alternatif = matriksTerbobot[i];
        const jarakPositif = jarakEuclidean(alternatif, positif);
        const jarakNegatif = jarakEuclidean(alternatif, negatif);
        const skor = skorPreferensiRelatif(jarakPositif, jarakNegatif);
        skorPreferensi.push({ alternatif: i + 1, skor });
    }

    skorPreferensi.sort((a, b) => b.skor - a.skor);  // Urutkan dari tertinggi ke terendah
    return skorPreferensi;
}

// Contoh penggunaan
const hasilTopsis = topsis(matriksKeputusan, bobot);
console.log("Hasil perangkingan dengan metode TOPSIS:");
console.table(hasilTopsis);
