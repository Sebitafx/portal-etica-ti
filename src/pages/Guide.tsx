import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Code2, 
  TestTube2, 
  Rocket, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileWarning
} from "lucide-react";

const STEPS = [
  {
    id: "design",
    title: "1. Diseño y Arquitectura",
    icon: ShieldCheck,
    description: "La ética comienza antes de escribir una sola línea de código.",
    theory: "El concepto de 'Privacidad por Diseño' (Privacy by Design) establece que la protección de datos debe estar integrada en la arquitectura del sistema desde el primer día. Minimizar la recolección de datos no solo es una buena práctica técnica, sino una obligación ética respaldada por normativas como el GDPR.",
    practices: [
      "No solicites datos personales que no sean estrictamente necesarios para la función.",
      "Aplica el principio del menor privilegio (Principle of Least Privilege).",
      "Diseña interfaces transparentes, sin 'dark patterns' que engañen al usuario.",
    ],
    dilemma: "¿Qué hacer si Marketing te pide recolectar la ubicación del usuario 'por si acaso' en el futuro? La respuesta ética es negarse o exigir que la recolección sea explícita y opt-in."
  },
  {
    id: "development",
    title: "2. Desarrollo y Codificación",
    icon: Code2,
    description: "Construir software seguro es el núcleo de la integridad profesional.",
    theory: "Escribir código con vulnerabilidades conocidas por falta de tiempo o pereza es una falta grave a la responsabilidad profesional (Código Ético de ACM). Los estándares internacionales como el OWASP Top 10 detallan las fallas más críticas que los desarrolladores deben prevenir.",
    practices: [
      "Sanitiza todas las entradas de los usuarios para evitar inyecciones SQL o XSS.",
      "Nunca dejes credenciales, tokens o secretos 'harcodeados' en el código fuente.",
      "Usa dependencias y librerías actualizadas y verifica sus vulnerabilidades.",
    ],
    dilemma: "Descubres que una librería usada en el sistema central tiene una vulnerabilidad crítica, pero actualizarla retrasará el lanzamiento. El código IEEE exige priorizar la seguridad pública por encima de los plazos corporativos."
  },
  {
    id: "testing",
    title: "3. Pruebas y Auditoría",
    icon: TestTube2,
    description: "Garantizar que el sistema es justo y funciona como se espera.",
    theory: "Las pruebas no solo deben buscar errores funcionales, sino sesgos algorítmicos y fallas de seguridad. En sistemas que usan IA o algoritmos de decisión, es crucial auditar si los resultados discriminan injustamente a ciertos grupos de personas.",
    practices: [
      "Asegúrate de que los datos de prueba sean representativos y diversos.",
      "Realiza pruebas de penetración (pentesting) si el sistema maneja datos críticos.",
      "Implementa pruebas unitarias para todas las funciones relacionadas a permisos.",
    ],
    dilemma: "El modelo de IA del departamento de RRHH tiene un 95% de precisión, pero descubres que penaliza injustamente a minorías. Desplegarlo así violaría el principio ético de justicia y no discriminación."
  },
  {
    id: "deployment",
    title: "4. Despliegue y Mantenimiento",
    icon: Rocket,
    description: "El compromiso con el software no termina cuando se publica.",
    theory: "La transparencia y la rendición de cuentas son vitales. Si el sistema falla o hay una brecha de datos, la organización debe ser capaz de rastrear qué pasó (logs) y notificar a los afectados rápidamente.",
    practices: [
      "Implementa un sistema de logs seguro que registre eventos críticos (sin guardar contraseñas).",
      "Ten un plan de respuesta a incidentes listo antes del lanzamiento.",
      "Mantén canales abiertos para que investigadores reporten vulnerabilidades.",
    ],
    dilemma: "Ocurrió una fuga de datos menor pero nadie la notó externamente. El protocolo ético (y legal en muchos países) exige notificar la brecha, no encubrirla."
  }
];

export function Guide() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepData = STEPS[currentStep];
  const Icon = stepData.icon;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-emerald-500/30">
      
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Guía Interactiva: El Ciclo de Vida Ético
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
            La ética y las buenas prácticas no son una ocurrencia tardía, deben integrarse en cada fase de la construcción de software.
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="relative flex flex-col items-center">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setCurrentStep(index)}
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isActive 
                          ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" 
                          : isCompleted 
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500"
                      }`}
                    >
                      <StepIcon className="h-5 w-5" />
                    </button>
                    {/* Connecting Line */}
                    {index < STEPS.length - 1 && (
                      <div 
                        className={`absolute left-1/2 top-6 -z-10 h-[2px] w-[calc(100%+3rem)] sm:w-[calc(100%+6rem)] -translate-y-1/2 transition-colors duration-300 ${
                          isCompleted ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-800"
                        }`} 
                      />
                    )}
                  </div>
                  <span className={`mt-3 hidden sm:block text-xs font-semibold ${
                    isActive ? "text-emerald-600 dark:text-emerald-400" : isCompleted ? "text-zinc-900 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-600"
                  }`}>
                    {step.title.split('. ')[1]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <div className="animate-fade-in-up rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl sm:p-10 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{stepData.title}</h2>
              <p className="text-zinc-500 dark:text-zinc-400">{stepData.description}</p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                <FileWarning className="h-5 w-5 text-indigo-500" />
                Contexto Normativo y Ético
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                {stepData.theory}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Mejores Prácticas
              </h3>
              <ul className="space-y-3">
                {stepData.practices.map((practice, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {i + 1}
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300">{practice}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/30 dark:bg-amber-900/10">
              <h3 className="text-base font-bold text-amber-900 dark:text-amber-300 mb-2">
                Dilema Ético Práctico
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-400/90 italic">
                "{stepData.dilemma}"
              </p>
            </section>
          </div>

          {/* Navigation Buttons inside Card */}
          <div className="mt-10 flex items-center justify-between border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <ArrowLeft className="h-4 w-4" /> Anterior
            </button>
            
            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2"
              >
                Siguiente Fase <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <Link to="/checklist" className="btn-secondary flex items-center gap-2">
                Ir al Checklist de Seguridad <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
