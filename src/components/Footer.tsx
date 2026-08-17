export default function Footer() {
  return (
    <footer className="mt-10 border-t-4 border-black bg-mario-dark pb-24 pt-14">
      <div className="mx-auto w-full max-w-lg px-6 text-center">
        <p className="font-retro text-2xl text-white/70">THANKS FOR PLAYING!</p>
        <p className="mt-1 font-retro text-2xl text-white/50">
          © {new Date().getFullYear()} Nasrul Aditri Rahmandika
        </p>
        <span className="mt-4 inline-block h-8 w-8 rotate-45 border-4 border-black bg-mario-yellow pixel-shadow-sm coin-anim" />
        <div className="mt-10 h-4 w-full ground-pattern border-4 border-black" />
      </div>
    </footer>
  );
}