import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-4">404</p>
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-black">Page Not Found</h1>
      <Link href="/" className="text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-black">
        ← Return Home
      </Link>
    </div>
  );
}
