import { Check, AlertTriangle, ShieldCheck } from "lucide-react";

const items = [
  { ok: true, text: "Validación y sanitización de inputs en todos los endpoints." },
  { ok: true, text: "Autenticación con tokens de corta duración y rotación de refresh." },
  { ok: true, text: "Consentimiento informado y granular para recopilar datos personales." },
  { ok: false, text: "Auditoría de sesgo en modelos de IA antes de cada release." },
  { ok: false, text: "Documento de impacto ético adjunto a features de alto riesgo." },
];

const completed = items.filter((i) => i.ok).length;
const total = items.length;
const pct = Math.round((completed / total) * 100);

export function Checklist() {
  return (
    <section id="checklist" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Outer shell (Double-Bezel) */}
      <div className="rounded-[2rem] bg-zinc-100 p-1.5 ring-1 ring-zinc-200/60 dark:bg-zinc-800/50 dark:ring-white/10">
        {/* Inner core */}
        <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:bg-zinc-900 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            {/* Left — Info */}
            <div className="flex flex-col justify-center border-b border-zinc-100 p-8 lg:border-b-0 lg:border-r lg:p-12 dark:border-zinc-800">
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                Antes de hacer deploy, revisa esto
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Una lista viva, alineada a estándares OWASP y principios de
                ética profesional. Comparte tus mejoras con la comunidad.
              </p>

              {/* Progress indicator */}
              <div className="mt-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {completed}/{total} completados
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {pct}%
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="btn-primary text-sm">
                  <ShieldCheck className="h-4 w-4" /> Aplicar al proyecto
                </button>
                <button className="btn-secondary text-sm">
                  Descargar PDF
                </button>
              </div>
            </div>

            {/* Right — Checklist */}
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {items.map((it, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-5 transition-colors duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                >
                  <span
                    className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-transform duration-300 ${
                      it.ok
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"
                    }`}
                  >
                    {it.ok ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {it.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
