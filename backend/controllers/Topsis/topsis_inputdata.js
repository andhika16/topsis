const Alternatif = require("../../model/alternatifModel");
const Kategori = require("../../model/kategoriModel");
const Matriks = require("../../model/matriksModel");

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

  const nama_matriks = alternatifData.filter(
    (item) => item.Matriks?.length === 0
  );



  if (nama_matriks.length !== 0) {
    res.send({
      message: "mohon maaf data alternatif tidak terinput lengkap",
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
