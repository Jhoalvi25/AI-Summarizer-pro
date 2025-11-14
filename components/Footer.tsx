import { Github, Home, LogIn } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 border-t border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} AI Summarizer Pro · Todos los derechos reservados
        </p>

        <div className="flex items-center gap-6 text-sm opacity-90">
          <a 
            href="/dashboard"
            className="flex items-center gap-1 hover:opacity-100 transition"
          >
            <Home size={16} />
            Panel
          </a>

          <a 
            href="/login"
            className="flex items-center gap-1 hover:opacity-100 transition"
          >
            <LogIn size={16} />
            Acceso
          </a>

          <a 
            href="https://github.com/Jhoalvi25" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:opacity-100 transition"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

