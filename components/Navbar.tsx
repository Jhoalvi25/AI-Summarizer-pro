
"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { LogOut, LogIn, LayoutDashboard, BookText } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav
      className="
        w-full sticky top-0 z-50
        backdrop-blur-xl bg-white/60 dark:bg-neutral-900/60
        border-b border-neutral-200 dark:border-neutral-800
        supports-[backdrop-filter]:bg-white/40 
        dark:supports-[backdrop-filter]:bg-neutral-900/40
      "
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-6">

        {/* Logo */}
        <Link
          href="/"
          className="
            flex items-center gap-2 font-semibold text-lg
            text-neutral-800 dark:text-neutral-100
            hover:text-red-500 dark:hover:text-red-400
            transition-colors
          "
        >
          <BookText className="w-6 h-6 text-red-500" />
          AI Summarizer
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">

          <ThemeToggle />

          {session?.user ? (
            <>
              {/* Dashboard */}
              <Link
                href="/dashboard"
                className="
                  flex items-center gap-2 px-3 py-1.5 rounded-lg
                  text-sm font-medium
                  bg-neutral-100 dark:bg-neutral-800
                  text-neutral-800 dark:text-neutral-200
                  hover:bg-neutral-200 dark:hover:bg-neutral-700
                  hover:shadow-sm
                  transition-all
                "
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={() => signOut()}
                className="
                  flex items-center gap-2 px-3 py-1.5 rounded-lg
                  text-sm font-medium border
                  border-neutral-300 dark:border-neutral-700
                  text-neutral-800 dark:text-neutral-200
                  hover:bg-neutral-100 dark:hover:bg-neutral-800
                  hover:shadow-sm
                  transition-all
                "
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="
                flex items-center gap-2 px-3 py-1.5 rounded-lg 
                text-sm font-medium border
                border-neutral-300 dark:border-neutral-700
                text-neutral-800 dark:text-neutral-200
                hover:bg-neutral-100 dark:hover:bg-neutral-800
                hover:shadow-sm
                transition-all
              "
            >
              <LogIn className="w-4 h-4" />
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

