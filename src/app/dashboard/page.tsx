"use client";
import { useState } from "react";
import FileUploader from "../../../components/FileUploader";
import { useSession } from "next-auth/react";
import { Loader2, FileText } from "lucide-react";

export default function DashboardPage() {
  const [summary, setSummary] = useState("");
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <FileText className="w-10 h-10 mb-4 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">
          Necesitas iniciar sesión para acceder al panel.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full flex justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl space-y-8">

        {/* Header */}
        <div className="flex items-center gap-3">
          <FileText className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Panel de resúmenes
          </h1>
        </div>

        {/* Card de carga */}
        <div className="bg-card border border-border shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Subir documento</h2>
          <FileUploader onResult={setSummary} />
        </div>

        {/* Resultado */}
        {summary && (
          <div className="bg-card border border-border shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-primary" />
              Resumen generado
            </h2>

            <div className="rounded-lg bg-muted p-4 whitespace-pre-wrap text-sm leading-relaxed">
              {summary}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

