"use client";

import { signIn } from "next-auth/react";
import { Mail, LogIn } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);

  async function handleGoogle() {
    setLoadingGoogle(true);
    await signIn("google");
  }

  async function handleDemo() {
    setLoadingDemo(true);
    await signIn("credentials", {
      email: "test@example.com",
      password: "123456",
      callbackUrl: "/",
    });
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-card border border-border shadow-sm rounded-xl p-6 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Bienvenido</h1>
          <p className="text-sm text-muted-foreground">
            Accede a tu cuenta para continuar
          </p>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center text-white justify-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {loadingGoogle ? "Conectando..." : "Continuar con Google"}
        </button>

        <button
          onClick={handleDemo}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Mail className="w-5 h-5" />
          {loadingDemo ? "Entrando..." : "Entrar con Email (Demo)"}
        </button>

        <div className="pt-2 text-center text-xs text-muted-foreground">
          Demo habilitada para pruebas técnicas
        </div>
      </div>
    </div>
  );
}


