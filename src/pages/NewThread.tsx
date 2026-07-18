import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  increment,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Send, Plus, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export default function NewThread() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, userProfile } = useAuth();
  const uid = user?.uid ?? userProfile?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map((d) => ({ id: d.id, name: d.data().name } as Category)));
    });
    return unsub;
  }, []);

  const addKeyword = () => {
    const kw = keywordInput.trim().toLowerCase();
    if (kw && !keywords.includes(kw) && keywords.length < 10) {
      setKeywords([...keywords, kw]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !body.trim() || !category) {
      setError("Completa todos los campos.");
      return;
    }
    if (!uid || !userProfile) return;

    setSubmitting(true);
    try {
      let finalImageUrl = imageUrl.trim() || null;
      
      // Si el usuario subió un archivo, lo guardamos en Storage
      if (imageFile && storage) {
        // Generamos un ID único temporal
        const tempId = Date.now().toString();
        const imageRef = ref(storage, `threads/temp_${tempId}/${imageFile.name}`);
        const uploadResult = await uploadBytes(imageRef, imageFile);
        finalImageUrl = await getDownloadURL(uploadResult.ref);
      }

      const threadData = {
        title: title.trim(),
        body: body.trim(),
        authorId: uid,
        authorName: userProfile.displayName,
        authorPhoto: userProfile.photoURL || "",
        categoryId: category,
        isClosed: false,
        commentCount: 0,
        keywords,
        likes: [],
        imageUrl: finalImageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "threads"), threadData);

      await updateDoc(doc(db, "users", uid), {
        threadCount: increment(1),
      });

      navigate(`/foro/${docRef.id}`);
    } catch (err: any) {
      console.error(err);
      setError("Error al publicar el hilo. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <button
          onClick={() => navigate("/foro")}
          className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 transition cursor-pointer dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al foro
        </button>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="font-display text-2xl font-extrabold text-zinc-900 mb-6 dark:text-zinc-50">
            Nuevo Debate
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="¿Sobre qué tema ético quieres debatir?"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Categoría
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Contenido
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Desarrolla tu planteamiento ético…&#10;Usa **negritas** y *cursivas* con formato markdown."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 min-h-[200px] resize-y dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Añadir Imagen (opcional)
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                      setImageUrl(""); // Limpiar URL si sube archivo
                    }
                  }}
                  className="w-full text-sm text-zinc-500 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100 dark:text-zinc-400 dark:file:bg-emerald-500/20 dark:file:text-emerald-400 dark:hover:file:bg-emerald-500/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Palabras clave (opcional, hasta 10)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addKeyword(); } }}
                  placeholder="Ej: privacidad, IA, datos"
                  className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:focus:border-emerald-500"
                />
                <button type="button" onClick={addKeyword} className="btn-secondary text-sm">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {keywords.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {keywords.map((kw) => (
                    <span key={kw} className="flex items-center gap-1 rounded-lg bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {kw}
                      <button type="button" onClick={() => removeKeyword(kw)} className="text-zinc-400 hover:text-red-500 cursor-pointer dark:hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Publicando…" : "Publicar Debate"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
