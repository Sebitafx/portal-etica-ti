import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";
import type { UserProfile } from "@/context/AuthContext";

export default function AdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!db) return;
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setUsers(snap.docs.map((d) => d.data() as UserProfile));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleBan = async (uid: string, current: boolean) => {
    if (!db) return;
    await updateDoc(doc(db, "users", uid), { isBanned: !current });
    await load();
  };

  const toggleRole = async (uid: string, current: string) => {
    if (!db) return;
    const newRole = current === "admin" ? "user" : "admin";
    await updateDoc(doc(db, "users", uid), { role: newRole });
    await load();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <Link
          to="/admin"
          className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al panel
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">Usuarios</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Gestiona roles y suspensiones
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Hilos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-zinc-400 dark:text-zinc-500 py-8">
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-zinc-400 dark:text-zinc-500 py-8">
                    No hay usuarios registrados
                  </TableCell>
                </TableRow>
              ) : (
                users.map((u) => (
                  <TableRow key={u.uid}>
                    <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">{u.displayName}</TableCell>
                    <TableCell className="text-zinc-500 dark:text-zinc-400">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                        {u.role === "admin" ? "Admin" : "User"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-500 dark:text-zinc-400">{u.threadCount}</TableCell>
                    <TableCell>
                      {u.isBanned ? (
                        <span className="flex items-center gap-1 text-red-600 text-sm">
                          <AlertTriangle className="h-3 w-3" /> Suspendido
                        </span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 text-sm">Activo</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                          <Switch
                            checked={u.isBanned}
                            onCheckedChange={() => toggleBan(u.uid, u.isBanned)}
                          />
                          {u.isBanned ? "Desbanear" : "Banear"}
                        </label>
                        <button
                          onClick={() => toggleRole(u.uid, u.role)}
                          className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 underline cursor-pointer"
                        >
                          {u.role === "admin" ? "Quitar admin" : "Hacer admin"}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
