import { ArrowRight, FileText, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-3xl text-center space-y-10 animate-fadeIn">

        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-primary/15 text-primary shadow-sm animate-scaleIn">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Resume documentos en segundos  
          <span className="text-primary"> con IA</span>
        </h1>

        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Sube PDFs, genera resúmenes claros, rápidos y útiles en 5 bullets.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link
            href="/login"
            className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-all flex items-center justify-center gap-2 font-medium shadow-sm"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-medium shadow-md"
          >
            Ir al panel
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card shadow-lg max-w-2xl mx-auto space-y-4 animate-slideUp">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            <FileText className="w-5 h-5 text-primary" />
            ¿Cómo funciona?
          </div>

          <ul className="text-muted-foreground text-sm space-y-2">
            <li>• Sube un PDF o archivo de texto</li>
            <li>• La IA analiza y extrae los puntos esenciales</li>
            <li>• Obtienes un resumen claro en 5 bullets principales</li>
          </ul>
        </div>

      </div>
    </main>
  );
}
