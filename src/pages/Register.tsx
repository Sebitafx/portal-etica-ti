import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, User, Eye, EyeOff, Code2, UserPlus } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Salem",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Missy",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasmine",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha",
];

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPw) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, displayName);
      setRegistered(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al registrarse";
      if (msg.includes("email-already-in-use")) {
        setError("Este correo ya está registrado.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[var(--color-background)] px-4 py-12 dark:bg-zinc-950">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
            <UserPlus className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
            ¡Cuenta creada!
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Bienvenido a EthiCode. Ahora puedes iniciar sesión y participar en los debates.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn-primary mt-6"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[var(--color-background)] px-4 py-12 dark:bg-zinc-950 animate-fade-in-up">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-emerald-600">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">Crear Cuenta</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Únete a la comunidad EthiCode
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-10 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Repite la contraseña"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-10 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Avatar
              </label>
              <div className="flex flex-wrap gap-2">
                {avatars.map((url) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setSelectedAvatar(url)}
                    className={`h-10 w-10 overflow-hidden rounded-full border-2 transition cursor-pointer ${
                      selectedAvatar === url
                        ? "border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-900"
                        : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
                    }`}
                  >
                    <img src={url} alt="avatar" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              <UserPlus className="h-4 w-4" />
              {loading ? "Creando cuenta…" : "Crear Cuenta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="font-medium text-zinc-900 hover:text-emerald-600 dark:text-zinc-50 dark:hover:text-emerald-400">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
