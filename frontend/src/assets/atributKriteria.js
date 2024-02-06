export const criteriaOptions = ["Pekerjaan", "Pendidikan", "Penghasilan"];

export const penghasilanAttributes = [
  "Rp.1900000",
  "Rp.1500000",
  "Rp.1000000",
  "Rp.7000000",
  "Rp.5000000",
];

export const pekerjaanAttributes = [
  "Pengangguran",
  "Petani/Buruh",
  "Pedagang",
  "Pegawai",
];

export const pendidikanAttributes = ["SD", "SMP", "SMA", "Tidak Sekolah"];

export const bobotValues = {
  Pekerjaan: {
    Pengangguran: 4,
    "Petani/Buruh": 3,
    Pedagang: 2,
    Pegawai: 1,
  },
  Pendidikan: {
    SD: 3,
    SMP: 2,
    SMA: 1,
  },
  Penghasilan: {
    "Rp.1900000": 1,
    "Rp.1500000": 2,
    "Rp.1000000": 3,
    "Rp.7000000": 4,
    "Rp.5000000": 5,
  },
};
