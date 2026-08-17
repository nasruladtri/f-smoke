export interface Milestone {
  label: string;
  minutes: number;
  xp: number;
  description: string;
}

export const CIGS_PER_PACK = 20;

export const MILESTONES: Milestone[] = [
  { label: "20 Menit", minutes: 20, xp: 5, description: "Tekanan darah & detak jantung kembali normal" },
  { label: "8 Jam", minutes: 8 * 60, xp: 10, description: "Kadar karbon monoksida dalam darah turun drastis" },
  { label: "12 Jam", minutes: 12 * 60, xp: 15, description: "Kadar oksigen dalam darah kembali normal" },
  { label: "1 Hari", minutes: 24 * 60, xp: 25, description: "Risiko serangan jantung mulai menurun" },
  { label: "2 Hari", minutes: 2 * 24 * 60, xp: 35, description: "Indra perasa & penciuman mulai pulih" },
  { label: "3 Hari", minutes: 3 * 24 * 60, xp: 50, description: "Nikotin bersih dari tubuh Anda" },
  { label: "2 Minggu", minutes: 14 * 24 * 60, xp: 75, description: "Fungsi paru-paru membaik, napas lebih lega" },
  { label: "1 Bulan", minutes: 30 * 24 * 60, xp: 100, description: "Stamina meningkat, batuk & sesak berkurang" },
  { label: "3 Bulan", minutes: 90 * 24 * 60, xp: 150, description: "Sirkulasi darah lancar, paru-paru makin sehat" },
  { label: "1 Tahun", minutes: 365 * 24 * 60, xp: 250, description: "Risiko penyakit jantung turun hingga 50%" },
];

export const MILESTONES_EN: Milestone[] = [
  { label: "20 Minutes", minutes: 20, xp: 5, description: "Blood pressure & heart rate return to normal" },
  { label: "8 Hours", minutes: 8 * 60, xp: 10, description: "Carbon monoxide level in blood drops sharply" },
  { label: "12 Hours", minutes: 12 * 60, xp: 15, description: "Oxygen level in blood returns to normal" },
  { label: "1 Day", minutes: 24 * 60, xp: 25, description: "Heart attack risk starts to decrease" },
  { label: "2 Days", minutes: 2 * 24 * 60, xp: 35, description: "Taste & smell senses start to recover" },
  { label: "3 Days", minutes: 3 * 24 * 60, xp: 50, description: "Nicotine is cleared from your body" },
  { label: "2 Weeks", minutes: 14 * 24 * 60, xp: 75, description: "Lung function improves, easier breathing" },
  { label: "1 Month", minutes: 30 * 24 * 60, xp: 100, description: "Better stamina, less coughing & wheezing" },
  { label: "3 Months", minutes: 90 * 24 * 60, xp: 150, description: "Blood circulation improves, healthier lungs" },
  { label: "1 Year", minutes: 365 * 24 * 60, xp: 250, description: "Heart disease risk drops by 50%" },
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

export const QUOTES_EN: string[] = [
  "Every clean breath is a small victory. Breathe deep — you're stronger than that craving.",
  "Cravings only last 3–5 minutes. Just hold on until the wave passes.",
  "One more cigarette won't calm you — one deep breath will.",
  "The money you save today is a gift to your future self.",
  "You've quit before, and you'll quit again. This is just a small test.",
  "Your lungs are thanking you. Don't waste their effort.",
  "Cravings come like waves: strong for a moment, then they recede. Don't fight them, let them pass.",
  "You're not a smoker quitting. You are someone already free.",
];