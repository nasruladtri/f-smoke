export interface Milestone {
  label: string;
  minutes: number;
  description: string;
}

export const MILESTONES: Milestone[] = [
  { label: "20 Menit", minutes: 20, description: "Tekanan darah & detak jantung kembali normal" },
  { label: "8 Jam", minutes: 8 * 60, description: "Kadar karbon monoksida dalam darah turun drastis" },
  { label: "12 Jam", minutes: 12 * 60, description: "Kadar oksigen dalam darah kembali normal" },
  { label: "1 Hari", minutes: 24 * 60, description: "Risiko serangan jantung mulai menurun" },
  { label: "2 Hari", minutes: 2 * 24 * 60, description: "Indra perasa & penciuman mulai pulih" },
  { label: "3 Hari", minutes: 3 * 24 * 60, description: "Nikotin bersih dari tubuh Anda" },
  { label: "2 Minggu", minutes: 14 * 24 * 60, description: "Fungsi paru-paru membaik, napas lebih lega" },
  { label: "1 Bulan", minutes: 30 * 24 * 60, description: "Stamina meningkat, batuk & sesak berkurang" },
  { label: "3 Bulan", minutes: 90 * 24 * 60, description: "Sirkulasi darah lancar, paru-paru makin sehat" },
  { label: "1 Tahun", minutes: 365 * 24 * 60, description: "Risiko penyakit jantung turun hingga 50%" },
];

export const QUOTES: string[] = [
  "Setiap napas bersih adalah kemenangan kecil. Tarik napas dalam — kamu lebih kuat dari craving itu.",
  "Keinginan merokok hanya bertahan 3–5 menit. Cukup tahan sampai ombaknya berlalu.",
  "Satu batang lagi tidak akan menenangkanmu — satu napas dalam akan.",
  "Uang yang kamu hemat hari ini adalah hadiah untuk dirimu di masa depan.",
  "Kamu sudah berhenti sebelumnya, dan akan berhenti lagi. Ini cuma ujian kecil.",
  "Paru-parumu sedang berterima kasih. Jangan sia-siakan usahanya.",
  "Cravings datang seperti ombak: kuat sebentar, lalu surut. Jangan berenang melawannya, biarkan lewat.",
  "Kamu bukan perokok yang sedang berhenti. Kamu adalah orang yang sudah bebas.",
];