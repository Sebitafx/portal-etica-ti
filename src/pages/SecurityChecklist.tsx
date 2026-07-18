import { Checklist } from "@/components/landing/Checklist";
import { FcPrivacy } from "react-icons/fc";

export default function SecurityChecklist() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-4 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-50 border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <FcPrivacy className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Auditoría de Seguridad
        </h1>
        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
          Asegúrate de cumplir con los estándares éticos y de seguridad antes de cada pase a producción.
        </p>
      </div>

      <div className="-mt-12">
        <Checklist />
      </div>
    </div>
  );
}
