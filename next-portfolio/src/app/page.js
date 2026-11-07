import Hero from "../components/Hero";
import PortfolioGrid from "../components/PortfolioGrid";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { sanityFetch } from "../sanity/lib/fetch";
import { PROJECTS_QUERY, TESTIMONIALS_QUERY } from "../sanity/lib/queries";

export const revalidate = 60;

async function safeFetch(query) {
  try {
    return (await sanityFetch(query)) ?? [];
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    return [];
  }
}

export default async function Home() {
  const [projects, testimonials] = await Promise.all([
    safeFetch(PROJECTS_QUERY),
    safeFetch(TESTIMONIALS_QUERY),
  ]);

  return (
    <div className="bg-[#F9F9F9]">
      <Hero />
      <PortfolioGrid projects={projects} />
      <About />
      <Testimonials testimonials={testimonials} />
      <Footer />
    </div>
  );
}
