import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";
import { Bell, MessageSquare, CheckCheck } from "lucide-react";

interface Notification {
  id: string;
  recipientId: string;
  senderName: string;
  type: "comment";
  threadId: string;
  threadTitle: string;
  read: boolean;
  createdAt: Timestamp;
}

export function NotificationBell() {
  const { user, userProfile } = useAuth();
  const userId = user?.uid ?? userProfile?.uid;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!db || !userId) return;
    const q = query(
      collection(db, "notifications"),
      where("recipientId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setNotifications(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Notification))
      );
    });
    return unsub;
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = async () => {
    if (!db) return;
    const unread = notifications.filter((n) => !n.read);
    await Promise.all(
      unread.map((n) =>
        updateDoc(doc(db, "notifications", n.id), { read: true })
      )
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition cursor-pointer"
        aria-label="Notificaciones"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h3 className="text-sm font-semibold text-slate-900">Notificaciones</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition cursor-pointer"
                >
                  <CheckCheck className="h-3 w-3" /> Marcar leídas
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-slate-400">
                  No hay notificaciones
                </p>
              ) : (
                notifications.slice(0, 10).map((n) => (
                  <Link
                    key={n.id}
                    to={`/foro/${n.threadId}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-start gap-3 border-b border-slate-50 px-4 py-3 text-sm transition hover:bg-slate-50 ${
                      !n.read ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <div className="min-w-0">
                      <p className="text-slate-700">
                        <span className="font-medium">{n.senderName}</span>{" "}
                        comentó en{" "}
                        <span className="font-medium">{n.threadTitle}</span>
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
