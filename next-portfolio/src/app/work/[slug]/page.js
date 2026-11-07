import Link from "next/link";
import SanityImage from "../../../components/SanityImage";
import { notFound } from "next/navigation";
import { sanityFetch } from "../../../sanity/lib/fetch";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "../../../sanity/lib/queries";

export const revalidate = 60;

async function getAllSlugs() {
  try {
    return (await sanityFetch(PROJECT_SLUGS_QUERY)) ?? [];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

async function getProject(slug) {
  return sanityFetch(PROJECT_QUERY, { slug });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found — Vishal Kumar" };

  const description = project.tagline || `${project.category} project by Vishal Kumar.`;
  return {
    title: `${project.title} — Vishal Kumar`,
    description,
    openGraph: {
      title: project.title,
      description,
      images: project.src ? [{ url: project.src }] : undefined,
    },
  };
}

function Section({ number, kicker, heading, children }) {
  return (
    <div>
      <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-6">
        {`${String(number).padStart(2, "0")} // ${kicker}`}
      </h2>
      <h3 className="text-3xl font-black tracking-tighter uppercase mb-6">{heading}</h3>
      <p className="text-zinc-600 leading-relaxed font-medium whitespace-pre-line">{children}</p>
    </div>
  );
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([getProject(slug), getAllSlugs()]);
  if (!project) notFound();

  const details = [
    { label: "Category", value: project.category },
    project.client && { label: "Client", value: project.client },
    project.role && { label: "Role", value: project.role },
    project.year && { label: "Year", value: project.year },
  ].filter(Boolean);

  const story = [
    project.objective && { kicker: "The Brief", heading: "What it needed.", text: project.objective },
    project.engineering && { kicker: "The Process", heading: "How it was made.", text: project.engineering },
    project.result && { kicker: "The Result", heading: "What it achieved.", text: project.result },
  ].filter(Boolean);

  const gallery = project.gallery ?? [];
  const stats = project.stats ?? [];

  // Next/previous follow the home page order and wrap around.
  const index = allProjects.findIndex((p) => p.slug === slug);
  const hasNeighbours = index !== -1 && allProjects.length > 1;
  const prev = hasNeighbours ? allProjects[(index - 1 + allProjects.length) % allProjects.length] : null;
  const next = hasNeighbours ? allProjects[(index + 1) % allProjects.length] : null;

  return (
    <article className="bg-[#F9F9F9] text-black min-h-screen pt-32 selection:bg-black selection:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 animate-fade-in-up">

        <div className="mb-16 md:mb-24">
          <Link href="/#work" className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-black transition-colors flex items-center gap-2 w-fit">
            <span>←</span> Back to Index
          </Link>
        </div>

        <header className="mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="text-5xl md:text-[6vw] font-black tracking-tighter uppercase leading-[0.85] mb-6 break-words">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="text-xl md:text-2xl text-zinc-500 font-medium tracking-tight">
                {project.tagline}
              </p>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-8 border border-black text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              >
                {project.linkText || "View Project"} ↗
              </a>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-6 lg:gap-8 border-t border-zinc-200 lg:border-t-0 lg:border-l pt-8 lg:pt-0 lg:pl-8">
            {details.map((d) => (
              <div key={d.label}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-1">{d.label}</p>
                <p className="font-bold uppercase tracking-wide">{d.value}</p>
              </div>
            ))}

            {project.software?.length > 0 && (
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-2">Toolkit</p>
                <div className="flex flex-wrap gap-2">
                  {project.software.map((tool) => (
                    <span key={tool} className="text-[10px] font-bold tracking-widest uppercase border border-zinc-300 px-3 py-1 rounded-full text-zinc-600">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

      </div>

      {/* Main media */}
      <div className="w-full bg-zinc-100 relative mb-24 md:mb-32 animate-fade-in-up flex items-center justify-center py-8 md:py-16 px-4 md:px-12" style={{ animationDelay: "0.2s" }}>
        {project.category === "VIDEO" && project.videoUrl ? (
          <video
            src={project.videoUrl}
            poster={project.src || undefined}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto max-h-[85vh] object-contain rounded-md shadow-2xl bg-black"
          />
        ) : project.src ? (
          <SanityImage
            src={project.src}
            alt={project.title}
            width={project.width || 1600}
            height={project.height || 1200}
            sizes="100vw"
            preload
            placeholder={project.lqip ? "blur" : "empty"}
            blurDataURL={project.lqip || undefined}
            className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
          />
        ) : null}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>

        {/* Brief / Process / Result */}
        {story.length > 0 && (
          <div className={`grid grid-cols-1 gap-12 md:gap-16 mb-24 md:mb-32 ${story.length === 3 ? "md:grid-cols-3" : story.length === 2 ? "md:grid-cols-2" : ""}`}>
            {story.map((s, i) => (
              <Section key={s.kicker} number={i + 1} kicker={s.kicker} heading={s.heading}>
                {s.text}
              </Section>
            ))}
          </div>
        )}

        {/* Headline numbers */}
        {stats.length > 0 && (
          <dl className={`grid grid-cols-2 ${stats.length >= 3 ? "md:grid-cols-4" : ""} gap-8 border-y border-zinc-200 py-12 mb-24 md:mb-32`}>
            {stats.map((s) => (
              <div key={s._key}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-5xl md:text-6xl font-black tracking-tighter">{s.value}</span>
                  <span className="block mt-2 text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section aria-label="Project gallery" className="max-w-7xl mx-auto px-4 md:px-12 mb-24 md:mb-32">
          <div className="columns-1 sm:columns-2 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {gallery.map((img) => (
              <figure key={img._key} className="break-inside-avoid">
                <SanityImage
                  src={img.src}
                  alt={img.alt || img.caption || `${project.title} — gallery image`}
                  width={img.width || 1600}
                  height={img.height || 1200}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  placeholder={img.lqip ? "blur" : "empty"}
                  blurDataURL={img.lqip || undefined}
                  className="w-full h-auto rounded-xl bg-zinc-100"
                />
                {img.caption && (
                  <figcaption className="mt-2 text-xs font-medium text-zinc-500">{img.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Call to action */}
        <div className="border-t border-black pt-16 pb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Have a project in mind?</h2>
            <p className="text-zinc-500 mt-2 font-medium">Let&apos;s make something together.</p>
          </div>
          <Link
            href="/#contact"
            className="bg-black text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
          >
            Start a Project →
          </Link>
        </div>
      </div>

      {/* Previous / next */}
      {hasNeighbours && (
        <nav aria-label="More projects" className="grid grid-cols-2 border-t border-zinc-200 bg-white">
          <Link
            href={`/work/${prev.slug}`}
            className="group px-6 md:px-12 py-10 md:py-14 border-r border-zinc-200 hover:bg-black hover:text-white transition-colors"
          >
            <span className="block text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-zinc-400 mb-3">← Previous</span>
            <span className="block text-lg md:text-3xl font-black tracking-tighter uppercase leading-tight break-words">{prev.title}</span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group px-6 md:px-12 py-10 md:py-14 text-right hover:bg-black hover:text-white transition-colors"
          >
            <span className="block text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-zinc-400 mb-3">Next →</span>
            <span className="block text-lg md:text-3xl font-black tracking-tighter uppercase leading-tight break-words">{next.title}</span>
          </Link>
        </nav>
      )}
    </article>
  );
}
