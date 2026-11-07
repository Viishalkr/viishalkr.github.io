import Link from "next/link";
import SanityImage from "../../../components/SanityImage";
import { notFound } from "next/navigation";
import { sanityFetch } from "../../../sanity/lib/fetch";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "../../../sanity/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch(PROJECT_SLUGS_QUERY);
    return (slugs ?? []).map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
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

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const details = [
    { label: "Category", value: project.category },
    project.client && { label: "Client", value: project.client },
    project.role && { label: "Role", value: project.role },
    project.year && { label: "Year", value: project.year },
  ].filter(Boolean);

  return (
    <article className="bg-[#F9F9F9] text-black min-h-screen pt-32 pb-24 selection:bg-black selection:text-white overflow-hidden">
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

        {(project.objective || project.engineering) && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
            {project.objective && (
              <div className="md:col-span-5">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-6">01 // The Brief</h2>
                <h3 className="text-3xl font-black tracking-tighter uppercase mb-6">What it needed.</h3>
                <p className="text-zinc-600 leading-relaxed font-medium whitespace-pre-line">{project.objective}</p>
              </div>
            )}

            <div className="hidden md:block md:col-span-2"></div>

            {project.engineering && (
              <div className="md:col-span-5 mt-12 md:mt-0">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-6">
                  {`${project.objective ? "02" : "01"} // The Process`}
                </h2>
                <h3 className="text-3xl font-black tracking-tighter uppercase mb-6">How it was made.</h3>
                <p className="text-zinc-600 leading-relaxed font-medium whitespace-pre-line">{project.engineering}</p>
              </div>
            )}
          </div>
        )}

        <div className="border-t border-black pt-16 pb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Have a project in mind?</h2>
            <p className="text-zinc-500 mt-2 font-medium">Let&apos;s make something together.</p>
          </div>
          <a
            href="mailto:kumarvishal1627@gmail.com?subject=Project Inquiry via Case Study"
            className="bg-black text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
          >
            Get in Touch →
          </a>
        </div>

      </div>
    </article>
  );
}
