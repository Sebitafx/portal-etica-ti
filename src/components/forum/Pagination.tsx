import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  current: number;
  total: number;
  perPage: number;
  onChange: (page: number) => void;
}

export function Pagination({ current, total, perPage, onChange }: Props) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current <= 1}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition cursor-pointer ${
            p === current
              ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950"
              : "border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current >= pages}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
