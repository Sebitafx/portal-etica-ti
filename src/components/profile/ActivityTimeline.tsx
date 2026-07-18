import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { Clock, UserPlus, LogIn, FileText, MessageSquare, Edit3, Trash2, Flag } from "lucide-react";

interface Activity {
  id: string;
  userId: string;
  type: string;
  description: string;
  createdAt: Timestamp;
}

const iconMap: Record<string, typeof Clock> = {
  register: UserPlus,
  login: LogIn,
  logout: LogIn,
  create_thread: FileText,
  create_comment: MessageSquare,
  edit_profile: Edit3,
  delete_thread: Trash2,
  delete_comment: Trash2,
  report: Flag,
  edit_comment: Edit3,
  delete_account: Trash2,
};

export function ActivityTimeline({ userId }: { userId: string }) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(
      collection(db, "activities"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const unsub = onSnapshot(q, (snap) => {
      setActivities(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Activity))
      );
    });
    return unsub;
  }, [userId]);

  if (activities.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 mb-3">Actividad reciente</h3>
      <div className="space-y-2">
        {activities.map((a) => {
          const Icon = iconMap[a.type] ?? Clock;
          return (
            <div key={a.id} className="flex items-start gap-3 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
              <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span>{a.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
