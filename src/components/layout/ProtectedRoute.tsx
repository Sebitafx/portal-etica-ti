import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, userProfile, loading, isBanned } = useAuth();

  const authed = !!(user || userProfile);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
      </div>
    );
  }

  if (!authed) return <Navigate to="/login" replace />;
  if (isBanned) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="font-display text-2xl font-bold text-red-600">
            Cuenta Suspendida
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Tu cuenta ha sido suspendida. Contacta al administrador.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user, userProfile, loading } = useAuth();

  const authed = !!(user || userProfile);
  const admin = userProfile?.role === "admin";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
      </div>
    );
  }

  if (!authed) return <Navigate to="/login" replace />;
  if (!admin) return <Navigate to="/" replace />;

  return <>{children}</>;
}
