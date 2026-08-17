export const PixelCloud = () => (
  <svg viewBox="0 0 96 40" width="100%" preserveAspectRatio="none" aria-hidden="true">
    <rect x="16" y="8" width="16" height="16" fill="#fff" />
    <rect x="32" y="0" width="32" height="24" fill="#fff" />
    <rect x="64" y="8" width="16" height="16" fill="#fff" />
    <rect x="0" y="24" width="96" height="16" fill="#fff" />
    <rect x="0" y="32" width="96" height="8" fill="#cfe8ff" />
  </svg>
);

export const PixelBush = () => (
  <svg viewBox="0 0 96 40" width="100%" preserveAspectRatio="none" aria-hidden="true">
    <rect x="8" y="16" width="28" height="16" fill="#3fae3f" />
    <rect x="34" y="8" width="28" height="24" fill="#3fae3f" />
    <rect x="60" y="16" width="28" height="16" fill="#3fae3f" />
    <rect x="0" y="32" width="96" height="8" fill="#2b8a2b" />
  </svg>
);

export const PixelHill = () => (
  <svg viewBox="0 0 128 64" width="100%" preserveAspectRatio="none" aria-hidden="true">
    <rect x="16" y="48" width="96" height="16" fill="#2f9f2f" />
    <rect x="32" y="32" width="64" height="16" fill="#2f9f2f" />
    <rect x="48" y="16" width="32" height="16" fill="#2f9f2f" />
    <rect x="64" y="48" width="48" height="16" fill="#217521" />
    <rect x="48" y="32" width="32" height="16" fill="#217521" />
    <rect x="64" y="16" width="16" height="16" fill="#217521" />
  </svg>
);

export const PixelCoin = () => (
  <svg viewBox="0 0 32 32" width="100%" aria-hidden="true">
    <circle cx="16" cy="16" r="13" fill="#ffd700" stroke="#000" strokeWidth="3" />
    <rect x="8" y="7" width="9" height="4" fill="#fff4c2" />
  </svg>
);

export const PixelQuestionBlock = () => (
  <svg viewBox="0 0 48 48" width="100%" aria-hidden="true">
    <rect width="48" height="48" fill="#ffb700" stroke="#7a4a00" strokeWidth="6" />
    <text
      x="24"
      y="36"
      textAnchor="middle"
      fontFamily="var(--font-pixel)"
      fontSize="28"
      fill="#7a4a00"
    >
      ?
    </text>
  </svg>
);

export const PixelStar = () => (
  <svg viewBox="0 0 32 32" width="100%" aria-hidden="true">
    <path
      d="M16 2l3.5 8.2 8.5 1-6.3 6 1.6 8.8-7.3-4.3-7.3 4.3 1.6-8.8-6.3-6 8.5-1z"
      fill="#ffd700"
      stroke="#000"
      strokeWidth="2.5"
    />
  </svg>
);

export const PixelMushroom = () => (
  <svg viewBox="0 0 32 40" width="100%" aria-hidden="true">
    <path d="M4 20a12 12 0 0 1 24 0z" fill="#e52521" stroke="#000" strokeWidth="2.5" />
    <circle cx="11" cy="14" r="3.5" fill="#fff" stroke="#000" strokeWidth="2" />
    <circle cx="21" cy="12" r="3" fill="#fff" stroke="#000" strokeWidth="2" />
    <rect x="12" y="20" width="8" height="14" fill="#fff3d6" stroke="#000" strokeWidth="2.5" />
    <rect x="14" y="26" width="4" height="3" fill="#3d3d3d" />
  </svg>
);

export default function RetroBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <div
          className="cloud absolute top-8 left-0 w-32 opacity-90"
          style={{ animationDuration: "70s", animationDelay: "-20s" }}
        >
          <PixelCloud />
        </div>
        <div
          className="cloud absolute top-44 left-0 w-24 opacity-80"
          style={{ animationDuration: "55s", animationDelay: "-5s" }}
        >
          <PixelCloud />
        </div>
        <div
          className="cloud absolute top-24 left-0 w-28 opacity-70"
          style={{ animationDuration: "90s", animationDelay: "-40s" }}
        >
          <PixelCloud />
        </div>
        <div
          className="cloud absolute top-64 left-0 w-20 opacity-60"
          style={{ animationDuration: "80s", animationDelay: "-55s" }}
        >
          <PixelCloud />
        </div>

        <div className="absolute top-[22%] left-[10%] w-10 hidden md:block">
          <PixelCoin />
        </div>
        <div className="absolute top-[30%] left-[48%] w-10 hidden md:block coin-anim">
          <PixelCoin />
        </div>
        <div className="absolute top-[55%] right-[14%] w-10 hidden md:block">
          <PixelCoin />
        </div>
        <div className="absolute top-[72%] left-[4%] w-10 hidden md:block coin-anim">
          <PixelCoin />
        </div>
        <div className="absolute top-[80%] right-[4%] w-10 hidden md:block">
          <PixelCoin />
        </div>

        <div className="absolute top-[38%] right-[6%] w-12 hidden md:block">
          <PixelQuestionBlock />
        </div>
        <div className="absolute top-[62%] left-[30%] w-12 hidden md:block">
          <PixelQuestionBlock />
        </div>
        <div className="absolute top-[28%] right-[38%] w-10 hidden lg:block">
          <PixelStar />
        </div>
        <div className="absolute top-[68%] right-[26%] w-10 hidden lg:block coin-anim">
          <PixelStar />
        </div>
        <div className="absolute top-[18%] right-[22%] w-12 hidden lg:block">
          <PixelMushroom />
        </div>

        <div className="absolute bottom-16 left-[8%] w-32">
          <PixelBush />
        </div>
        <div className="absolute bottom-12 right-[10%] w-36">
          <PixelBush />
        </div>
        <div className="absolute bottom-8 left-[45%] w-28">
          <PixelBush />
        </div>
        <div className="absolute bottom-0 left-[22%] w-44">
          <PixelHill />
        </div>
        <div className="absolute bottom-0 right-[30%] w-32">
          <PixelHill />
        </div>
        <div className="absolute bottom-0 left-[60%] w-36">
          <PixelHill />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="fixed bottom-0 inset-x-0 z-0 h-8 pointer-events-none"
      >
        <div className="h-4 bg-mario-green border-t-4 border-black" />
        <div className="h-4 ground-pattern" />
      </div>
    </>
  );
}
