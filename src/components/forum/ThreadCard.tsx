import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Lock, Heart, Share } from "lucide-react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";

interface ThreadData {
  threadId: string;
  title: string;
  body?: string;
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

export function ThreadCard({ thread }: { thread: ThreadData }) {
  const { user, userProfile } = useAuth();
  const uid = user?.uid ?? userProfile?.uid;
  const initialLikes = thread.likes || [];
  const [likes, setLikes] = useState<string[]>(initialLikes);

  const hasLiked = uid ? likes.includes(uid) : false;

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!uid) return;

    // Optimistic UI
    if (hasLiked) {
      setLikes(likes.filter((id) => id !== uid));
    } else {
      setLikes([...likes, uid]);
    }

    if (db && !thread.threadId.startsWith("mock_")) {
      const ref = doc(db, "threads", thread.threadId);
      await updateDoc(ref, {
        likes: hasLiked ? arrayRemove(uid) : arrayUnion(uid),
      });
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/foro/${thread.threadId}`);
    alert("¡Enlace copiado al portapapeles!");
  };

  const initials = thread.authorName
    ?.split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("") ?? "??";

  return (
    <article className="border-b border-zinc-200 bg-white p-4 sm:p-5 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/50">
      <Link to={`/foro/${thread.threadId}`} className="flex items-start gap-3 sm:gap-4 cursor-pointer block">
        
        {/* Avatar Column */}
        <div className="shrink-0">
          {thread.authorPhoto ? (
            <img src={thread.authorPhoto} alt={thread.authorName} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover" />
          ) : (
            <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-700">
              {initials}
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-1.5 text-sm">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[150px] sm:max-w-xs">{thread.authorName}</span>
            <span className="text-zinc-500 dark:text-zinc-400">&middot;</span>
            <span className="text-zinc-500 dark:text-zinc-400 hover:underline">{timeAgo(thread.createdAt)}</span>
          </div>

          {/* Body */}
          <div className="mt-1">
            <h3 className="font-display text-base sm:text-lg font-bold leading-snug text-zinc-900 dark:text-zinc-50 mb-1">
              {thread.title}
            </h3>
            {thread.body && (
              <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 mb-3">
                {thread.body}
              </p>
            )}
            
            {/* Image attachment */}
            {thread.imageUrl && (
              <div className="mt-2 mb-3">
                <img 
                  src={thread.imageUrl} 
                  alt="Adjunto" 
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-700 object-cover max-h-64 w-full"
                />
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-medium">
                {thread.categoryId}
              </span>
              {thread.keywords?.map((kw) => (
                <span key={kw} className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  #{kw}
                </span>
              ))}
              {thread.isClosed && (
                <span className="flex items-center gap-1 text-[11px] text-amber-600 font-medium">
                  <Lock className="h-3 w-3" /> Cerrado
                </span>
              )}
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 max-w-md">
              <button className="flex items-center gap-2 group hover:text-emerald-500 transition-colors">
                <div className="p-1.5 rounded-full group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                  <MessageSquare className="h-[18px] w-[18px]" />
                </div>
                <span className="text-xs">{thread.commentCount}</span>
              </button>
              
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 group transition-colors ${hasLiked ? "text-pink-600 dark:text-pink-500" : "hover:text-pink-600 dark:hover:text-pink-500"}`}
              >
                <div className={`p-1.5 rounded-full transition-colors ${hasLiked ? "bg-pink-50 dark:bg-pink-500/10" : "group-hover:bg-pink-50 dark:group-hover:bg-pink-500/10"}`}>
                  <Heart className="h-[18px] w-[18px]" fill={hasLiked ? "currentColor" : "none"} />
                </div>
                <span className="text-xs">{likes.length > 0 ? likes.length : ""}</span>
              </button>

              <button 
                onClick={handleShare}
                className="flex items-center gap-2 group hover:text-blue-500 transition-colors"
              >
                <div className="p-1.5 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-colors">
                  <Share className="h-[18px] w-[18px]" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
