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
    "Tidak Sekolah": 4,
  },
  Penghasilan: {
    "Rp.1900000": 1,
    "Rp.1500000": 2,
    "Rp.1000000": 3,
    "Rp.7000000": 4,
    "Rp.5000000": 5,
  },
};


export const kriteriaData = [
  {
    nama: "Penghasilan",
    options: [
      { label: "<Rp.600.000", value: 5 },
      { label: ">Rp.700.000 dan <Rp.1.100.000", value: 4 },
      { label: "> Rp.1.100.000 dan < Rp.1.600.000", value: 3 },
      { label: "> Rp.1.600.000 dan <1.900.000", value: 2 },
      { label: ">2.000.000 dan < 2.200.000", value: 1 },
    ],
  },
  {
    nama: "Luas rumah",
    options: [
      { label: "<8 m^2", value: 5 },
      { label: "10-15 m^2", value: 4 },
      { label: "15-20 m^2", value: 3 },
      { label: "20-30 m^2", value: 2 },
      { label: ">30 m^2", value: 1 },
    ],
  },
  {
    nama: "Jenis dinding",
    options: [
      { label: "Bambu", value: 5 },
      { label: "Triplek", value: 4 },
      { label: "Papan", value: 3 },
      { label: "Tembok", value: 2 },
    ],
  },
  {
    nama: "Lantai",
    options: [
      { label: "Tanah", value: 4 },
      { label: "Papan", value: 3 },
      { label: "Semen cor", value: 2 },
      { label: "Keramik", value: 1 },
    ],
  },
  {
    nama: "Harta benda",
    options: [
      { label: "Tidak memiliki", value: 5 },
      { label: "Hewan ternak", value: 4 },
      { label: "Benda berharga", value: 3 },
      { label: "Kendaraan roda 2", value: 2 },
      { label: "Asset berharga", value: 1 },
    ],
  },
  {
    nama: "Penerangan rumah",
    options: [
      { label: "Lampu Obor", value: 3 },
      { label: "Lilin", value: 2 },
      { label: "Listrik", value: 1 },
    ],
  },
  {
    nama: "Jumlah keluarga",
    options: [
      { label: ">8 Org", value: 5 },
      { label: "6 – 7 Org", value: 4 },
      { label: "3 – 5 Org", value: 3 },
      { label: "1 – 2 Org", value: 2 },
    ],
  },
  {
    nama: "Pekerjaan",
    options: [
      { label: "Tidak bekerja", value: 5 },
      { label: "Petani /buruh", value: 4 },
      { label: "Pedagang", value: 3 },
      { label: "Wiraswasta", value: 2 },
    ],
  },
  {
    nama: "Pendidikan",
    options: [
      { label: "Tidak tamat SD", value: 5 },
      { label: "SD", value: 4 },
      { label: "SMP", value: 3 },
      { label: "SMA", value: 2 },
      { label: "Sarjana", value: 1 },
    ],
  },
  {
    nama: "Akses kesehatan",
    options: [
      { label: "Tidak Terpenuhi", value: 4 },
      { label: "Terpenuhi", value: 2 },
    ],
  },
];



