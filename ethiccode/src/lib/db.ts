/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db, isFirebaseEnabled, handleFirestoreError } from './firebase';
import { 
  Thread, 
  Comment, 
  Report, 
  UserActivity, 
  UserProfile, 
  ForumCategory, 
  Notification, 
  OperationType 
} from '../types';

// Default pre-populated list of ethics categories
const DEFAULT_CATEGORIES: ForumCategory[] = [
  { id: 'cat_dig', name: 'Ética Digital', description: 'IA, privacidad de datos, algoritmos de recomendación y derechos digitales.' },
  { id: 'cat_bio', name: 'Bioética', description: 'Edición genética, clonación, ética médica y prolongación de la vida.' },
  { id: 'cat_prof', name: 'Ética Profesional', description: 'Responsabilidad laboral, códigos deontológicos y dilemas corporativos.' },
  { id: 'cat_amb', name: 'Ética Ambiental', description: 'Sostenibilidad, justicia climática y nuestra responsabilidad con la biosfera.' },
  { id: 'cat_dil', name: 'Dilemas Morales', description: 'Dilemas teóricos y prácticos clásicos aplicados a la toma de decisiones.' }
];

// Initial mock data to ensure the forum looks vibrant and highly professional on first launch (RNF01, RNF15)
const INITIAL_THREADS: Thread[] = [
  {
    id: 'thread_1',
    title: '¿Es ético utilizar IA generativa para decisiones de recursos humanos?',
    content: 'Actualmente, varias corporaciones de primer nivel están evaluando algoritmos de inteligencia artificial entrenados con perfiles de empleados anteriores para automatizar o sugerir despidos en reestructuraciones. ¿No hereda esto sesgos históricos insalvables? ¿Qué principios de justicia o utilitarismo deberíamos aplicar aquí?',
    category: 'Ética Digital',
    authorId: 'user_sophia',
    authorName: 'Sofía Valenzuela',
    authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString(), // 4 hours ago
    replyCount: 3,
    keywords: ['ia', 'trabajo', 'algoritmos', 'justicia', 'sesgos'],
    isLocked: false
  },
  {
    id: 'thread_2',
    title: 'Los límites morales de la edición genética con CRISPR en embriones',
    content: 'La terapia genética es excelente para erradicar distrofias o enfermedades de Huntington hereditarias, pero, ¿dónde trazamos el límite entre prevención y mejora estética o de capacidades cognitivas? ¿Creará esto una brecha biológica insalvable entre clases socioeconómicas?',
    category: 'Bioética',
    authorId: 'user_marcus',
    authorName: 'Dr. Marcus Thorne',
    authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
    replyCount: 2,
    keywords: ['crispr', 'genetica', 'equidad', 'ciencia'],
    isLocked: false
  },
  {
    id: 'thread_3',
    title: 'El software espía en el trabajo remoto y la autonomía individual',
    content: 'Muchos desarrolladores se quejan de que las empresas instalan "bossware" (software que registra clics, toma capturas de pantalla y rastrea movimientos oculares). Como programadores, ¿estamos moralmente obligados a negarnos a construir estas herramientas de hiper-vigilancia?',
    category: 'Ética Profesional',
    authorId: 'user_elena',
    authorName: 'Elena Rostova',
    authorPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 48 * 3600000).toISOString(), // 2 days ago
    replyCount: 1,
    keywords: ['privacidad', 'bossware', 'desarrollo', 'deontologia'],
    isLocked: false
  },
  {
    id: 'thread_4',
    title: 'Dilema de los vehículos autónomos: Responder al daño inminente',
    content: 'El clásico dilema del tranvía toma vida con los vehículos autónomos. Si un freno autónomo falla, ¿debe el automóvil desviarse para atropellar a una sola persona que cruza legalmente si con ello salva a tres ocupantes que iban distraídos, o debe priorizar la legalidad pasiva sin intervenir? ¿Debería el dueño poder configurar el sesgo de su propio auto?',
    category: 'Dilemas Morales',
    authorId: 'user_pablo',
    authorName: 'Pablo Sotomayor',
    authorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 72 * 3600000).toISOString(), // 3 days ago
    replyCount: 2,
    keywords: ['tranvia', 'vehiculos', 'moral', 'seguridad'],
    isLocked: false
  }
];

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'comm_1',
    threadId: 'thread_1',
    content: 'La IA no tiene empatía. Usar datos históricos solo automatiza los sesgos del pasado de directores racistas o sexistas. Un algoritmo no puede evaluar las circunstancias atenuantes de un despido duro.',
    authorId: 'user_marcus',
    authorName: 'Dr. Marcus Thorne',
    authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 3.5 * 3600000).toISOString()
  },
  {
    id: 'comm_2',
    threadId: 'thread_1',
    content: 'Entiendo el punto, pero considere el utilitarismo: una IA optimizada puede salvar empleos al predecir quiebras corporativas enteras y ajustar los costes dinámicamente con precisión.',
    authorId: 'user_pablo',
    authorName: 'Pablo Sotomayor',
    authorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    quotedCommentId: 'comm_1',
    quotedCommentText: 'La IA no tiene empatía. Usar datos históricos solo automatiza los sesgos del pasado...',
    quotedCommentAuthor: 'Dr. Marcus Thorne'
  },
  {
    id: 'comm_3',
    threadId: 'thread_1',
    content: 'De acuerdo con Pablo. Aunque de todas formas necesitamos auditorías algorítmicas constantes y transparentes como requisito deontológico fundamental.',
    authorId: 'user_elena',
    authorName: 'Elena Rostova',
    authorPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 2.5 * 3600000).toISOString(),
    quotedCommentId: 'comm_2',
    quotedCommentText: 'un algoritmo optimizado puede salvar empleos al predecir quiebras...',
    quotedCommentAuthor: 'Pablo Sotomayor'
  },
  {
    id: 'comm_4',
    threadId: 'thread_2',
    content: 'El problema no es erradicar el Huntington; es obvio que salvar vidas es imperativo. El problema de fondo es la eugenesia comercializada. Si las familias con ingresos altos pueden comprar resistencia a la demencia, mejor concentración y fuerza, crearemos una infra-clase biológicamente desfavorecida.',
    authorId: 'user_sophia',
    authorName: 'Sofía Valenzuela',
    authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 20 * 3600000).toISOString()
  },
  {
    id: 'comm_5',
    threadId: 'thread_2',
    content: 'Es justo. Se necesita regulación gubernamental estricta de orden internacional para obligar a que estas terapias sean patrimonio de salud público y universal.',
    authorId: 'user_elena',
    authorName: 'Elena Rostova',
    authorPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    quotedCommentId: 'comm_4',
    quotedCommentText: 'Si las familias con ingresos altos pueden comprar resistencia a la demencia...',
    quotedCommentAuthor: 'Sofía Valenzuela'
  },
  {
    id: 'comm_6',
    threadId: 'thread_3',
    content: 'Yo renuncié a un trabajo en el que requerían que implementara reconocimiento ocular en la cámara del desarrollador. Sentí que rebajaba la dignidad humana de mis colegas.',
    authorId: 'user_pablo',
    authorName: 'Pablo Sotomayor',
    authorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 40 * 3600000).toISOString()
  },
  {
    id: 'comm_7',
    threadId: 'thread_4',
    content: 'Imagina tener miedo de salir a la calle porque el fabricante programó tu auto para sacrificarte en base a un cálculo numérico frío dictado por un burócrata.',
    authorId: 'user_sophia',
    authorName: 'Sofía Valenzuela',
    authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 60 * 3600000).toISOString()
  },
  {
    id: 'comm_8',
    threadId: 'thread_4',
    content: 'Por otro lado, la conducción humana mata a millones al año simplemente por distracciones, mensajes y ebriedad. El cálculo frío de un auto autónomo, aún con dilemas, salvará el 90% de las vidas.',
    authorId: 'user_marcus',
    authorName: 'Dr. Marcus Thorne',
    authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    createdAt: new Date(Date.now() - 55 * 3600000).toISOString(),
    quotedCommentId: 'comm_7',
    quotedCommentText: 'Imagina tener miedo de salir a la calle porque el fabricante programó tu auto para sacrificarte...',
    quotedCommentAuthor: 'Sofía Valenzuela'
  }
];

const INITIAL_REPORTS: Report[] = [
  {
    id: 'rep_1',
    type: 'comment',
    targetId: 'comm_4',
    threadId: 'thread_2',
    reason: 'Usa términos sensibles sobre eugenesia comercializada',
    reportedBy: 'user_spammer',
    reportedByName: 'Anónimo Curioso',
    contentSummary: 'El problema no es erradicar el Huntington; es obvio que salvar vidas...',
    status: 'pending',
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString()
  }
];

const INITIAL_ACTIVITIES: UserActivity[] = [
  {
    id: 'act_1',
    userId: 'user_sophia',
    type: 'register',
    description: 'Se registró en la plataforma.',
    createdAt: new Date(Date.now() - 50 * 3600000).toISOString()
  },
  {
    id: 'act_2',
    userId: 'user_sophia',
    type: 'create_thread',
    description: 'Creó el hilo: "¿Es ético utilizar IA generativa para decisiones de recursos humanos?"',
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString()
  }
];

const INITIAL_USERS: UserProfile[] = [
  {
    uid: 'user_sophia',
    email: 'sophia@ethics.org',
    displayName: 'Sofía Valenzuela',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    emailVerified: true,
    createdAt: new Date(Date.now() - 50 * 3600000).toISOString(),
    isAdmin: false,
    isBanned: false,
    status: 'active'
  },
  {
    uid: 'user_marcus',
    email: 'marcus@mit.edu',
    displayName: 'Dr. Marcus Thorne',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    emailVerified: true,
    createdAt: new Date(Date.now() - 100 * 3600000).toISOString(),
    isAdmin: false,
    isBanned: false,
    status: 'active'
  },
  {
    uid: 'user_elena',
    email: 'elena.rostova@tech.ru',
    displayName: 'Elena Rostova',
    photoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    emailVerified: true,
    createdAt: new Date(Date.now() - 200 * 3600000).toISOString(),
    isAdmin: true, // Let her be an admin for easy testing! (RF23 bootstrap)
    isBanned: false,
    status: 'active'
  },
  {
    uid: 'user_pablo',
    email: 'pablo@unam.mx',
    displayName: 'Pablo Sotomayor',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    emailVerified: true,
    createdAt: new Date(Date.now() - 150 * 3600000).toISOString(),
    isAdmin: false,
    isBanned: false,
    status: 'active'
  }
];

// Ensure local storage is seeded properly for Simulation Mode
function seedLocalStorageIfNeeded() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('forum_seeded')) {
    localStorage.setItem('forum_categories', JSON.stringify(DEFAULT_CATEGORIES));
    localStorage.setItem('forum_threads', JSON.stringify(INITIAL_THREADS));
    localStorage.setItem('forum_comments', JSON.stringify(INITIAL_COMMENTS));
    localStorage.setItem('forum_reports', JSON.stringify(INITIAL_REPORTS));
    localStorage.setItem('forum_activities', JSON.stringify(INITIAL_ACTIVITIES));
    localStorage.setItem('forum_users', JSON.stringify(INITIAL_USERS));
    localStorage.setItem('forum_notifications', JSON.stringify([]));
    localStorage.setItem('forum_banned_users', JSON.stringify([]));
    localStorage.setItem('forum_seeded', 'true');
  }
}

// Private getter helpers for Simulation mode
function getLocal<T>(key: string): T {
  seedLocalStorageIfNeeded();
  const raw = localStorage.getItem(key);
  return (raw ? JSON.parse(raw) : []) as T;
}

function setLocal<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Interface of our Database Driver
export const forumDb = {
  // ---- SECTIONS / CATEGORIES ----
  async getCategories(): Promise<ForumCategory[]> {
    if (isFirebaseEnabled) {
      try {
        const snap = await getDocs(collection(db, 'categories'));
        const list: ForumCategory[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as ForumCategory));
        return list.length ? list : DEFAULT_CATEGORIES; // fallback automatically
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'categories');
      }
    } else {
      return getLocal<ForumCategory[]>('forum_categories');
    }
  },

  async createCategory(name: string, description: string): Promise<ForumCategory> {
    const newCat: ForumCategory = {
      id: 'cat_' + Math.random().toString(36).substr(2, 9),
      name,
      description
    };
    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'categories', newCat.id), newCat);
        return newCat;
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'categories/' + newCat.id);
      }
    } else {
      const list = getLocal<ForumCategory[]>('forum_categories');
      list.push(newCat);
      setLocal('forum_categories', list);
      return newCat;
    }
  },

  async deleteCategory(id: string): Promise<void> {
    if (isFirebaseEnabled) {
      try {
        await deleteDoc(doc(db, 'categories', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, 'categories/' + id);
      }
    } else {
      let list = getLocal<ForumCategory[]>('forum_categories');
      list = list.filter(c => c.id !== id);
      setLocal('forum_categories', list);
    }
  },

  // ---- THREADS ----
  async getThreads(categoryFilter?: string, searchQuery?: string): Promise<Thread[]> {
    if (isFirebaseEnabled) {
      try {
        const ref = collection(db, 'threads');
        let snap;
        if (categoryFilter) {
          const q = query(ref, where('category', '==', categoryFilter));
          snap = await getDocs(q);
        } else {
          snap = await getDocs(ref);
        }
        let list: Thread[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as Thread));
        
        // Sorting client-side to enforce consistent descending creation order
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Client-side search for support across any field seamlessly
        if (searchQuery) {
          const lower = searchQuery.toLowerCase();
          list = list.filter(t => 
            t.title.toLowerCase().includes(lower) || 
            t.content.toLowerCase().includes(lower) ||
            t.keywords.some(k => k.toLowerCase().includes(lower))
          );
        }
        return list;
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'threads');
      }
    } else {
      let list = getLocal<Thread[]>('forum_threads');
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      if (categoryFilter) {
        list = list.filter(t => t.category === categoryFilter);
      }
      if (searchQuery) {
        const lower = searchQuery.toLowerCase();
        list = list.filter(t => 
          t.title.toLowerCase().includes(lower) || 
          t.content.toLowerCase().includes(lower) ||
          t.keywords.some(k => k.toLowerCase().includes(lower))
        );
      }
      return list;
    }
  },

  async getThreadById(id: string): Promise<Thread | null> {
    if (isFirebaseEnabled) {
      try {
        const docRef = doc(db, 'threads', id);
        const s = await getDoc(docRef);
        return s.exists() ? ({ id: s.id, ...s.data() } as Thread) : null;
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, 'threads/' + id);
      }
    } else {
      const list = getLocal<Thread[]>('forum_threads');
      return list.find(t => t.id === id) || null;
    }
  },

  async createThread(threadData: Omit<Thread, 'id' | 'createdAt' | 'replyCount' | 'isLocked'>): Promise<Thread> {
    const id = 'thread_' + Math.random().toString(36).substr(2, 9);
    const newThread: Thread = {
      ...threadData,
      id,
      createdAt: new Date().toISOString(),
      replyCount: 0,
      isLocked: false,
    };

    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'threads', id), newThread);
        return newThread;
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'threads/' + id);
      }
    } else {
      const list = getLocal<Thread[]>('forum_threads');
      list.unshift(newThread);
      setLocal('forum_threads', list);
      return newThread;
    }
  },

  async updateThread(id: string, updates: Partial<Pick<Thread, 'title' | 'content' | 'category' | 'isLocked'>>): Promise<void> {
    if (isFirebaseEnabled) {
      try {
        const docRef = doc(db, 'threads', id);
        await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, 'threads/' + id);
      }
    } else {
      const list = getLocal<Thread[]>('forum_threads');
      const idx = list.findIndex(t => t.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
        setLocal('forum_threads', list);
      }
    }
  },

  async deleteThread(id: string): Promise<void> {
    if (isFirebaseEnabled) {
      try {
        await deleteDoc(doc(db, 'threads', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, 'threads/' + id);
      }
    } else {
      let list = getLocal<Thread[]>('forum_threads');
      list = list.filter(t => t.id !== id);
      setLocal('forum_threads', list);

      // Clean comments cascade-style to protect against orphans
      let comments = getLocal<Comment[]>('forum_comments');
      comments = comments.filter(c => c.threadId !== id);
      setLocal('forum_comments', comments);
    }
  },

  // ---- COMMENTS ----
  async getComments(threadId: string): Promise<Comment[]> {
    if (isFirebaseEnabled) {
      try {
        const ref = collection(db, 'comments');
        const q = query(ref, where('threadId', '==', threadId));
        const snap = await getDocs(q);
        const list: Comment[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as Comment));
        list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // older comments first
        return list;
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'comments');
      }
    } else {
      const list = getLocal<Comment[]>('forum_comments');
      return list
        .filter(c => c.threadId === threadId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  },

  async createComment(commentData: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    const id = 'comm_' + Math.random().toString(36).substr(2, 9);
    const newComment: Comment = {
      ...commentData,
      id,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'comments', id), newComment);
        
        // Atomicity Guarantee: update response counter in parent thread
        const threadRef = doc(db, 'threads', commentData.threadId);
        const threadSnap = await getDoc(threadRef);
        if (threadSnap.exists()) {
          const currentCount = (threadSnap.data() as Thread).replyCount || 0;
          await updateDoc(threadRef, { replyCount: currentCount + 1 });
        }
        return newComment;
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'comments/' + id);
      }
    } else {
      const list = getLocal<Comment[]>('forum_comments');
      list.push(newComment);
      setLocal('forum_comments', list);

      // Invariant: update response counter in parent thread
      const threads = getLocal<Thread[]>('forum_threads');
      const threadIdx = threads.findIndex(t => t.id === commentData.threadId);
      if (threadIdx !== -1) {
        threads[threadIdx].replyCount = (threads[threadIdx].replyCount || 0) + 1;
        setLocal('forum_threads', threads);

        // Visual Notifications (RF20: Notificar al autor del hilo si recibe comentarios)
        const recipientId = threads[threadIdx].authorId;
        if (recipientId !== commentData.authorId) {
          const notifs = getLocal<Notification[]>('forum_notifications');
          notifs.unshift({
            id: 'notif_' + Math.random().toString(36).substr(2, 9),
            recipientId,
            senderName: commentData.authorName,
            type: 'comment',
            threadId: commentData.threadId,
            threadTitle: threads[threadIdx].title,
            createdAt: new Date().toISOString(),
            read: false
          });
          setLocal('forum_notifications', notifs);
        }
      }
      return newComment;
    }
  },

  async updateComment(id: string, content: string): Promise<void> {
    if (isFirebaseEnabled) {
      try {
        await updateDoc(doc(db, 'comments', id), { content, updatedAt: new Date().toISOString() });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, 'comments/' + id);
      }
    } else {
      const list = getLocal<Comment[]>('forum_comments');
      const idx = list.findIndex(c => c.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], content, updatedAt: new Date().toISOString() };
        setLocal('forum_comments', list);
      }
    }
  },

  async deleteComment(id: string): Promise<void> {
    if (isFirebaseEnabled) {
      try {
        // Retrieve comment for thread reference to decrement click count
        const commentRef = doc(db, 'comments', id);
        const commentSnap = await getDoc(commentRef);
        if (commentSnap.exists()) {
          const commData = commentSnap.data() as Comment;
          await deleteDoc(commentRef);
          
          const threadRef = doc(db, 'threads', commData.threadId);
          const threadSnap = await getDoc(threadRef);
          if (threadSnap.exists()) {
            const currentCount = (threadSnap.data() as Thread).replyCount || 0;
            await updateDoc(threadRef, { replyCount: Math.max(0, currentCount - 1) });
          }
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, 'comments/' + id);
      }
    } else {
      const list = getLocal<Comment[]>('forum_comments');
      const found = list.find(c => c.id === id);
      if (found) {
        const remaining = list.filter(c => c.id !== id);
        setLocal('forum_comments', remaining);

        // Adjust replay counter decrement 
        const threads = getLocal<Thread[]>('forum_threads');
        const threadIdx = threads.findIndex(t => t.id === found.threadId);
        if (threadIdx !== -1) {
          threads[threadIdx].replyCount = Math.max(0, (threads[threadIdx].replyCount || 0) - 1);
          setLocal('forum_threads', threads);
        }
      }
    }
  },

  // ---- REPORTS ----
  async getReports(): Promise<Report[]> {
    if (isFirebaseEnabled) {
      try {
        const snap = await getDocs(collection(db, 'reports'));
        const list: Report[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as Report));
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return list;
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'reports');
      }
    } else {
      const list = getLocal<Report[]>('forum_reports');
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return list;
    }
  },

  async createReport(reportData: Omit<Report, 'id' | 'createdAt' | 'status'>): Promise<Report> {
    const id = 'rep_' + Math.random().toString(36).substr(2, 9);
    const newReport: Report = {
      ...reportData,
      id,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'reports', id), newReport);
        return newReport;
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'reports/' + id);
      }
    } else {
      const list = getLocal<Report[]>('forum_reports');
      list.unshift(newReport);
      setLocal('forum_reports', list);
      return newReport;
    }
  },

  async updateReportStatus(id: string, status: 'resolved' | 'dismissed'): Promise<void> {
    if (isFirebaseEnabled) {
      try {
        await updateDoc(doc(db, 'reports', id), { status });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, 'reports/' + id);
      }
    } else {
      const list = getLocal<Report[]>('forum_reports');
      const idx = list.findIndex(r => r.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], status };
        setLocal('forum_reports', list);
      }
    }
  },

  // ---- NOTIFICATIONS ----
  async getNotifications(userId: string): Promise<Notification[]> {
    if (isFirebaseEnabled) {
      try {
        const q = query(collection(db, 'notifications'), where('recipientId', '==', userId));
        const snap = await getDocs(q);
        const list: Notification[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as Notification));
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'notifications');
      }
    } else {
      const list = getLocal<Notification[]>('forum_notifications');
      return list.filter(n => n.recipientId === userId);
    }
  },

  async markNotificationsRead(userId: string): Promise<void> {
    if (isFirebaseEnabled) {
      try {
        const q = query(collection(db, 'notifications'), where('recipientId', '==', userId), where('read', '==', false));
        const snap = await getDocs(q);
        snap.forEach(async (d) => {
          await updateDoc(doc(db, 'notifications', d.id), { read: true });
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, 'notifications');
      }
    } else {
      const list = getLocal<Notification[]>('forum_notifications');
      list.forEach(n => {
        if (n.recipientId === userId) n.read = true;
      });
      setLocal('forum_notifications', list);
    }
  },

  // ---- USER ACCOUNT PROFILES ----
  async getUsers(): Promise<UserProfile[]> {
    if (isFirebaseEnabled) {
      try {
        const snap = await getDocs(collection(db, 'users'));
        const list: UserProfile[] = [];
        snap.forEach(d => list.push({ uid: d.id, ...d.data() } as UserProfile));
        return list;
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'users');
      }
    } else {
      return getLocal<UserProfile[]>('forum_users');
    }
  },

  async updateUserProfile(uid: string, updates: Partial<Pick<UserProfile, 'displayName' | 'photoURL' | 'isBanned' | 'banReason' | 'status' | 'isAdmin'>>): Promise<void> {
    if (isFirebaseEnabled) {
      try {
        await updateDoc(doc(db, 'users', uid), updates);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, 'users/' + uid);
      }
    } else {
      const list = getLocal<UserProfile[]>('forum_users');
      const idx = list.findIndex(u => u.uid === uid);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates };
        setLocal('forum_users', list);
      }
    }
  },

  async registerUserProfile(profile: UserProfile): Promise<void> {
    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'users', profile.uid), profile);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'users/' + profile.uid);
      }
    } else {
      const list = getLocal<UserProfile[]>('forum_users');
      if (!list.some(u => u.uid === profile.uid)) {
        list.push(profile);
        setLocal('forum_users', list);
      }
    }
  },

  async deleteUserProfile(uid: string): Promise<void> {
    if (isFirebaseEnabled) {
      try {
        await deleteDoc(doc(db, 'users', uid));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, 'users/' + uid);
      }
    } else {
      let list = getLocal<UserProfile[]>('forum_users');
      list = list.filter(u => u.uid !== uid);
      setLocal('forum_users', list);

      // Soft delete threads and comments authored by the user if preferred
      let threads = getLocal<Thread[]>('forum_threads');
      threads.forEach(t => {
        if (t.authorId === uid) {
          t.authorName = '[Usuario Eliminado]';
          t.authorPhoto = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150';
        }
      });
      setLocal('forum_threads', threads);

      let comments = getLocal<Comment[]>('forum_comments');
      comments.forEach(c => {
        if (c.authorId === uid) {
          c.authorName = '[Usuario Eliminado]';
          c.authorPhoto = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150';
        }
      });
      setLocal('forum_comments', comments);
    }
  },

  // ---- ACTIVITY TRACKER (RF07) ----
  async getActivities(userId?: string): Promise<UserActivity[]> {
    if (isFirebaseEnabled) {
      try {
        const ref = collection(db, 'activities');
        let snap;
        if (userId) {
          snap = await getDocs(query(ref, where('userId', '==', userId)));
        } else {
          snap = await getDocs(ref);
        }
        const list: UserActivity[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as UserActivity));
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'activities');
      }
    } else {
      const list = getLocal<UserActivity[]>('forum_activities');
      let result = userId ? list.filter(a => a.userId === userId) : list;
      return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  },

  async logActivity(userId: string, type: UserActivity['type'], description: string): Promise<void> {
    const act: UserActivity = {
      id: 'act_' + Math.random().toString(36).substr(2, 9),
      userId,
      type,
      description,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'activities', act.id), act);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'activities/' + act.id);
      }
    } else {
      const list = getLocal<UserActivity[]>('forum_activities');
      list.unshift(act);
      setLocal('forum_activities', list);
    }
  },

  // ---- TELEMETRY / PANELS STATS (RF29) ----
  async getStats() {
    const categories = await this.getCategories();
    if (isFirebaseEnabled) {
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const threadsSnap = await getDocs(collection(db, 'threads'));
        const reportsSnap = await getDocs(collection(db, 'reports'));
        const commentsSnap = await getDocs(collection(db, 'comments'));
        return {
          totalUsers: usersSnap.size || 4,
          totalThreads: threadsSnap.size || INITIAL_THREADS.length,
          totalComments: commentsSnap.size || INITIAL_COMMENTS.length,
          totalReports: reportsSnap.size || 1,
          categoriesCount: categories.length
        };
      } catch {
        // Return fallback if database is not fully synced
        return {
          totalUsers: 4,
          totalThreads: INITIAL_THREADS.length,
          totalComments: INITIAL_COMMENTS.length,
          totalReports: 1,
          categoriesCount: categories.length
        };
      }
    } else {
      const users = getLocal<UserProfile[]>('forum_users');
      const threads = getLocal<Thread[]>('forum_threads');
      const comments = getLocal<Comment[]>('forum_comments');
      const reports = getLocal<Report[]>('forum_reports');
      return {
        totalUsers: users.length,
        totalThreads: threads.length,
        totalComments: comments.length,
        totalReports: reports.length,
        categoriesCount: categories.length
      };
    }
  }
};
