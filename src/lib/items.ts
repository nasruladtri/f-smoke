export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface ItemDef {
  id: string;
  name: string;
  rarity: Rarity;
  description: string;
}

export const ITEMS: ItemDef[] = [
  { id: "coin", name: "Koin Emas", rarity: "common", description: "Koin kuno dari negeri jamur. Simbol dari setiap hari bebas rokok." },
  { id: "fire_flower", name: "Bunga Api", rarity: "common", description: "Beri kamu semangat membara melawan craving." },
  { id: "mushroom_1up", name: "Jamur 1UP", rarity: "uncommon", description: "Hidup sehat adalah nyawa kedua. Lanjutkan!" },
  { id: "pipe", name: "Pipa Hijau", rarity: "uncommon", description: "Jalan pintas ke gaya hidup bebas asap." },
  { id: "question_block", name: "? Block", rarity: "rare", description: "Kejutan selalu datang bagi yang bertahan." },
  { id: "star", name: "Bintang Ajaib", rarity: "rare", description: "Tak terkalahkan hari ini. Kuatkan tekadmu!" },
  { id: "golden_key", name: "Kunci Emas", rarity: "epic", description: "Membuka pintu menuju versi dirimu yang lebih sehat." },
  { id: "heart", name: "Hati Kesehatan", rarity: "epic", description: "Jantungmu berterima kasih atas setiap napas bersih." },
  { id: "super_mushroom", name: "Jamur Super", rarity: "legendary", description: "Legenda para pemenang perjuangan melawan rokok." },
  { id: "crown", name: "Mahkota Emas", rarity: "legendary", description: "Hanya dimiliki oleh Raja & Ratu yang bebas rokok." },
];

export const RARITY_ORDER: Rarity[] = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
];

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 45,
  uncommon: 28,
  rare: 16,
  epic: 8,
  legendary: 3,
};

export const SELL_PRICES: Record<Rarity, number> = {
  common: 25,
  uncommon: 50,
  rare: 100,
  epic: 250,
  legendary: 600,
};

export const BUY_COST = 120;

export function rollItem(): ItemDef {
  const entries = Object.entries(RARITY_WEIGHTS) as [Rarity, number][];
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = Math.random() * total;

  for (const [rarity, weight] of entries) {
    if (roll < weight) {
      const pool = ITEMS.filter((item) => item.rarity === rarity);
      return pool[Math.floor(Math.random() * pool.length)];
    }
    roll -= weight;
  }

  return ITEMS[0];
}