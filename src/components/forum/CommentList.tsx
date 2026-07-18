import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";
import { Trash2, MessageSquare, Heart, Edit3, X, Check, Image as ImageIcon } from "lucide-react";
import { RichTextDisplay } from "@/components/forum/RichTextDisplay";
import { ReportButton } from "@/components/forum/ReportButton";
import { MOCK_REPLIES } from "@/lib/mocks";

interface Comment {
  commentId: string;
  body: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  quotedCommentId?: string;
  quotedCommentText?: string;
  quotedCommentAuthor?: string;
  isDeleted: boolean;
  createdAt: Timestamp | string; // string for mocks
  likes?: string[];
  imageUrl?: string;
}

const timeAgo = (date: Timestamp | string) => {
  if (!date) return "";
  const t = typeof date === "string" ? new Date(date).getTime() : date.toMillis();
  const diff = Date.now() - t;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `hace ${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `hace ${days}d`;
  return new Date(t).toLocaleDateString("es-PE");
};

export function CommentList({ threadId }: { threadId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newBody, setNewBody] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [quoteTarget, setQuoteTarget] = useState<Comment | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState("");
  const { user, userProfile, isAdmin } = useAuth();
  const uid = user?.uid ?? userProfile?.uid;

  useEffect(() => {
    if (!db || threadId.startsWith("mock_")) return;
    const q = query(
      collection(db, "threads", threadId, "comments"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setComments(
        snap.docs.map((d) => ({ commentId: d.id, ...d.data() } as Comment))
      );
    });
    return unsub;
  }, [threadId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBody.trim() || !uid || !userProfile || !db) return;

    if (threadId.startsWith("mock_")) {
      alert("Estás viendo un mock. No se puede guardar en Firestore real.");
      return;
    }

    const commentData: Record<string, unknown> = {
      body: newBody.trim(),
      authorId: uid,
      authorName: userProfile.displayName,
      authorPhoto: userProfile.photoURL || "",
      isDeleted: false,
      likes: [],
      imageUrl: newImageUrl.trim() || null,
      createdAt: serverTimestamp(),
    };
    if (quoteTarget) {
      commentData.quotedCommentId = quoteTarget.commentId;
      commentData.quotedCommentText = quoteTarget.body.slice(0, 100);
      commentData.quotedCommentAuthor = quoteTarget.authorName;
    }

    await addDoc(collection(db, "threads", threadId, "comments"), commentData);
    await updateDoc(doc(db, "threads", threadId), {
      commentCount: increment(1),
    });
    setNewBody("");
    setNewImageUrl("");
    setShowImageInput(false);
    setQuoteTarget(null);
  };

  const handleDelete = async (commentId: string) => {
    if (!db || threadId.startsWith("mock_")) return;
    await updateDoc(doc(db, "threads", threadId, "comments", commentId), {
      isDeleted: true,
      body: "[Comentario eliminado por moderación]",
    });
    await updateDoc(doc(db, "threads", threadId), {
      commentCount: increment(-1),
    });
  };

  const handleLike = async (c: Comment) => {
    if (!uid || !db || threadId.startsWith("mock_")) return;
    const likes = c.likes || [];
    const hasLiked = likes.includes(uid);
    const ref = doc(db, "threads", threadId, "comments", c.commentId);
    await updateDoc(ref, {
      likes: hasLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
  };

  const startEdit = (c: Comment) => {
    setEditingId(c.commentId);
    setEditBody(c.body);
  };

  const saveEdit = async () => {
    if (!editingId || !editBody.trim() || !db || threadId.startsWith("mock_")) return;
    await updateDoc(doc(db, "threads", threadId, "comments", editingId), {
      body: editBody.trim(),
      updatedAt: serverTimestamp(),
    });
    setEditingId(null);
    setEditBody("");
  };

  const displayComments = comments.length > 0 ? comments : (MOCK_REPLIES[threadId as keyof typeof MOCK_REPLIES] || []) as unknown as Comment[];

  return (
    <div className="space-y-0 border-t border-zinc-200 dark:border-zinc-800">
      {displayComments.map((c) => {
        const isOwner = c.authorId === uid;
        const initials = c.authorName?.split(" ").map((s) => s[0]).slice(0, 2).join("") ?? "??";
        const likes = c.likes || [];
        const hasLiked = uid ? likes.includes(uid) : false;

        return (
          <div
            key={c.commentId}
            className={`flex items-start gap-3 sm:gap-4 border-b ${
              c.isDeleted ? "border-zinc-100 bg-zinc-50 dark:border-zinc-800/50 dark:bg-zinc-900/50" : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            } p-4 sm:p-5 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50`}
          >
            {/* Avatar Column */}
            <div className="shrink-0">
              {c.authorPhoto ? (
                <img src={c.authorPhoto} alt={c.authorName} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover" />
              ) : (
                <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-700">
                  {initials}
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[150px] sm:max-w-xs">{c.authorName}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">&middot;</span>
                  <span className="text-zinc-500 dark:text-zinc-400 hover:underline">{timeAgo(c.createdAt)}</span>
                  {c.isDeleted && <span className="text-amber-600 text-xs ml-2">Eliminado</span>}
                </div>
                
                {!c.isDeleted && (isOwner || isAdmin) && (
                  <div className="flex shrink-0 gap-1">
                    {isOwner && (
                      <button onClick={() => startEdit(c)} className="rounded-md p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition cursor-pointer dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800" title="Editar">
                        <Edit3 className="h-4 w-4" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(c.commentId)} className="rounded-md p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer dark:text-zinc-500 dark:hover:text-red-400 dark:hover:bg-red-500/10" title="Eliminar">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Quote Block */}
              {c.quotedCommentId && !c.isDeleted && (
                <div className="mt-1 mb-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                  {c.quotedCommentAuthor && (
                    <div className="font-bold text-zinc-700 dark:text-zinc-300 mb-0.5 text-xs">Replying to {c.quotedCommentAuthor}</div>
                  )}
                  <div className="line-clamp-2 text-xs italic">"{c.quotedCommentText ?? "Cita a un comentario"}"</div>
                </div>
              )}

              {/* Main Text */}
              {editingId === c.commentId ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 min-h-[80px] resize-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-emerald-500"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="btn-primary text-xs py-1.5 px-3">
                      <Check className="h-3 w-3" /> Guardar
                    </button>
                    <button onClick={() => setEditingId(null)} className="btn-secondary text-xs py-1.5 px-3">
                      <X className="h-3 w-3" /> Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 text-sm leading-relaxed text-zinc-800 dark:text-zinc-300">
                  {c.isDeleted ? (
                    <span className="italic text-zinc-400 dark:text-zinc-500">{c.body}</span>
                  ) : (
                    <RichTextDisplay text={c.body} />
                  )}
                </div>
              )}

              {/* Image */}
              {c.imageUrl && !c.isDeleted && (
                <div className="mt-3 mb-1">
                  <img src={c.imageUrl} alt="Imagen adjunta" className="rounded-2xl border border-zinc-200 dark:border-zinc-700 object-cover max-h-64 w-full" />
                </div>
              )}

              {/* Actions Footer */}
              {!c.isDeleted && (
                <div className="mt-3 flex items-center justify-between text-zinc-500 dark:text-zinc-400 max-w-sm">
                  {uid && (
                    <button
                      onClick={() => setQuoteTarget(c)}
                      className="flex items-center gap-2 group hover:text-emerald-500 transition-colors"
                    >
                      <div className="p-1.5 -ml-1.5 rounded-full group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                        <MessageSquare className="h-[18px] w-[18px]" />
                      </div>
                      <span className="text-xs">Responder</span>
                    </button>
                  )}
                  {uid && (
                    <button
                      onClick={() => handleLike(c)}
                      className={`flex items-center gap-2 group transition-colors ${hasLiked ? "text-pink-600 dark:text-pink-500" : "hover:text-pink-600 dark:hover:text-pink-500"}`}
                    >
                      <div className={`p-1.5 rounded-full transition-colors ${hasLiked ? "bg-pink-50 dark:bg-pink-500/10" : "group-hover:bg-pink-50 dark:group-hover:bg-pink-500/10"}`}>
                        <Heart className="h-[18px] w-[18px]" fill={hasLiked ? "currentColor" : "none"} />
                      </div>
                      <span className="text-xs">{likes.length > 0 ? likes.length : ""}</span>
                    </button>
                  )}
                  {uid && (
                    <div className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      <ReportButton
                        type="comment"
                        targetId={c.commentId}
                        threadId={threadId}
                        contentSummary={c.body}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* New Comment Box */}
      {uid && (
        <div className="border-t border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <form onSubmit={handleSubmit}>
            {quoteTarget && (
              <div className="mb-3 flex items-center justify-between rounded-xl bg-zinc-50 border border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400">
                <span>
                  Respondiendo a <strong className="text-zinc-700 dark:text-zinc-300">@{quoteTarget.authorName}</strong>
                </span>
                <button type="button" onClick={() => setQuoteTarget(null)} className="text-red-500 hover:underline cursor-pointer">
                  Cancelar
                </button>
              </div>
            )}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-700">
                {userProfile?.displayName?.split(" ").map((s) => s[0]).slice(0, 2).join("") ?? "?"}
              </div>
              <div className="flex-1">
                <textarea
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Postea tu respuesta"
                  className="w-full bg-transparent text-sm sm:text-lg outline-none resize-none placeholder:text-zinc-400 dark:text-zinc-200 min-h-[60px] py-1"
                  required
                />
                
                {showImageInput && (
                  <div className="mt-2 mb-2 animate-fade-in-up">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="URL de imagen (opcional)"
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-emerald-500"
                      autoFocus
                    />
                  </div>
                )}
                
                {/* Submit Row */}
                <div className="mt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50 pt-2">
                  <div className="flex items-center gap-2">
                    <button 
                      type="button" 
                      onClick={() => setShowImageInput(!showImageInput)}
                      className={`rounded-full p-2 transition-colors cursor-pointer ${showImageInput || newImageUrl ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10" : "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"}`}
                      title="Añadir imagen mediante URL"
                    >
                      <ImageIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary rounded-full px-5 py-2 text-sm font-bold shadow-none"
                    disabled={!newBody.trim()}
                  >
                    Responder
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
