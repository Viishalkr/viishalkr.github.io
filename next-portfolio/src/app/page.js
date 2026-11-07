import Hero from "../components/Hero";
import PortfolioGrid from "../components/PortfolioGrid";
import About from "../components/About";
import Footer from "../components/Footer";
import { sanityFetch } from "../sanity/lib/fetch";
import { PROJECTS_QUERY } from "../sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  let projects = [];
  try {
    projects = await sanityFetch(PROJECTS_QUERY);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <div className="bg-[#F9F9F9]">
      <Hero />
      <PortfolioGrid projects={projects ?? []} />
      <About />
      <Footer />
    </div>
  );
}
