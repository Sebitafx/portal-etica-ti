import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, Eye, EyeOff, Code2, LogIn, Shield } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const { login, recoverPassword, fastLogin, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al iniciar sesión";
      if (msg.includes("invalid-credential")) {
        setError("Credenciales inválidas. Verifica tu email y contraseña.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };



  const handleRecovery = async () => {
    if (!email.trim()) {
      setError("Ingresa tu correo electrónico primero.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await recoverPassword(email);
      setRecoverySent(true);
    } catch {
      setError("Error al enviar correo de recuperación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[var(--color-background)] px-4 py-12 dark:bg-zinc-950 animate-fade-in-up">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-emerald-600">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">Iniciar Sesión</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Accede al portal EthiCode
            </p>
          </div>

          {recoverySent ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center dark:bg-emerald-500/10 dark:border-emerald-500/20">
              <p className="text-sm text-emerald-700 font-medium dark:text-emerald-400">
                Correo de recuperación enviado
              </p>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-500">
                Revisa tu bandeja de entrada para restablecer tu contraseña.
              </p>
              <button
                onClick={() => setRecoverySent(false)}
                className="mt-3 text-sm text-zinc-500 hover:text-zinc-900 underline cursor-pointer dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                Volver a inicio de sesión
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="••••••••"
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

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleRecovery}
                  className="text-xs text-zinc-500 hover:text-emerald-600 underline cursor-pointer dark:text-zinc-400 dark:hover:text-emerald-400"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                <LogIn className="h-4 w-4" />
                {loading ? "Ingresando…" : "Iniciar Sesión"}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="font-medium text-zinc-900 hover:text-emerald-600 dark:text-zinc-50 dark:hover:text-emerald-400">
              Regístrate aquí
            </Link>
          </p>
        </div>


      </div>
    </div>
  );
}
