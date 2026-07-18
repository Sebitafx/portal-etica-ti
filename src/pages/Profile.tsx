import { useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ActivityTimeline } from "@/components/profile/ActivityTimeline";
import { Camera, Save, Code2, Trash2, LogOut } from "lucide-react";

export default function Profile() {
  const { user, userProfile, loading, updateUserProfile, uploadPhoto, deleteAccount, logout } = useAuth();
  const [displayName, setDisplayName] = useState(userProfile?.displayName ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const uid = user?.uid ?? userProfile?.uid;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 dark:border-zinc-600 border-t-transparent dark:border-t-transparent" />
      </div>
    );
  }

  if (!user && !userProfile) return <Navigate to="/login" replace />;

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadPhoto(file);
      setMsg("Foto actualizada correctamente.");
    } catch {
      setMsg("Error al subir la foto.");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    try {
      await updateUserProfile({ displayName });
      setMsg("Perfil actualizado correctamente.");
    } catch {
      setMsg("Error al actualizar el perfil.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      navigate("/");
    } catch {
      setMsg("Error al eliminar la cuenta.");
    }
  };

  const initials = userProfile?.displayName
    ?.split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("") ?? "?";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 p-8 sm:p-10 transition-colors">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-slate-900 dark:bg-zinc-800">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-zinc-50">Mi Perfil</h1>
          </div>

          <div className="mb-8 flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userProfile?.photoURL} />
                <AvatarFallback className="bg-slate-900 text-2xl font-bold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full border-2 border-white dark:border-zinc-900 bg-slate-900 dark:bg-zinc-700 text-white hover:bg-slate-800 dark:hover:bg-zinc-600 transition cursor-pointer"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                Nombre completo
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-4 py-2.5 text-sm dark:text-zinc-100 outline-none transition focus:border-slate-400 focus:ring-1 focus:ring-slate-400 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                Correo electrónico
              </label>
              <input
                type="email"
                value={user?.email ?? userProfile?.email ?? ""}
                disabled
                className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-800/50 px-4 py-2.5 text-sm text-slate-500 dark:text-zinc-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300">Rol</label>
              <input
                type="text"
                value={userProfile?.role === "admin" ? "Administrador" : "Usuario"}
                disabled
                className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-800/50 px-4 py-2.5 text-sm text-slate-500 dark:text-zinc-400 cursor-not-allowed"
              />
            </div>

            {uid && <ActivityTimeline userId={uid} />}

            {msg && (
              <div
                className={`rounded-xl p-3 text-sm ${
                  msg.includes("Error")
                    ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400"
                    : "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                }`}
              >
                {msg}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary w-full justify-center"
            >
              <Save className="h-4 w-4" />
              {saving ? "Guardando…" : "Guardar Cambios"}
            </button>

            <div className="border-t border-slate-200 dark:border-zinc-800 pt-4 mt-6">
              {showDelete ? (
                <div className="rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-4 space-y-3">
                  <p className="text-sm text-red-700 font-medium">
                    ¿Estás seguro? Esta acción no se puede deshacer.
                  </p>
                  <div className="flex gap-2">
                    <button onClick={handleDelete} className="btn-danger text-sm flex-1 justify-center">
                      <Trash2 className="h-4 w-4" /> Eliminar mi cuenta
                    </button>
                    <button onClick={() => setShowDelete(false)} className="btn-secondary text-sm">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDelete(true)}
                    className="btn-secondary text-sm flex-1 justify-center text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" /> Eliminar cuenta
                  </button>
                  <button
                    onClick={() => { logout(); navigate("/"); }}
                    className="btn-secondary text-sm flex-1 justify-center"
                  >
                    <LogOut className="h-4 w-4" /> Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
