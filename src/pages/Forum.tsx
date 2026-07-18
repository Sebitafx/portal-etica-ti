import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";
import { ForumSidebar } from "@/components/forum/ForumSidebar";
import { ThreadCard } from "@/components/forum/ThreadCard";
import { Pagination } from "@/components/forum/Pagination";
import { Plus, MessageSquare } from "lucide-react";
import { MOCK_THREADS } from "@/lib/mocks";

interface Thread {
  threadId: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  categoryId: string;
  isClosed: boolean;
  commentCount: number;
  createdAt: string;
  keywords?: string[];
}

const PER_PAGE = 3;

export default function Forum() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [page, setPage] = useState(1);
  const { user, userProfile } = useAuth();
  const authed = !!(user || userProfile);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "threads"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setThreads(
        snap.docs.map((d) => ({ threadId: d.id, ...d.data() } as Thread))
      );
    });
    return unsub;
  }, []);

  // Sync search from URL on mount
  useEffect(() => {
    const q = searchParams.get("search") ?? "";
    setSearch(q);
  }, [searchParams]);

  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
    if (q) {
      setSearchParams({ search: q });
    } else {
      setSearchParams({});
    }
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const displayThreads = threads.length > 0 ? threads : MOCK_THREADS;

  const filtered = displayThreads.filter((t) => {
    const matchCategory = activeCategory === "Todos" || t.categoryId === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.body.toLowerCase().includes(q) ||
      t.keywords?.some((kw: string) => kw.toLowerCase().includes(q));
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section className="min-h-screen bg-[var(--color-background)] dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Comunidad
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Foro de discusión
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Debate dilemas, comparte hallazgos y aprende de otros profesionales.
            </p>
          </div>
        </div>

        {authed && (
          <Link
            to="/foro/nuevo"
            className="mb-6 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-zinc-900/50"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <Plus className="h-5 w-5" />
            </div>
            <span className="flex-1 text-sm text-zinc-500 dark:text-zinc-400">
              Inicia un nuevo debate ético…
            </span>
            <span className="btn-primary text-sm">
              <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Publicar</span>
            </span>
          </Link>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <ForumSidebar
            active={activeCategory}
            onSelect={handleCategory}
            searchQuery={search}
            onSearchChange={handleSearch}
          />

          <div className="flex flex-col gap-3">
            {paged.length === 0 ? (
              <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <MessageSquare className="mx-auto mb-3 h-8 w-8 text-zinc-300 dark:text-zinc-700" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {search
                    ? "No se encontraron hilos con esa búsqueda."
                    : "No hay hilos en esta categoría todavía."}
                </p>
                {authed && (
                  <Link to="/foro/nuevo" className="btn-primary mt-4 inline-flex">
                    <Plus className="h-4 w-4" /> Crear primer hilo
                  </Link>
                )}
              </div>
            ) : (
              <>
                <p className="text-xs text-zinc-400 px-1 dark:text-zinc-500">
                  {filtered.length} hilo{filtered.length !== 1 ? "s" : ""}
                  {search && ` para "${search}"`}
                </p>
                {paged.map((t) => (
                  <ThreadCard key={t.threadId} thread={t} />
                ))}
                <Pagination
                  current={page}
                  total={filtered.length}
                  perPage={PER_PAGE}
                  onChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
