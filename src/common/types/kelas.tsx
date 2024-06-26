export type KelasRead = {
  id: number;
  pengajar: string;
  jumlah_murid: number;
  status: string;
  programName: string;
  jenisKelasName: string;
  tanggalMulai: string;
  tanggalSelesai: string;
};

export type Kelas = {
  id: number;
  programId: number;
  jenisKelasId: number;
  listJadwalKelas: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  pengajarId: number;
  linkGroup: string;
  linkPlaylist: string;
  listMurid: string;
  level: string;
  platform: string;
  status: string;
};
