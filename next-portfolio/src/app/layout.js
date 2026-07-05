import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Vishal Kumar — Visual Director",
  description: "Visual director working across photography, film, and design. Open for global commissions.",
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
