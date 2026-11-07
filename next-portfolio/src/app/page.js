import Hero from "../components/Hero";
import Showreel from "../components/Showreel";
import ClientLogos from "../components/ClientLogos";
import PortfolioGrid from "../components/PortfolioGrid";
import Services from "../components/Services";
import Process from "../components/Process";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { sanityFetch } from "../sanity/lib/fetch";
import { PROJECTS_QUERY, TESTIMONIALS_QUERY, SETTINGS_QUERY } from "../sanity/lib/queries";
import { resolveSettings } from "../lib/site";

export const revalidate = 60;

async function safeFetch(query, fallback) {
  try {
    return (await sanityFetch(query)) ?? fallback;
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    return fallback;
  }
}

export default async function Home() {
  const [projects, testimonials, rawSettings] = await Promise.all([
    safeFetch(PROJECTS_QUERY, []),
    safeFetch(TESTIMONIALS_QUERY, []),
    safeFetch(SETTINGS_QUERY, null),
  ]);
  const settings = resolveSettings(rawSettings);

  return (
    <div className="bg-[#F9F9F9]">
      <Hero tagline={settings.heroTagline} />
      {settings.showreelUrl && (
        <Showreel src={settings.showreelUrl} poster={settings.showreelPoster} />
      )}
      <ClientLogos clients={settings.clients} />
      <PortfolioGrid projects={projects} />
      <Services services={settings.services} />
      <Process steps={settings.processSteps} />
      <About />
      <Testimonials testimonials={testimonials} />
      <Contact
        email={settings.email}
        whatsappNumber={settings.whatsappNumber}
        calendlyUrl={settings.calendlyUrl}
        services={settings.services}
      />
      <Footer whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
