import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[var(--color-background)] dark:bg-zinc-950 animate-fade-in-up"
    >
      <AnimatedBackground />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Content */}
          <div className="max-w-xl">
            {/* Headline */}
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-zinc-50">
              Codifica con{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
                Responsabilidad
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-500 sm:text-lg dark:text-zinc-400">
              Un espacio para desarrolladores que creen que el código que
              escribimos hoy define la sociedad de mañana.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/foro" className="btn-primary group">
                Explorar Foro
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              <a href="#checklist" className="btn-secondary">
                Ver Checklist
              </a>
            </div>

            {/* Stats */}
            <dl className="mt-16 flex items-center gap-8">
              {[
                { k: "50+", v: "Casos de estudio" },
                { k: "8.4k", v: "Devs en la comunidad" },
                { k: "42", v: "Guías interactivas" },
              ].map((s, i) => (
                <div
                  key={s.v}
                  className={`${i !== 0 ? "border-l border-zinc-200 pl-8 dark:border-zinc-800" : ""}`}
                >
                  <dt className="text-2xl font-extrabold text-zinc-900 sm:text-3xl dark:text-zinc-50">
                    {s.k}
                  </dt>
                  <dd className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-500">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — Visual Element */}
          <div className="relative hidden lg:block">
            {/* Outer shell (Double-Bezel) */}
            <div className="rounded-[2rem] bg-zinc-100 p-2 ring-1 ring-zinc-200/60 dark:bg-zinc-800/50 dark:ring-white/10">
              {/* Inner core */}
              <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-white p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:bg-zinc-900 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                {/* Simulated code editor */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                    <span className="ml-3 text-xs text-zinc-400 font-mono">ethic-check.ts</span>
                  </div>
                  <pre className="text-[13px] leading-relaxed font-mono">
                    <code>
                      <span className="text-emerald-600 dark:text-emerald-400">function</span>{" "}
                      <span className="text-zinc-800 dark:text-zinc-200">validateEthics</span>
                      <span className="text-zinc-400">(</span>
                      <span className="text-amber-600 dark:text-amber-400">data</span>
                      <span className="text-zinc-400">)</span>{" "}
                      <span className="text-zinc-400">{"{"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-zinc-400">{"// "}Verificar consentimiento</span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-600 dark:text-purple-400">if</span>{" "}
                      <span className="text-zinc-400">(!</span>
                      <span className="text-zinc-800 dark:text-zinc-200">data</span>
                      <span className="text-zinc-400">.</span>
                      <span className="text-zinc-800 dark:text-zinc-200">consent</span>
                      <span className="text-zinc-400">)</span>{" "}
                      <span className="text-zinc-400">{"{"}</span>
                      {"\n"}
                      {"    "}
                      <span className="text-emerald-600 dark:text-emerald-400">throw</span>{" "}
                      <span className="text-rose-500 dark:text-rose-400">'Sin consentimiento'</span>
                      {"\n"}
                      {"  "}
                      <span className="text-zinc-400">{"}"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-emerald-600 dark:text-emerald-400">return</span>{" "}
                      <span className="text-emerald-500">✓ Ético</span>
                      {"\n"}
                      <span className="text-zinc-400">{"}"}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
