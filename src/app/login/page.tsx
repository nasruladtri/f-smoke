"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (mode === "register" && password !== confirm) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(
            signInError.message.includes("Invalid login credentials")
              ? "Email atau password salah."
              : signInError.message
          );
          return;
        }
        router.push("/");
        router.refresh();
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        setInfo(
          "Akun berhasil dibuat. Cek email kamu untuk konfirmasi, lalu login."
        );
        setMode("login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 items-center px-4 py-10">
      <div className="w-full bg-[#fffdf5] p-6 text-black pixel-frame pixel-shadow sm:p-8">
        <h1 className="text-center font-pixel text-sm text-mario-red [text-shadow:2px_2px_0_#000] sm:text-base">
          F-SMOKE
        </h1>
        <p className="mt-2 text-center font-retro text-xl text-black/60">
          {mode === "login" ? "Selamat datang kembali!" : "Mulai petualanganmu!"}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {(["login", "register"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError(null);
                setInfo(null);
              }}
              className={`pixel-btn w-full ${
                mode === m
                  ? "bg-mario-blue text-white"
                  : "bg-slate-200 text-black"
              }`}
            >
              {m === "login" ? "Masuk" : "Daftar"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block font-pixel text-[9px] text-black"
            >
              EMAIL
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full bg-white px-3 py-3 font-retro text-xl text-black pixel-frame focus:bg-mario-yellow/20 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="block font-pixel text-[9px] text-black"
            >
              PASSWORD
            </label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full bg-white px-3 py-3 font-retro text-xl text-black pixel-frame focus:bg-mario-yellow/20 outline-none"
            />
          </div>
          {mode === "register" && (
            <div>
              <label
                htmlFor="login-confirm"
                className="block font-pixel text-[9px] text-black"
              >
                KONFIRMASI PASSWORD
              </label>
              <input
                id="login-confirm"
                type="password"
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-2 w-full bg-white px-3 py-3 font-retro text-xl text-black pixel-frame focus:bg-mario-yellow/20 outline-none"
              />
            </div>
          )}

          {error && (
            <p className="bg-mario-red/10 px-3 py-2 font-retro text-lg text-mario-red pixel-frame">
              {error}
            </p>
          )}
          {info && (
            <p className="bg-mario-green/10 px-3 py-2 font-retro text-lg text-mario-green pixel-frame">
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="pixel-btn w-full bg-mario-green text-white disabled:opacity-50"
          >
            {loading ? "Tunggu..." : mode === "login" ? "Masuk" : "Daftar"}
          </button>
        </form>
      </div>
    </main>
  );
}