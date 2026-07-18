import { FcGraduationCap, FcIdea, FcLock } from "react-icons/fc";
import { PlayCircle, Lock } from "lucide-react";

export default function Modules() {
  const modules = [
    {
      id: 1,
      title: "Sesgos Cognitivos en IA",
      description: "Aprende cómo los prejuicios humanos se filtran en los algoritmos y cómo mitigarlos.",
      progress: 45,
      locked: false,
      icon: <FcIdea className="h-10 w-10" />
    },
    {
      id: 2,
      title: "Privacidad por Diseño",
      description: "Técnicas de anonimización, protección de datos y cumplimiento del GDPR en arquitectura de software.",
      progress: 0,
      locked: true,
      icon: <FcLock className="h-10 w-10 grayscale opacity-50" />
    },
    {
      id: 3,
      title: "Auditoría Algorítmica",
      description: "Herramientas y marcos de trabajo para evaluar la equidad y transparencia de modelos predictivos.",
      progress: 0,
      locked: true,
      icon: <FcLock className="h-10 w-10 grayscale opacity-50" />
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-50 border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <FcGraduationCap className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Guía Interactiva
        </h1>
        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
          Completa los módulos para obtener tu certificación en Ética Digital.
        </p>
      </div>

      <div className="grid gap-6">
        {modules.map((mod) => (
          <div 
            key={mod.id} 
            className={`relative flex flex-col gap-6 rounded-3xl border p-6 sm:flex-row sm:items-center ${
              mod.locked 
                ? "border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30" 
                : "border-emerald-200 bg-white shadow-lg shadow-emerald-500/5 dark:border-emerald-900/50 dark:bg-zinc-900"
            }`}
          >
            <div className="flex-shrink-0">
              {mod.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className={`text-xl font-bold ${mod.locked ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-900 dark:text-zinc-50"}`}>
                  Módulo {mod.id}: {mod.title}
                </h3>
                {mod.locked && <Lock className="h-4 w-4 text-zinc-400" />}
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {mod.description}
              </p>
              
              {!mod.locked && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                    <span>Progreso</span>
                    <span>{mod.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-1000" 
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="sm:ml-6 flex-shrink-0">
              <button 
                disabled={mod.locked}
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 font-semibold transition-all sm:w-auto ${
                  mod.locked 
                    ? "bg-zinc-200 text-zinc-400 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-600" 
                    : "bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/25"
                }`}
              >
                {mod.locked ? "Bloqueado" : (
                  <>
                    <PlayCircle className="h-5 w-5" />
                    Continuar
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
