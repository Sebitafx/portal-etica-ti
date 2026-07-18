import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";
import { Flag, X, Send } from "lucide-react";

interface Props {
  type: "thread" | "comment";
  targetId: string;
  threadId: string;
  contentSummary: string;
}

export function ReportButton({ type, targetId, threadId, contentSummary }: Props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { user, userProfile, isAdmin } = useAuth();

  const uid = user?.uid ?? userProfile?.uid;
  const name = userProfile?.displayName;

  if (!uid || isAdmin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || !uid || !name || !db) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "reports"), {
        type,
        targetId,
        threadId,
        reason: reason.trim(),
        reportedBy: uid,
        reportedByName: name,
        contentSummary: contentSummary.slice(0, 70),
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setDone(true);
      setTimeout(() => { setOpen(false); setDone(false); setReason(""); }, 1500);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition cursor-pointer"
        title="Reportar"
      >
        <Flag className="h-3 w-3" /> Reportar
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-slate-900">Reportar contenido</h3>
                <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {done ? (
                <p className="text-sm text-emerald-600 font-medium">Reporte enviado. Gracias.</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Explica por qué reportas este contenido..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-1 focus:ring-slate-400 min-h-[100px] resize-none"
                    required
                  />
                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
                    <Send className="h-4 w-4" />
                    {submitting ? "Enviando..." : "Enviar Reporte"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
