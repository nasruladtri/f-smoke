"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Language = "id" | "en";

const DICTIONARY: Record<Language, Record<string, string>> = {
  id: {
    home: "HOME",
    task: "TASK",
    checkin: "CHECK-IN",
    inventory: "KANTONG",
    setting: "SETTING",

    topbar_player: "PLAYER",
    topbar_logout: "KELUAR",

    home_subtitle: "Berhenti merokok adalah petualanganmu.",
    home_status: "STATUS PLAYER",
    home_level: "LEVEL",
    home_streak: "STREAK (HARI)",
    home_free_days: "Bebas rokok selama {days} hari berturut-turut!",

    tasks_title: "MISSION",
    tasks_subtitle: "Selesaikan misi, kumpulkan XP.",
    tasks_daily: "TASK HARIAN: CHECK-IN",
    tasks_daily_reward: "Hadiah: +25 XP & 1 item acak",
    tasks_done: "SELESAI",
    tasks_notdone: "BELUM",
    tasks_streak: "Streak check-in: {n} hari",
    tasks_mission: "MISI PENYELAMATAN",
    tasks_left: "LAGI",
    tasks_complete: "MISI SELESAI!",
    remaining_days: "Sisa {d} hari {h} jam",
    remaining_hours: "Sisa {h} jam {m} mnt",
    remaining_minutes: "Sisa {m} menit",

    checkin_title: "CHECK-IN HARIAN",
    checkin_subtitle: "Buktikan tekadmu hari ini.",
    checkin_done: "SUDAH CHECK-IN!",
    checkin_ready: "SIAP CHECK-IN?",
    checkin_streak: "Streak: {n} hari berturut-turut",
    checkin_xp: "+25",
    checkin_item: "1 ITEM ACAK",
    checkin_btn_done: "BESOK LAGI YA!",
    checkin_btn: "CHECK-IN SEKARANG",
    checkin_hint: "Tahan 3 detik — cukup untuk satu napas dalam.",

    inv_title: "KANTONG",
    inv_subtitle: "Harta karun pejuang bebas asap.",
    inv_total: "JUMLAH ITEM",
    inv_collection: "Koleksi: {a}/{b} item",
    inv_empty_title: "KANTONG KOSONG",
    inv_empty_text: "Dapatkan item dari check-in harian & kenaikan level!",
    inv_owned: "DIMILIKI: x{n}",
    rarity_common: "UMUM",
    rarity_uncommon: "LANGKA",
    rarity_rare: "EPIK",
    rarity_epic: "LEGENDA",
    rarity_legendary: "MITOS",

    toast_item: "ITEM DIDAPAT!",
    toast_error: "GAGAL SIMPAN",

    sos_title: "TENANG, KAMU BISA!",
    sos_text: "Ikuti napas berikut, craving hanya lewat sebentar.",
    sos_inhale: "TARIK NAPAS...",
    sos_exhale: "HEMBUSKAN...",
    sos_close: "Aku kuat, tutup",

    tt_title: "WAKTU BEBAS ROKOK",
    tt_day: "HARI",
    tt_hour: "JAM",
    tt_minute: "MENIT",
    tt_second: "DETIK",
    tt_since: "Berhenti sejak {date}",
    tt_empty:
      "Kamu belum mencatat waktu berhenti. Atur tanggal & jam di bawah, lalu mulai hitung!",
    tt_label: "TANGGAL & WAKTU BERHENTI",
    tt_update: "Perbarui",
    tt_start: "Mulai",
    tt_reset: "Reset",
    tt_reset_title: "RESET WAKTU BERHENTI?",
    tt_reset_text:
      "Progres waktu bebas rokok akan dihitung ulang dari nol.",

    sav_title: "PENGHEMATAN",
    sav_money: "UANG DIHEMAT",
    sav_sticks: "BATANG TIDAK DIISAP",
    sav_price: "HARGA PER BUNGKUS (RP)",
    sav_cigs: "BATANG YANG DIISAP PER HARI",
    sav_note:
      "Pengaturan tersimpan otomatis. Estimasi asumsi {n} batang per bungkus, mengikuti waktu di tracker.",

    loading: "MEMUAT DUNIA GAME...",

    login_welcome: "Selamat datang kembali!",
    login_start: "Mulai petualanganmu!",
    login_login: "Masuk",
    login_register: "Daftar",
    login_email: "EMAIL",
    login_password: "PASSWORD",
    login_confirm: "KONFIRMASI PASSWORD",
    login_wait: "Tunggu...",
    login_error_confirm: "Konfirmasi password tidak cocok.",
    login_error_invalid: "Email atau password salah.",
    login_success:
      "Akun berhasil dibuat. Cek email kamu untuk konfirmasi, lalu login.",
    login_game_summary:
      "F-Smoke adalah game berhenti merokok: kumpulkan XP dari waktu bebas rokok, selesaikan misi penyelamatan, dan kumpulkan item langka setiap hari.",
    logout: "KELUAR",
    logout_hint: "Keluar dari akun kamu.",
    logout_confirm_title: "KELUAR DARI GAME?",
    logout_confirm_text: "Progresmu tetap tersimpan di cloud.",

    set_title: "PENGATURAN",
    set_subtitle: "Atur pengalaman bermainmu.",
    set_music: "MUSIK",
    set_music_desc: "Nyalakan tema musik game.",
    set_language: "BAHASA",
    set_lang_desc: "Pilih bahasa tampilan.",
    set_username: "USERNAME",
    set_username_desc: "Nama yang tampil di game.",
    set_username_placeholder: "Masukkan username",
    set_save: "SIMPAN",
    set_saved: "Tersimpan!",
    set_failed: "Gagal menyimpan.",
    on: "NYALA",
    off: "MATI",

    item_coin_name: "Koin Emas",
    item_coin_desc:
      "Koin kuno dari negeri jamur. Simbol dari setiap hari bebas rokok.",
    item_fire_flower_name: "Bunga Api",
    item_fire_flower_desc: "Beri kamu semangat membara melawan craving.",
    item_mushroom_1up_name: "Jamur 1UP",
    item_mushroom_1up_desc:
      "Hidup sehat adalah nyawa kedua. Lanjutkan!",
    item_pipe_name: "Pipa Hijau",
    item_pipe_desc: "Jalan pintas ke gaya hidup bebas asap.",
    item_question_block_name: "? Block",
    item_question_block_desc:
      "Kejutan selalu datang bagi yang bertahan.",
    item_star_name: "Bintang Ajaib",
    item_star_desc: "Tak terkalahkan hari ini. Kuatkan tekadmu!",
    item_golden_key_name: "Kunci Emas",
    item_golden_key_desc:
      "Membuka pintu menuju versi dirimu yang lebih sehat.",
    item_heart_name: "Hati Kesehatan",
    item_heart_desc:
      "Jantungmu berterima kasih atas setiap napas bersih.",
    item_super_mushroom_name: "Jamur Super",
    item_super_mushroom_desc:
      "Legenda para pemenang perjuangan melawan rokok.",
    item_crown_name: "Mahkota Emas",
    item_crown_desc:
      "Hanya dimiliki oleh Raja & Ratu yang bebas rokok.",
  },
  en: {
    home: "HOME",
    task: "TASK",
    checkin: "CHECK-IN",
    inventory: "BAG",
    setting: "SETTINGS",

    topbar_player: "PLAYER",
    topbar_logout: "LOGOUT",

    home_subtitle: "Quitting smoking is your adventure.",
    home_status: "PLAYER STATUS",
    home_level: "LEVEL",
    home_streak: "STREAK (DAYS)",
    home_free_days: "Smoke-free for {days} days in a row!",

    tasks_title: "MISSION",
    tasks_subtitle: "Complete missions, earn XP.",
    tasks_daily: "DAILY TASK: CHECK-IN",
    tasks_daily_reward: "Reward: +25 XP & 1 random item",
    tasks_done: "DONE",
    tasks_notdone: "PENDING",
    tasks_streak: "Check-in streak: {n} days",
    tasks_mission: "QUIT MISSIONS",
    tasks_left: "SOON",
    tasks_complete: "MISSION COMPLETE!",
    remaining_days: "{d}d {h}h left",
    remaining_hours: "{h}h {m}m left",
    remaining_minutes: "{m} minutes left",

    checkin_title: "DAILY CHECK-IN",
    checkin_subtitle: "Prove your determination today.",
    checkin_done: "CHECKED IN!",
    checkin_ready: "READY TO CHECK IN?",
    checkin_streak: "Streak: {n} days in a row",
    checkin_xp: "+25",
    checkin_item: "1 RANDOM ITEM",
    checkin_btn_done: "SEE YOU TOMORROW!",
    checkin_btn: "CHECK IN NOW",
    checkin_hint: "Hold 3 seconds — enough for one deep breath.",

    inv_title: "BAG",
    inv_subtitle: "Treasures of the smoke-free warrior.",
    inv_total: "TOTAL ITEMS",
    inv_collection: "Collection: {a}/{b} items",
    inv_empty_title: "EMPTY BAG",
    inv_empty_text: "Get items from daily check-ins & level ups!",
    inv_owned: "OWNED: x{n}",
    rarity_common: "COMMON",
    rarity_uncommon: "UNCOMMON",
    rarity_rare: "RARE",
    rarity_epic: "EPIC",
    rarity_legendary: "LEGENDARY",

    toast_item: "ITEM GOT!",
    toast_error: "SAVE FAILED",

    sos_title: "STAY CALM, YOU GOT THIS!",
    sos_text: "Follow this breathing, cravings pass quickly.",
    sos_inhale: "INHALE...",
    sos_exhale: "EXHALE...",
    sos_close: "I'm strong, close",

    tt_title: "SMOKE-FREE TIME",
    tt_day: "DAYS",
    tt_hour: "HRS",
    tt_minute: "MINS",
    tt_second: "SECS",
    tt_since: "Quit since {date}",
    tt_empty:
      "You haven't set a quit time yet. Set the date & time below to start!",
    tt_label: "QUIT DATE & TIME",
    tt_update: "Update",
    tt_start: "Start",
    tt_reset: "Reset",
    tt_reset_title: "RESET QUIT TIME?",
    tt_reset_text: "Your smoke-free progress will restart from zero.",

    sav_title: "SAVINGS",
    sav_money: "MONEY SAVED",
    sav_sticks: "CIGARETTES AVOIDED",
    sav_price: "PRICE PER PACK (RP)",
    sav_cigs: "CIGARETTES PER DAY",
    sav_note:
      "Settings saved automatically. Estimated using {n} sticks per pack, following tracker time.",

    loading: "LOADING GAME WORLD...",

    login_welcome: "Welcome back!",
    login_start: "Start your adventure!",
    login_login: "Sign in",
    login_register: "Sign up",
    login_email: "EMAIL",
    login_password: "PASSWORD",
    login_confirm: "CONFIRM PASSWORD",
    login_wait: "Wait...",
    login_error_confirm: "Password confirmation does not match.",
    login_error_invalid: "Invalid email or password.",
    login_success:
      "Account created. Check your email to confirm, then sign in.",
    login_game_summary:
      "F-Smoke is a quit-smoking game: earn XP from smoke-free time, complete rescue missions, and collect rare items every day.",
    logout: "LOGOUT",
    logout_hint: "Sign out of your account.",
    logout_confirm_title: "LEAVE GAME?",
    logout_confirm_text: "Your progress is saved in the cloud.",

    set_title: "SETTINGS",
    set_subtitle: "Customize your game experience.",
    set_music: "MUSIC",
    set_music_desc: "Play the game theme music.",
    set_language: "LANGUAGE",
    set_lang_desc: "Choose display language.",
    set_username: "USERNAME",
    set_username_desc: "Name shown in the game.",
    set_username_placeholder: "Enter username",
    set_save: "SAVE",
    set_saved: "Saved!",
    set_failed: "Failed to save.",
    on: "ON",
    off: "OFF",

    item_coin_name: "Gold Coin",
    item_coin_desc:
      "Ancient coin from the mushroom kingdom. A symbol of every smoke-free day.",
    item_fire_flower_name: "Fire Flower",
    item_fire_flower_desc: "Gives you blazing spirit to fight cravings.",
    item_mushroom_1up_name: "1UP Mushroom",
    item_mushroom_1up_desc: "A healthy life is a second life. Keep going!",
    item_pipe_name: "Green Pipe",
    item_pipe_desc: "A shortcut to a smoke-free lifestyle.",
    item_question_block_name: "? Block",
    item_question_block_desc: "Surprises await those who persist.",
    item_star_name: "Magic Star",
    item_star_desc: "Invincible today. Strengthen your resolve!",
    item_golden_key_name: "Golden Key",
    item_golden_key_desc: "Opens the door to a healthier you.",
    item_heart_name: "Health Heart",
    item_heart_desc: "Your heart thanks you for every clean breath.",
    item_super_mushroom_name: "Super Mushroom",
    item_super_mushroom_desc:
      "Legend of champions in the fight against smoking.",
    item_crown_name: "Gold Crown",
    item_crown_desc:
      "Only owned by Kings & Queens who are smoke-free.",
  },
};

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "id",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "id";
    return window.localStorage.getItem("f-smoke.lang") === "en" ? "en" : "id";
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try {
      window.localStorage.setItem("f-smoke.lang", l);
    } catch {
      // ignore storage errors
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let text = DICTIONARY[lang][key] ?? key;
      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          text = text.replaceAll(`{${name}}`, String(value));
        }
      }
      return text;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}