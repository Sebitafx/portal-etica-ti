import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Shield, Users, MessageSquare, Flag } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, threads: 0, comments: 0, reports: 0 });

  useEffect(() => {
    if (!db) return;
    const load = async () => {
      let uSize = 0, tSize = 0, rSize = 0;
      try {
        const uSnap = await getDocs(collection(db!, "users"));
        uSize = uSnap.size;
      } catch (e) { console.error("Error fetching users:", e); }
      
      try {
        const tSnap = await getDocs(collection(db!, "threads"));
        tSize = tSnap.size;
      } catch (e) { console.error("Error fetching threads:", e); }
      
      try {
        const rSnap = await getDocs(collection(db!, "reports"));
        rSize = rSnap.size;
      } catch (e) { console.error("Error fetching reports:", e); }

      setStats({
        users: uSize,
        threads: tSize,
        comments: 0,
        reports: rSize,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Usuarios", value: stats.users, icon: Users, to: "/admin/usuarios", color: "text-blue-600 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400" },
    { label: "Hilos", value: stats.threads, icon: MessageSquare, to: "/admin/hilos", color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400" },
    { label: "Reportes", value: stats.reports, icon: Flag, to: "/admin/reportes", color: "text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400" },
    { label: "Categorías", value: "—", icon: Shield, to: "/admin/categorias", color: "text-zinc-600 bg-zinc-100 dark:bg-zinc-500/20 dark:text-zinc-400" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Panel de Administración
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Modera usuarios, hilos, reportes y categorías
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-zinc-900/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{c.label}</p>
                  <p className="font-display text-3xl font-extrabold text-zinc-900 mt-1 dark:text-zinc-50">
                    {c.value}
                  </p>
                </div>
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${c.color}`}>
                  <c.icon className="h-6 w-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
