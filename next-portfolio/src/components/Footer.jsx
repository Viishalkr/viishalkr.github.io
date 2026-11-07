const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/viishal.kr" },
  { label: "Behance", href: "https://www.behance.net/vishalkumar240" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vishal-kumar-3a81271a1" },
  { label: "GitHub", href: "https://github.com/Viishalkr" },
];

export default function Footer({ whatsappNumber }) {
  const links = whatsappNumber
    ? [...SOCIALS, { label: "WhatsApp", href: `https://wa.me/${whatsappNumber}` }]
    : SOCIALS;

  return (
    <footer className="bg-black text-white px-6 md:px-12 py-10 relative z-20 border-t border-zinc-900 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-xs font-bold tracking-widest uppercase text-zinc-400">
        <nav aria-label="Social links" className="flex flex-wrap gap-x-8 gap-y-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="text-zinc-600">
          © 2026 VISHAL KUMAR · OPEN FOR COMMISSIONS
        </div>
      </div>
    </footer>
  );
}
