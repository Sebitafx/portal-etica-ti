import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import casesData from "@/data/cases.json";

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const caseItem = casesData.find(c => c.id === id);

  if (!caseItem) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Caso no encontrado</h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">El caso que intentas buscar no existe o fue removido.</p>
        <button 
          onClick={() => navigate("/casos")}
          className="btn-primary mt-8"
        >
          Volver a la Biblioteca
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[var(--color-background)] pb-24">
      {/* Cover Image Header */}
      <div className="relative h-[40vh] min-h-[300px] w-full lg:h-[50vh]">
        <div className="absolute inset-0">
          <img 
            src={caseItem.image} 
            alt={caseItem.title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 w-full">
          <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
            <Link 
              to="/casos"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a la Biblioteca
            </Link>
            
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
              <Tag className="h-3 w-3" /> {caseItem.category}
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              {caseItem.title}
            </h1>
            
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-medium text-zinc-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{caseItem.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{caseItem.readTime} lectura</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-300 font-medium mb-12 border-l-4 border-indigo-500 pl-6">
          {caseItem.description}
        </p>

        <div className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {caseItem.content.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-12 mb-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            // Fix bold text parsing simply
            const parts = paragraph.split(/(\*\*.*?\*\*)/g);
            return (
              <p key={index}>
                {parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-semibold text-zinc-900 dark:text-zinc-50">{part.slice(2, -2)}</strong>;
                  }
                  return part;
                })}
              </p>
            );
          })}
        </div>
        
        <div className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-8 flex justify-between items-center">
          <p className="text-sm text-zinc-500">¿Tienes información adicional sobre este caso?</p>
          <Link to="/foro" className="btn-secondary">Discutir en el Foro</Link>
        </div>
      </div>
    </article>
  );
}
