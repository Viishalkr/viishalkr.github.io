import "./globals.css";
import Navbar from "../components/Navbar";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "../lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased bg-[#F9F9F9]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
