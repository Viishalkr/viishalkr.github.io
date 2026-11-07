// "How I work" steps. Hidden until steps are added in Site Settings.
export default function Process({ steps = [] }) {
  if (steps.length === 0) return null;

  return (
    <section
      id="process"
      className="bg-white text-black py-24 md:py-32 px-6 md:px-12 relative z-20 border-t border-zinc-200 scroll-mt-16 selection:bg-black selection:text-white"
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-6">{"// HOW I WORK"}</p>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-14 md:mb-20">
          From brief<br />to final frame.
        </h2>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step._key} className="border-t border-black pt-6">
              <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 mb-4">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-xl font-black tracking-tight uppercase mb-3">{step.title}</h3>
              {step.description && <p className="text-zinc-600 leading-relaxed mb-4">{step.description}</p>}
              {step.duration && (
                <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 border border-zinc-300 rounded-full px-3 py-1 w-fit">
                  {step.duration}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
