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
import { ArrowLeft, MessageSquare, Lock } from "lucide-react";

interface Thread {
  threadId: string;
  title: string;
  authorName: string;
  categoryId: string;
  isClosed: boolean;
  commentCount: number;
  createdAt: string;
}

export default function AdminThreads() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!db) return;
    const q = query(collection(db, "threads"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setThreads(snap.docs.map((d) => ({ threadId: d.id, ...d.data() } as Thread)));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleClose = async (threadId: string, current: boolean) => {
    if (!db) return;
    await updateDoc(doc(db, "threads", threadId), {
      isClosed: !current,
      updatedAt: new Date().toISOString(),
    });
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
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">Hilos</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Administra y cierra hilos del foro
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Comentarios</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Cerrar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-400 py-8">
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : threads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-400 py-8">
                    No hay hilos
                  </TableCell>
                </TableRow>
              ) : (
                threads.map((t) => (
                  <TableRow key={t.threadId}>
                    <TableCell className="font-medium text-zinc-900 dark:text-zinc-100 max-w-xs truncate">
                      {t.title}
                    </TableCell>
                    <TableCell className="text-zinc-500 dark:text-zinc-400">{t.authorName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.categoryId}</Badge>
                    </TableCell>
                    <TableCell className="text-zinc-500 dark:text-zinc-400">{t.commentCount}</TableCell>
                    <TableCell>
                      {t.isClosed ? (
                        <span className="flex items-center gap-1 text-amber-600 text-sm">
                          <Lock className="h-3 w-3" /> Cerrado
                        </span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 text-sm">Abierto</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={t.isClosed}
                        onCheckedChange={() => toggleClose(t.threadId, t.isClosed)}
                      />
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
