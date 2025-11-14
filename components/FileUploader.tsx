"use client";
import { useState } from "react";
import { Upload, FileText, Loader2, X } from "lucide-react";

export default function FileUploader({ onResult }: { onResult: (s: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError("Selecciona un archivo");
      return;
    }
    setLoading(true);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/summarize", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        // Determinar mensaje claro
        let userMessage = data?.error || "Error al procesar el archivo";
        if (data?.error?.includes("No text extracted")) {
          userMessage = "No se pudo extraer texto del archivo. ¿Es un PDF válido?";
        } else if (data?.error?.includes("Too long") || file.size > 5_000_000) {
          userMessage = "El archivo es demasiado grande para procesarlo. Intenta con uno más pequeño.";
        }
        setError(userMessage);
        setShowModal(true);
        setLoading(false);
        return;
      }

      onResult(data.summary);
    } catch {
      setError("Ocurrió un error inesperado");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md mx-auto flex flex-col gap-5 p-7 
          rounded-2xl bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-700
          shadow-md hover:shadow-lg transition-all
        "
      >
        {/* Dropzone */}
        <label
          className="
            flex flex-col items-center justify-center gap-3 p-7 border-2
            border-dashed rounded-xl cursor-pointer transition-all
            border-neutral-300 dark:border-neutral-700 
            bg-neutral-50/40 dark:bg-neutral-800/40
            backdrop-blur-sm
            hover:border-red-400 hover:dark:border-red-400
            hover:bg-neutral-100/60 dark:hover:bg-neutral-800/70
            hover:scale-[1.01]
          "
        >
          {!file ? (
            <>
              <Upload className="w-11 h-11 text-neutral-500 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Haz clic para seleccionar un archivo PDF o TXT
              </span>
            </>
          ) : (
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
              <FileText className="w-6 h-6" />
              <span className="font-medium">{file.name}</span>
            </div>
          )}
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>

        {/* Botón */}
        <button
          disabled={loading}
          className="
            flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl 
            font-medium text-white
            bg-gradient-to-r from-red-600 to-orange-500
            hover:from-red-500 hover:to-orange-400
            active:scale-95 
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all shadow-md hover:shadow-lg
          "
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Procesando...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Procesar archivo
            </>
          )}
        </button>
      </form>

      {/* Modal de error */}
      {showModal && error && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-sm w-full text-center relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-semibold mb-2 text-red-500">Error</h3>
            <p className="mb-4 text-sm text-neutral-700 dark:text-neutral-300">{error}</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
