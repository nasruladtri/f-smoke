import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/sfx");
mkdirSync(outDir, { recursive: true });

const SAMPLE_RATE = 22050;

function wav(samples) {
  const data = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) {
    const v = Math.max(-1, Math.min(1, samples[i]));
    data.writeInt16LE(Math.round(v * 32767), i * 2);
  }
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(data.length, 40);
  return Buffer.concat([header, data]);
}

function note(freq, ms, volume = 0.4) {
  const n = Math.floor((SAMPLE_RATE * ms) / 1000);
  const out = new Float32Array(n);
  const attack = Math.floor(SAMPLE_RATE * 0.01);
  const decay = Math.floor(SAMPLE_RATE * 0.08);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const phase = (freq * t) % 1;
    const square = phase < 0.5 ? 1 : -1;
    let env = 1;
    if (i < attack) env = i / attack;
    else if (i > n - decay) env = Math.max(0, (n - i) / decay);
    out[i] = square * volume * env;
  }
  return out;
}

function concat(...notes) {
  const total = notes.reduce((s, n) => s + n.length, 0);
  const out = new Float32Array(total);
  let off = 0;
  for (const n of notes) {
    out.set(n, off);
    off += n.length;
  }
  return out;
}

const C5 = 523.25;
const E5 = 659.25;
const G5 = 783.99;
const C6 = 1046.5;
const B5 = 987.77;
const E6 = 1318.5;
const G6 = 1567.98;

const sfx = {
  checkin: concat(note(C5, 110), note(E5, 160)),
  levelup: concat(note(C5, 100), note(E5, 100), note(G5, 100), note(C6, 220)),
  item: concat(note(B5, 70), note(E6, 130)),
  sell: concat(note(E6, 90), note(G5, 90), note(C5, 150)),
  buy: concat(note(G6, 60), note(C6, 120)),
};

for (const [name, samples] of Object.entries(sfx)) {
  writeFileSync(join(outDir, `${name}.wav`), wav(samples));
  console.log("generated", name, samples.length / SAMPLE_RATE, "s");
}