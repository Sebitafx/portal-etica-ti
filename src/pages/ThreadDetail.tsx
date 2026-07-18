import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/services/firebase";
import { CommentList } from "@/components/forum/CommentList";
import { RichTextDisplay } from "@/components/forum/RichTextDisplay";
import { ReportButton } from "@/components/forum/ReportButton";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Lock, Clock, MessageSquare, Edit3, Save, X, Trash2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_THREADS } from "@/lib/mocks";

interface ThreadData {
  threadId: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  categoryId: string;
  isClosed: boolean;
  commentCount: number;
  createdAt: string;
  keywords?: string[];
  likes?: string[];
  imageUrl?: string;
}

const timeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `hace ${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `hace ${days}d`;
  return new Date(date).toLocaleDateString("es-PE");
};

export default function ThreadDetail() {
  const { threadId } = useParams<{ threadId: string }>();
  const [thread, setThread] = useState<ThreadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { user, userProfile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const uid = user?.uid ?? userProfile?.uid;
  const isOwner = thread?.authorId === uid;
  const initialLikes = thread?.likes || [];
  const [likes, setLikes] = useState<string[]>([]);
  
  useEffect(() => {
    if (thread?.likes) setLikes(thread.likes);
  }, [thread?.likes]);

  const hasLiked = uid ? likes.includes(uid) : false;

  useEffect(() => {
    if (!threadId || !db) return;
    const load = async () => {
      const snap = await getDoc(doc(db, "threads", threadId));
      if (snap.exists()) {
        setThread({ threadId: snap.id, ...snap.data() } as ThreadData);
      } else if (threadId.startsWith("mock_")) {
        const mockThread = MOCK_THREADS.find(t => t.threadId === threadId);
        if (mockThread) setThread(mockThread as unknown as ThreadData);
      }
      setLoading(false);
    };
    load();
  }, [threadId]);

  const startEdit = () => {
    if (!thread) return;
    setEditTitle(thread.title);
    setEditBody(thread.body);
    setEditing(true);
  };

  const saveEdit = async () => {
    if (!threadId || !editTitle.trim() || !editBody.trim() || !db) return;
    await updateDoc(doc(db, "threads", threadId), {
      title: editTitle.trim(),
      body: editBody.trim(),
      updatedAt: serverTimestamp(),
    });
    setThread((prev) =>
      prev ? { ...prev, title: editTitle.trim(), body: editBody.trim() } : prev
    );
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!threadId || !db || !confirm("¿Eliminar este hilo permanentemente?")) return;
    await updateDoc(doc(db, "threads", threadId), {
      body: "[Hilo eliminado]",
      isClosed: true,
    });
    navigate("/foro");
  };

  const handleLike = async () => {
    if (!uid || !threadId) return;

    // Optimistic UI
    if (hasLiked) {
      setLikes(likes.filter((id) => id !== uid));
    } else {
      setLikes([...likes, uid]);
    }

    if (db && !threadId.startsWith("mock_")) {
      const ref = doc(db, "threads", threadId);
      await updateDoc(ref, {
        likes: hasLiked ? arrayRemove(uid) : arrayUnion(uid),
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[var(--color-background)] dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent dark:border-zinc-600 dark:border-t-transparent" />
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="mx-auto max-w-3xl bg-[var(--color-background)] px-4 py-12 text-center dark:bg-zinc-950">
        <h1 className="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50">Hilo no encontrado</h1>
        <Link to="/foro" className="btn-primary mt-4 inline-flex">
          Volver al foro
        </Link>
      </div>
    );
  }

  const initials = thread.authorName
    ?.split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("") ?? "??";

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Link
          to="/foro"
          className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 transition dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al foro
        </Link>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 mb-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-4 dark:text-zinc-400">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-700">
              {initials}
            </span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">{thread.authorName}</span>
            <span>&middot;</span>
            <Clock className="h-3 w-3" />
            <span>{timeAgo(thread.createdAt)}</span>
            <span>&middot;</span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{thread.categoryId}</span>
            {thread.isClosed && (
              <span className="flex items-center gap-1 text-amber-600">
                <Lock className="h-3 w-3" /> Cerrado
              </span>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xl font-bold outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-emerald-500"
              />
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 min-h-[200px] resize-y dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:focus:border-emerald-500"
              />
              <div className="flex gap-2">
                <button onClick={saveEdit} className="btn-primary text-sm">
                  <Save className="h-4 w-4" /> Guardar
                </button>
                <button onClick={() => setEditing(false)} className="btn-secondary text-sm">
                  <X className="h-4 w-4" /> Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-extrabold text-zinc-900 sm:text-3xl dark:text-zinc-50">
                {thread.title}
              </h1>
              <div className="mt-4 text-sm leading-relaxed text-zinc-600 whitespace-pre-wrap dark:text-zinc-400">
                <RichTextDisplay text={thread.body} />
              </div>
              {thread.imageUrl && (
                <div className="mt-4">
                  <img 
                    src={thread.imageUrl} 
                    alt="Adjunto" 
                    className="rounded-2xl border border-zinc-200 dark:border-zinc-700 object-cover max-h-96 w-full"
                  />
                </div>
              )}
            </>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800/50">
            <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{thread.commentCount} comentarios</span>
              </div>
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 group transition-colors cursor-pointer ${hasLiked ? "text-pink-600 dark:text-pink-500" : "hover:text-pink-600 dark:hover:text-pink-500"}`}
              >
                <div className={`p-1.5 -ml-1.5 rounded-full transition-colors ${hasLiked ? "bg-pink-50 dark:bg-pink-500/10" : "group-hover:bg-pink-50 dark:group-hover:bg-pink-500/10"}`}>
                  <Heart className="h-4 w-4" fill={hasLiked ? "currentColor" : "none"} />
                </div>
                <span>{likes.length} me gusta</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              {(isOwner || isAdmin) && !editing && (
                <>
                  {isOwner && (
                    <button onClick={startEdit} className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-700 transition cursor-pointer dark:text-zinc-500 dark:hover:text-zinc-300">
                      <Edit3 className="h-3 w-3" /> Editar
                    </button>
                  )}
                  {isAdmin && (
                    <button onClick={handleDelete} className="flex items-center gap-1 text-xs text-zinc-400 hover:text-red-500 transition cursor-pointer dark:text-zinc-500 dark:hover:text-red-400">
                      <Trash2 className="h-3 w-3" /> Eliminar
                    </button>
                  )}
                </>
              )}
              {uid && !editing && (
                <ReportButton
                  type="thread"
                  targetId={thread.threadId}
                  threadId={thread.threadId}
                  contentSummary={thread.body}
                />
              )}
            </div>
          </div>
        </div>

        {thread.isClosed ? (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
            <Lock className="mx-auto mb-2 h-6 w-6 text-zinc-400 dark:text-zinc-600" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Este hilo está cerrado. No se pueden añadir comentarios.</p>
          </div>
        ) : (
          <CommentList threadId={thread.threadId} />
        )}
      </div>
    </div>
  );
}
