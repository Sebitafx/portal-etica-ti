import { Code2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-600 text-white">
            <Code2 className="h-4 w-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              EthiCode
            </span>
            <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-500">
              Codifica con responsabilidad.
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            to="/foro"
            className="text-xs font-medium text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            Foro
          </Link>
          <a
            href="#casos"
            className="text-xs font-medium text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            Herramientas
          </a>
          <a
            href="#checklist"
            className="text-xs font-medium text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            Checklist
          </a>
        </nav>

        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          &copy; {new Date().getFullYear()} EthiCode &middot; FIIS UNAS
        </p>
      </div>
    </footer>
  );
}
