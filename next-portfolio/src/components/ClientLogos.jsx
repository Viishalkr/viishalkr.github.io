import SanityImage from "./SanityImage";

// Strip of client and collaborator logos. Hidden until clients are added
// in Site Settings. Clients without a logo are shown as their name.
export default function ClientLogos({ clients = [] }) {
  if (clients.length === 0) return null;

  return (
    <section aria-label="Clients and collaborators" className="bg-[#F9F9F9] px-6 md:px-12 py-14 border-t border-zinc-200 relative z-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-8 text-center">
          Trusted by
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-16">
          {clients.map((c) => (
            <li key={c._key} className="flex items-center">
              {c.logo ? (
                <SanityImage
                  src={c.logo}
                  alt={c.name}
                  width={c.width || 240}
                  height={c.height || 80}
                  sizes="160px"
                  className="h-8 md:h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <span className="text-sm md:text-base font-black tracking-widest uppercase text-zinc-400">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
