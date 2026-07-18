import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcLibrary } from "react-icons/fc";
import { ArrowRight, Search } from "lucide-react";
import casesData from "@/data/cases.json";

export default function Cases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories]);

  // Get unique categories
  const categories = [...new Set(casesData.map(c => c.category))];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Filter cases
  const filteredCases = casesData.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(c.category);
    return matchesSearch && matchesCategory;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 px-4 py-24 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 to-zinc-50 dark:from-indigo-500/20 dark:to-zinc-900" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald-200/50 dark:bg-emerald-500/20 blur-[100px]" />
          <div className="absolute left-0 bottom-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-blue-200/50 dark:bg-blue-500/20 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 shadow-xl dark:shadow-2xl backdrop-blur-xl">
            <FcLibrary className="h-14 w-14" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
            Biblioteca de Casos
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-zinc-600 dark:text-zinc-300">
            Aprende de los errores del pasado. Explora nuestro catálogo de {casesData.length} casos de estudio reales, documentados y analizados.
          </p>

          {/* Search and Filters */}
          <div className="mt-10 mx-auto max-w-2xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-zinc-400 dark:text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar casos..."
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 py-4 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 shadow-xl backdrop-blur-md outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategories([])}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  selectedCategories.length === 0 
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-500" 
                    : "bg-white dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                }`}
              >
                Todas
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    selectedCategories.includes(cat) 
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-500" 
                      : "bg-white dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Casos */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {filteredCases.length} Casos Encontrados
          </h2>
        </div>

        {filteredCases.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-zinc-500 dark:text-zinc-400">No se encontraron casos que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCases.map((c) => (
              <div key={c.id} className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={c.image} 
                    alt={c.title} 
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-900 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-50 shadow-sm">
                    {c.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50 line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                    {c.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800 mt-auto">
                    <span className="text-xs text-zinc-500 font-medium">{c.date}</span>
                    <Link 
                      to={`/casos/${c.id}`}
                      className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                    >
                      Leer caso <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-2xl font-bold bg-zinc-100 text-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Anterior
            </button>
            
            <div className="hidden sm:flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className={`h-12 w-12 rounded-2xl font-bold transition-all ${
                    currentPage === i + 1 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110" 
                      : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-2xl font-bold bg-zinc-100 text-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
