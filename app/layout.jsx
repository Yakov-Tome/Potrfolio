import { Poppins } from "next/font/google";
import "./styles/globals.css";
import Navbar from "./components/Navbar.jsx";
import { ContentProvider } from "@/Context/GlobalContext.jsx";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

// Load Google Font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

// Metadata for SEO
export const metadata = {
  title: "Yakov Tome | Fullstack Web Developer Portfolio",
  description:
    "Portfolio website showcasing projects, experience and blog by Yakov Tome",
  icons: {
    icon: "/favicon.ico",
  },
};

// Root layout wrapping the entire app
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins min-h-screen flex flex-col">
        <ContentProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ContentProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
