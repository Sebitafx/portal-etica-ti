import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProtectedRoute, AdminRoute } from "@/components/layout/ProtectedRoute";
import { Toaster } from "sonner";
import { Code2, Settings } from "lucide-react";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Forum from "@/pages/Forum";
import ThreadDetail from "@/pages/ThreadDetail";
import NewThread from "@/pages/NewThread";
import AdminDashboard from "@/pages/Admin/Dashboard";
import AdminUsers from "@/pages/Admin/Users";
import AdminThreads from "@/pages/Admin/Threads";
import AdminReports from "@/pages/Admin/Reports";
import AdminCategories from "@/pages/Admin/Categories";

import { Guide } from "@/pages/Guide";
import Cases from "@/pages/Cases";
import CaseDetail from "@/pages/CaseDetail";
import { Checklist } from "@/pages/Checklist";

function Layout() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--color-background)]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function FirebaseCheck({ children }: { children: React.ReactNode }) {
  const { firebaseReady } = useAuth();

  if (!firebaseReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] p-4 dark:bg-zinc-950">
        <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-800">
            <Code2 className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">EthiCode</h1>
          <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400">
            <Settings className="h-4 w-4 shrink-0" />
            <span>Configuración de Firebase pendiente</span>
          </div>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Para usar la aplicación, abre el archivo <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">.env</code> en la raíz del proyecto y pega las credenciales de tu proyecto Firebase.
          </p>
          <div className="mt-4 rounded-xl bg-zinc-50 p-4 text-left border border-zinc-200 dark:bg-zinc-950/50 dark:border-zinc-800/50">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
            Archivo <code className="rounded bg-zinc-200 px-1 py-0.5 font-mono dark:bg-zinc-800">.env</code>
            </p>
            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-[11px] leading-relaxed text-zinc-300 dark:bg-zinc-950">
VITE_FIREBASE_API_KEY=AIzaSy...{"\n"}
VITE_FIREBASE_AUTH_DOMAIN=...firebaseapp.com{"\n"}
VITE_FIREBASE_PROJECT_ID=...{"\n"}
VITE_FIREBASE_STORAGE_BUCKET=...{"\n"}
VITE_FIREBASE_MESSAGING_SENDER_ID=...{"\n"}
VITE_FIREBASE_APP_ID=...
            </pre>
          </div>
          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
            Una vez configurado, guarda el archivo y recarga la página.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <FirebaseCheck>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/guia" element={<Guide />} />
              <Route path="/casos" element={<Cases />} />
              <Route path="/casos/:id" element={<CaseDetail />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route
                path="/perfil"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/foro" element={<Forum />} />
              <Route
                path="/foro/nuevo"
                element={
                  <ProtectedRoute>
                    <NewThread />
                  </ProtectedRoute>
                }
              />
              <Route path="/foro/:threadId" element={<ThreadDetail />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/usuarios"
                element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/hilos"
                element={
                  <AdminRoute>
                    <AdminThreads />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/reportes"
                element={
                  <AdminRoute>
                    <AdminReports />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/categorias"
                element={
                  <AdminRoute>
                    <AdminCategories />
                  </AdminRoute>
                }
              />
            </Route>
          </Routes>
        </FirebaseCheck>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
