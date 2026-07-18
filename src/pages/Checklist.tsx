import { useState } from "react";
import { CheckCircle2, Circle, Printer, AlertTriangle, ShieldCheck, Lock, Scale, Server } from "lucide-react";

const CHECKLIST_SECTIONS = [
  {
    title: "1. Privacidad y Consentimiento",
    icon: ShieldCheck,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    items: [
      { id: "p1", text: "El sistema recolecta únicamente los datos personales estrictamente necesarios." },
      { id: "p2", text: "Se obtiene consentimiento explícito del usuario antes de recopilar o procesar datos." },
      { id: "p3", text: "Existe una política de privacidad accesible, clara y sin jerga legal confusa." },
      { id: "p4", text: "Los usuarios tienen una forma sencilla de solicitar la eliminación de su cuenta y sus datos." }
    ]
  },
  {
    title: "2. Seguridad y Autenticación",
    icon: Lock,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    items: [
      { id: "s1", text: "Las contraseñas se almacenan usando algoritmos de hash seguros (ej. bcrypt)." },
      { id: "s2", text: "Se han configurado Reglas de Seguridad en la Base de Datos." },
      { id: "s3", text: "Los inputs de usuario están sanitizados para prevenir inyecciones SQL y ataques XSS." },
      { id: "s4", text: "No hay credenciales o tokens de API expuestos en el código fuente (harcodeados)." },
      { id: "s5", text: "El sitio obliga el uso de HTTPS para cifrar toda la comunicación." }
    ]
  },
  {
    title: "3. Equidad y Sesgo Algorítmico",
    icon: Scale,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-500/10",
    items: [
      { id: "e1", text: "Si el sistema toma decisiones automatizadas, se ha evaluado el riesgo de sesgo." },
      { id: "e2", text: "Los datos de prueba utilizados para validar el software son representativos y diversos." },
      { id: "e3", text: "Existen mecanismos para que los usuarios puedan apelar o reportar un resultado injusto." }
    ]
  },
  {
    title: "4. Operaciones y Mantenimiento",
    icon: Server,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-500/10",
    items: [
      { id: "o1", text: "Existe un registro (log) de eventos críticos para auditorías en caso de fallas." },
      { id: "o2", text: "El equipo tiene un plan documentado de respuesta ante incidentes o brechas de datos." },
      { id: "o3", text: "Se han eliminado o anonimizado todos los datos de prueba antes de pasar a producción." }
    ]
  }
];

export function Checklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const totalItems = CHECKLIST_SECTIONS.reduce((acc, sec) => acc + sec.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-emerald-500/30 print:bg-white">
      
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 print:px-0 print:py-8">
        
        {/* Header Section */}
        <div className="relative mb-12 overflow-hidden rounded-3xl bg-zinc-900 px-8 py-12 shadow-2xl print:hidden dark:bg-zinc-900">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-md">
              <ShieldCheck className="h-10 w-10 text-emerald-400" />
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Release Checklist
            </h1>
            <p className="max-w-2xl text-lg text-zinc-300">
              La ética no es un extra, es el núcleo de un buen software. Audita tu proyecto técnica y éticamente antes del despliegue final a producción.
            </p>
            
            <div className="mt-8 flex items-center gap-4">
              <button 
                onClick={handlePrint}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-500 px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
                <Printer className="relative z-10 h-5 w-5" />
                <span className="relative z-10">Imprimir Reporte (PDF)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar (Hidden on print) */}
        <div className="mb-12 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 print:hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100">Progreso de Auditoría</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{completedItems} de {totalItems} verificaciones completadas</span>
            </div>
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{progress}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Print Only Title */}
        <div className="hidden print:block mb-8 pb-4 border-b-2 border-black">
          <h1 className="text-3xl font-extrabold text-black mb-6">Auditoría de Despliegue (EthicCode)</h1>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div><strong>Proyecto:</strong> _________________________________</div>
            <div><strong>Fecha:</strong> _________________________________</div>
            <div><strong>Auditor Principal:</strong> ___________________________</div>
            <div><strong>Firma:</strong> _________________________________</div>
          </div>
        </div>

        {/* Checklist Content */}
        <div className="grid gap-8 sm:grid-cols-2 print:block print:space-y-8">
          {CHECKLIST_SECTIONS.map((section, idx) => {
            const SectionIcon = section.icon;
            return (
            <section key={idx} className="flex flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 print:border-none print:p-0 print:shadow-none">
              <div className="mb-6 flex items-center gap-4 print:mb-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${section.bg} ${section.color} print:hidden`}>
                  <SectionIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 print:text-lg print:text-black">
                  {section.title}
                </h3>
              </div>
              
              <div className="flex-1 space-y-3 print:space-y-4">
                {section.items.map((item) => {
                  const isChecked = checkedItems[item.id];
                  return (
                    <div 
                      key={item.id} 
                      className={`group flex items-start gap-3 rounded-xl border p-4 transition-all cursor-pointer print:border-none print:p-0 print:cursor-default ${
                        isChecked 
                          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-900/10" 
                          : "border-zinc-100 hover:border-emerald-100 bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="mt-0.5 shrink-0 print:hidden transition-transform group-hover:scale-110">
                        {isChecked ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-zinc-300 dark:text-zinc-600" />
                        )}
                      </div>
                      
                      {/* Print only checkbox box */}
                      <div className="hidden print:block mt-0.5 shrink-0">
                        <div className="h-4 w-4 border-2 border-black rounded-sm" />
                      </div>

                      <div className="flex-1">
                        <p className={`text-sm leading-relaxed transition-colors ${isChecked ? "text-emerald-900 font-medium dark:text-emerald-100 print:text-black" : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 print:text-black"}`}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )})}
        </div>

        {/* Print Only Signature Box */}
        <div className="hidden print:flex mt-16 pt-8 border-t-2 border-black justify-between break-inside-avoid">
          <div className="text-center w-64">
            <div className="border-b border-black mb-2 h-16" />
            <p className="text-sm font-bold text-black">V°B° Responsable de QA / Ética</p>
          </div>
          <div className="text-center w-64">
            <div className="border-b border-black mb-2 h-16" />
            <p className="text-sm font-bold text-black">V°B° Líder Técnico / CTO</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 flex items-start gap-4 rounded-2xl border border-amber-200/50 bg-amber-50 p-6 dark:border-amber-900/30 dark:bg-amber-900/10 print:hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-sm text-amber-800 dark:text-amber-400/90 leading-relaxed">
            <strong className="block mb-1 font-bold text-amber-900 dark:text-amber-300">Aviso Legal y Educativo:</strong> 
            Este checklist es una herramienta de referencia basada en estándares internacionales (OWASP, GDPR, Códigos de Ética IEEE/ACM). Su uso no constituye asesoramiento legal vinculante ni garantiza la ausencia total de vulnerabilidades en el sistema.
          </p>
        </div>

      </main>
    </div>
  );
}
