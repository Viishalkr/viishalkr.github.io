import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Vishal Kumar // Digital Studio",
  description: "Multi-disciplinary portfolio of Vishal Kumar. Photography, videography, and digital design.",
};

export default function RootLayout({ children }) {
  return (
    // 👇 The data-scroll-behavior attribute is added here
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased bg-[#F9F9F9]">
        <Navbar /> 
        {children}
      </body>
    </html>
  );
}