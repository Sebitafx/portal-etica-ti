import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
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
import { ArrowLeft, Shield, Flag, Check, X, Trash2 } from "lucide-react";

interface Report {
  id: string;
  type: "thread" | "comment";
  targetId: string;
  threadId: string;
  reason: string;
  reportedBy: string;
  reportedByName: string;
  contentSummary: string;
  status: "pending" | "resolved" | "dismissed";
  createdAt: string;
}

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setReports(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Report)));
    });
    return unsub;
  }, []);

  const updateStatus = async (id: string, status: "resolved" | "dismissed") => {
    if (!db) return;
    await updateDoc(doc(db, "reports", id), { status });
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="default" className="bg-amber-100 text-amber-700 border-amber-200">Pendiente</Badge>;
      case "resolved": return <Badge variant="default" className="bg-emerald-100 text-emerald-700 border-emerald-200">Resuelto</Badge>;
      case "dismissed": return <Badge variant="secondary">Desechado</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Link
          to="/admin"
          className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al panel
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400">
            <Flag className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">Reportes</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Revisa contenido reportado por la comunidad
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Resumen</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Reportado por</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-zinc-400 dark:text-zinc-500 py-8">
                    No hay reportes pendientes
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <Badge variant="outline">{r.type === "thread" ? "Hilo" : "Comentario"}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-zinc-600 dark:text-zinc-300">
                      {r.contentSummary}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-zinc-500 dark:text-zinc-400">
                      {r.reason}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">{r.reportedByName}</TableCell>
                    <TableCell>{statusBadge(r.status)}</TableCell>
                    <TableCell>
                      {r.status === "pending" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStatus(r.id, "resolved")}
                            className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 transition cursor-pointer"
                            title="Resolver"
                          >
                            <Check className="h-3 w-3" /> Resolver
                          </button>
                          <button
                            onClick={() => updateStatus(r.id, "dismissed")}
                            className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition cursor-pointer"
                            title="Desechar"
                          >
                            <X className="h-3 w-3" /> Desechar
                          </button>
                        </div>
                      )}
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
