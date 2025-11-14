import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "AI Summarizer Pro",
  description: "Crea resúmenes inteligentes con IA"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="
          min-h-screen
          bg-background
          text-foreground
          antialiased
          transition-colors
          duration-300
          selection:bg-primary/20
        "
      >
        <Providers>
          <Navbar />

          {/* Contenedor principal con espaciado */}
          <div className="pt-20 px-4 sm:px-6">
            {children}
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}




