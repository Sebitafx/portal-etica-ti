import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Code2, Menu, X, LogOut, User, Shield, Plus, Search, Sun, Moon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NotificationBell } from "@/components/layout/NotificationBell";

function useTheme() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark((d) => !d);
  };
  return { dark, toggle };
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, userProfile, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { dark, toggle: toggleTheme } = useTheme();

  const authed = !!(user || userProfile);

  const links = [
    { label: "Inicio", to: "/" },
    { label: "Guía", to: "/guia" },
    { label: "Casos", to: "/casos" },
    { label: "Checklist", to: "/checklist" },
    { label: "Foro", to: "/foro" },
  ];

  const initials = userProfile?.displayName
    ?.split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("") ?? "?";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-600 text-white">
            <Code2 className="h-4 w-4" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            EthiCode
          </span>
        </Link>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-colors duration-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop search removed */}

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-xl text-zinc-500 transition-colors duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              aria-label="Cambiar tema"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {authed ? (
              <>
                <NotificationBell />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white p-1 pr-3 transition-all duration-300 hover:bg-zinc-50 hover:shadow-sm cursor-pointer dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={userProfile?.photoURL} />
                        <AvatarFallback className="bg-emerald-600 text-[10px] font-bold text-white">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {userProfile?.displayName ?? user?.email}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                    <DropdownMenuItem onClick={() => navigate("/perfil")}>
                      <User className="h-4 w-4" /> Mi Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/foro/nuevo")}>
                      <Plus className="h-4 w-4" /> Nuevo Hilo
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <Shield className="h-4 w-4" /> Administración
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="h-4 w-4" /> Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <button onClick={() => navigate("/login")} className="btn-primary text-sm">
                Iniciar Sesión
              </button>
            )}
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              aria-label="Cambiar tema"
            >
              {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              aria-label="Abrir menú"
            >
              <div className="relative h-5 w-5">
                <span
                  className={`absolute left-0 top-[6px] h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                    open ? "top-[9px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[13px] h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                    open ? "top-[9px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

      {/* Mobile search removed */}

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto max-w-5xl px-4 pt-2 md:hidden">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                  {l.label}
                </Link>
              ))}
              {authed ? (
                <>
                  <Link
                    to="/perfil"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  >
                    Mi Perfil
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    >
                      Administración
                    </Link>
                  )}
                  <div className="my-2 border-t border-zinc-100 dark:border-zinc-800" />
                  <button
                    onClick={() => { logout(); setOpen(false); }}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-2 justify-center"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
