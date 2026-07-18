import { useState, useEffect } from "react";
import { Search, Users, AlertTriangle, ShieldCheck, MessageSquare, Plus, Trash2 } from "lucide-react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";
import { MOCK_CATEGORIES } from "@/lib/mocks";

interface Category {
  id: string;
  name: string;
  description?: string;
}

const iconMap: Record<string, typeof Users> = {
  "Ética Digital": AlertTriangle,
  "Bioética": ShieldCheck,
  "Ética Profesional": Users,
  "Ética Ambiental": MessageSquare,
  "Dilemas Morales": AlertTriangle,
};

const defaultIcon = Users;

export function ForumSidebar({
  active,
  onSelect,
  searchQuery,
  onSearchChange,
}: {
  active: string;
  onSelect: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category)));
    });
    return unsub;
  }, []);

  const displayCategories = categories.length > 0 ? categories : MOCK_CATEGORIES;
  const allItems: Category[] = [{ id: "todos", name: "Todos", description: "Ver todos los hilos" }, ...displayCategories];

  const handleDelete = async (e: React.MouseEvent, catId: string) => {
    e.stopPropagation();
    if (!confirm("¿Eliminar esta categoría?")) return;
    await deleteDoc(doc(db, "categories", catId));
  };

  return (
    <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-4 lg:sticky lg:top-24 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar..."
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 pl-10 text-sm outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/50"
        />
      </div>
      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        Categorías
      </p>
      <ul className="flex flex-col gap-1">
        {allItems.map((cat) => {
          const Icon = iconMap[cat.name] ?? defaultIcon;
          const isActive = active === cat.name;
          return (
            <li key={cat.id}>
              <button
                onClick={() => onSelect(cat.name)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition cursor-pointer ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {cat.name}
                </span>
                {isAdmin && cat.id !== "todos" && (
                  <button
                    onClick={(e) => handleDelete(e, cat.id)}
                    className="text-zinc-400 hover:text-red-500 transition cursor-pointer dark:text-zinc-500 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
