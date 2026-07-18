import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { onSnapshot } from "firebase/firestore";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Shield, Plus, Trash2, X, Check } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description?: string;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category)));
    });
    return unsub;
  }, []);

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !db) return;
    
    setIsAdding(true);
    try {
      await addDoc(collection(db, "categories"), {
        name: newName.trim(),
        description: newDesc.trim() || "",
      });
      toast.success("Categoría agregada con éxito");
      setNewName("");
      setNewDesc("");
    } catch (err: any) {
      console.error("Error al agregar categoría", err);
      toast.error("Error al agregar la categoría: " + (err.message || ""));
    } finally {
      setIsAdding(false);
    }
  };

  const removeCategory = async (id: string) => {
    if (!db || !confirm("¿Eliminar esta categoría?")) return;
    try {
      await deleteDoc(doc(db, "categories", id));
      toast.success("Categoría eliminada");
    } catch (err) {
      toast.error("Error al eliminar la categoría");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Link
          to="/admin"
          className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al panel
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">Categorías</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Administra las categorías del foro
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 p-6 mb-6">
          <form onSubmit={addCategory} className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Nombre</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ej: Ética Digital"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 px-4 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 dark:focus:border-zinc-500"
                required
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Descripción</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Opcional"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 px-4 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 dark:focus:border-zinc-500"
              />
            </div>
            <button type="submit" disabled={isAdding} className="btn-primary text-sm disabled:opacity-50">
              <Plus className="h-4 w-4" /> {isAdding ? "Agregando..." : "Agregar"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">{c.name}</TableCell>
                  <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">{c.description || "—"}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => removeCategory(c.id)}
                      className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 transition cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" /> Eliminar
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
