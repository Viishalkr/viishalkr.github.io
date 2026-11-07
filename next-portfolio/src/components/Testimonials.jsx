// Renders nothing until at least one testimonial is published in Studio.
export default function Testimonials({ testimonials = [] }) {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="bg-[#F9F9F9] text-black py-24 md:py-32 px-6 md:px-12 relative z-20 border-t border-zinc-200 selection:bg-black selection:text-white"
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase mb-12">
          {"// KIND WORDS"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t._id}
              className="bg-white border border-zinc-200 rounded-2xl p-8 flex flex-col justify-between gap-8"
            >
              <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-zinc-800">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-xs font-bold tracking-widest uppercase">
                <span className="block text-black">{t.name}</span>
                {t.role && <span className="block text-zinc-400 mt-1">{t.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
