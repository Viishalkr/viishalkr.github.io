// Services with starting prices. Hidden until services are added in Site Settings.
export default function Services({ services = [] }) {
  if (services.length === 0) return null;

  return (
    <section
      id="services"
      className="bg-black text-white py-24 md:py-32 px-6 md:px-12 relative z-20 scroll-mt-16 selection:bg-white selection:text-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-6">{"// SERVICES"}</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              What I can<br />do for you.
            </h2>
          </div>
          <p className="text-zinc-400 font-medium max-w-sm">
            Starting prices for typical projects. Every brief is different, so send yours for an exact quote.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden">
          {services.map((s) => (
            <article key={s._key} className="bg-black p-8 md:p-10 flex flex-col gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase mb-3">{s.title}</h3>
                {s.description && <p className="text-zinc-400 leading-relaxed">{s.description}</p>}
              </div>

              {s.includes?.length > 0 && (
                <ul className="space-y-2 text-sm text-zinc-300">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="text-zinc-600">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-6 border-t border-zinc-800 flex items-center justify-between gap-4">
                <p className="text-xs font-bold tracking-widest uppercase">
                  {s.priceFrom ? (
                    <>
                      <span className="text-zinc-500">From </span>
                      <span className="text-white text-base">{s.priceFrom}</span>
                    </>
                  ) : (
                    <span className="text-zinc-500">Price on request</span>
                  )}
                </p>
                <a
                  href="#contact"
                  data-enquire={s.title}
                  className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  Enquire →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
