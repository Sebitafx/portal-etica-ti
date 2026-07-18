import { Component, Microscope, Fingerprint, ArrowRight, PlayCircle, Lock, Users, Activity, CheckCircle2, AlertTriangle, Download, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FcGraduationCap, FcLibrary, FcPrivacy } from "react-icons/fc";

export function Features() {
  return (
    <section id="casos" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-20 text-center md:mb-32">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Diseña sin comprometer la ética.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
          Un kit de herramientas completo para integrar la responsabilidad en cada fase de tu proceso de desarrollo.
        </p>
      </div>

      <div className="space-y-24 md:space-y-32">
        {/* Feature 1 (Text Left, Image Right) */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex-1 space-y-6 lg:max-w-xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <FcGraduationCap className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Guía Interactiva
            </h3>
            <p className="text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
              Lecciones modulares sobre privacidad, sesgo algorítmico y responsabilidad profesional. Aprende con ejemplos reales y ejercicios prácticos que te preparan para los desafíos éticos del mundo tech.
            </p>
            <Link 
              to="/guia"
              className="btn-primary mt-4 cursor-pointer"
            >
              Explorar módulos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
              {/* Mock UI: Guía Interactiva (Stepper) */}
              <div className="flex h-full flex-col bg-white p-6 dark:bg-zinc-950">
                <div className="mb-6 flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800/60">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">1. Diseño y Arquitectura</span>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900/30 dark:bg-emerald-900/10">
                    <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1">Privacidad por Diseño</h4>
                    <p className="text-[10px] leading-relaxed text-emerald-700 dark:text-emerald-400">
                      Integra la protección de datos en la arquitectura desde el primer día. Minimiza la recolección.
                    </p>
                  </div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                    <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 mb-1">Dilema Ético</h4>
                    <p className="text-[10px] leading-relaxed text-amber-800 dark:text-amber-400 italic">
                      "¿Qué hacer si Marketing te pide recolectar ubicación 'por si acaso'?"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 (Image Left, Text Right) */}
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
              {/* Mock UI: Casos de Estudio */}
              <div className="grid h-full grid-cols-2 gap-2 p-2 bg-zinc-100 dark:bg-zinc-950">
                <div className="relative h-full overflow-hidden rounded-[20px]">
                  <img src="/images/cases/case-1.jpg" className="absolute inset-0 h-full w-full object-cover" alt="Escándalo Cambridge Analytica" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <span className="mb-2 inline-block rounded-full bg-indigo-500/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">Destacado</span>
                    <h5 className="text-sm font-bold text-white">Escándalo Cambridge Analytica</h5>
                    <p className="mt-1 text-xs text-zinc-300">Violación masiva de privacidad e influencia electoral.</p>
                  </div>
                </div>
                <div className="grid grid-rows-2 gap-2">
                  <div className="relative overflow-hidden rounded-[20px]">
                    <img src="/images/cases/case-2.jpg" className="absolute inset-0 h-full w-full object-cover" alt="Therac-25: Radiación Letal" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h5 className="text-xs font-bold text-white">Therac-25: Radiación Letal</h5>
                      <p className="mt-1 text-[10px] text-zinc-300">Negligencia y fallas de software médico.</p>
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[20px] bg-zinc-900 border border-zinc-800">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 mb-2">
                      <span className="text-sm font-bold text-white">+58</span>
                    </div>
                    <p className="text-[10px] font-medium text-zinc-400">Ver biblioteca completa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-6 lg:max-w-xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <FcLibrary className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Casos de Estudio
            </h3>
            <p className="text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
              Analiza dilemas reales: filtraciones masivas, vigilancia desproporcionada, dark patterns y decisiones sesgadas de IA. Desglosamos el código y las políticas que fallaron.
            </p>
            <Link 
              to="/casos"
              className="btn-secondary mt-4 cursor-pointer"
            >
              Ver biblioteca <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Feature 3 (Text Left, Image Right) */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex-1 space-y-6 lg:max-w-xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <FcPrivacy className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Checklist de Seguridad
            </h3>
            <p className="text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
              Lista accionable para auditar tu código y procesos antes de cada despliegue. Alineado con OWASP y mejores prácticas, asegura que tu aplicación sea segura por defecto.
            </p>
            <Link 
              to="/checklist"
              className="btn-secondary mt-4 cursor-pointer"
            >
              Generar checklist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
              {/* Mock UI: Checklist de Seguridad */}
              <div className="flex h-full flex-col bg-white p-6 dark:bg-zinc-950">
                <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800/60">
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Release Checklist</span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">2/3 Completado</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3 rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800/60 dark:hover:bg-zinc-900/50">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Sanitización de Inputs</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Evitar inyecciones SQL y XSS.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800/60 dark:hover:bg-zinc-900/50">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Consentimiento Granular</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">El usuario aceptó explícitamente.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-amber-200/50 bg-amber-50 p-3 transition-colors dark:border-amber-900/30 dark:bg-amber-900/10">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Auditoría de Sesgo Algorítmico</p>
                      <p className="text-xs text-amber-700 dark:text-amber-400">Pendiente revisión por el equipo ético.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
