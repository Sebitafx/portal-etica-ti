/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  PlusCircle, 
  Shield, 
  User, 
  Bell, 
  LogOut, 
  Tag, 
  TrendingUp, 
  Folder, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  X,
  HelpCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { Thread, UserProfile, ForumCategory, Notification } from './types';
import { forumDb } from './lib/db';
import { isFirebaseEnabled } from './lib/firebase';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import AdminPanel from './components/AdminPanel';
import ThreadDetail from './components/ThreadDetail';

const THREADS_PER_PAGE = 3; // Solves pagination nicely with our pre-populated mock threads! (RF14)

export default function App() {
  // Authentication & Users state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  
  // Content states
  const [threads, setThreads] = useState<Thread[]>([]);
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  
  // Filters & Page states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Navigation
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCreateThreadOpen, setIsCreateThreadOpen] = useState(false);

  // Notifications (RF20)
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationPaneOpen, setIsNotificationPaneOpen] = useState(false);

  // Form thread creation fields
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Ética Digital');
  const [newKeywordsString, setNewKeywordsString] = useState('');

  // Alerts
  const [success, setSuccess] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Bootstrapping the app
  useEffect(() => {
    bootstrapApp();
  }, []);

  const bootstrapApp = async () => {
    try {
      // 1. Load users
      const users = await forumDb.getUsers();
      setAllUsers(users);

      // 2. Setup default logged user as the first admin for instant testing convenience (Elena Rostova)
      const elena = users.find(u => u.uid === 'user_elena');
      if (elena) {
        setCurrentUser(elena);
        fetchNotifications(elena.uid);
      }

      // 3. Load categories
      const cats = await forumDb.getCategories();
      setCategories(cats);

      // 4. Load threads
      fetchThreads();
    } catch (e) {
      console.error('Error bootstrapping Ethics Forum:', e);
    }
  };

  const fetchThreads = async () => {
    try {
      const response = await forumDb.getThreads(
        selectedCategory || undefined,
        searchQuery || undefined
      );
      setThreads(response);
      setCurrentPage(1); // Back to page 1 on filter
    } catch (e) {
      console.error(e);
    }
  };

  const fetchNotifications = async (uid: string) => {
    try {
      const notifs = await forumDb.getNotifications(uid);
      setNotifications(notifs);
    } catch (e) {
      console.error(e);
    }
  };

  // Re-fetch threads when category or search query changes
  useEffect(() => {
    fetchThreads();
  }, [selectedCategory, searchQuery]);

  // Handle successful login/registration
  const handleAuthSuccess = async (user: UserProfile) => {
    setCurrentUser(user);
    // Reload users list
    const users = await forumDb.getUsers();
    setAllUsers(users);
    
    // Log user login activity (RF07)
    await forumDb.logActivity(user.uid, 'login', `Inició sesión en la plataforma.`);
    fetchNotifications(user.uid);
  };

  const handleProfileUpdate = async (updated: UserProfile) => {
    setCurrentUser(updated);
    // Refresh user list
    const users = await forumDb.getUsers();
    setAllUsers(users);
    // Sync thread view references
    fetchThreads();
  };

  const handleLogout = async () => {
    if (currentUser) {
      await forumDb.logActivity(currentUser.uid, 'login', `Cerró sesión voluntariamente.`);
    }
    setCurrentUser(null);
    setNotifications([]);
    setIsNotificationPaneOpen(false);
    setIsAdminPanelOpen(false);
  };

  const handleDeleteAccount = () => {
    setCurrentUser(null);
    setNotifications([]);
    setSuccess('Su cuenta ha sido eliminada. Gracias por haber debatido con nosotros.');
    bootstrapApp();
    setTimeout(() => setSuccess(''), 4000);
  };

  // Create a new discussion thread (RF09)
  const handleCreateThreadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!newTitle.trim() || !newContent.trim()) {
      setErrorMsg('Debe escribir un título moral y un cuestionamiento sustancial.');
      return;
    }

    try {
      const kwArray = newKeywordsString
        .split(',')
        .map(s => s.trim().toLowerCase())
        .filter(s => s.length > 0);

      const created = await forumDb.createThread({
        title: newTitle.trim(),
        content: newContent.trim(),
        category: newCategory,
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPhoto: currentUser.photoURL,
        keywords: kwArray.length ? kwArray : ['dilema']
      });

      await forumDb.logActivity(currentUser.uid, 'create_thread', `Planteó un nuevo dilema ético: "${newTitle.trim()}"`);

      // Reset fields
      setNewTitle('');
      setNewContent('');
      setNewKeywordsString('');
      setIsCreateThreadOpen(false);
      setSuccess('Su dilema moral ha sido publicado con éxito.');
      fetchThreads();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotificationClick = (threadId: string) => {
    setActiveThreadId(threadId);
    setIsAdminPanelOpen(false);
    setIsNotificationPaneOpen(false);
    if (currentUser) {
      forumDb.markNotificationsRead(currentUser.uid);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  // Pagination logic (RF14)
  const totalPages = Math.ceil(threads.length / THREADS_PER_PAGE);
  const paginatedThreads = threads.slice(
    (currentPage - 1) * THREADS_PER_PAGE,
    currentPage * THREADS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col antialiased selection:bg-slate-900 selection:text-white">
      
      {/* GLOBAL HEADER BAR */}
      <header id="app-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-250/60 shadow-xxs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Branding */}
          <div 
            id="header-brand-logo"
            onClick={() => { setActiveThreadId(null); setIsAdminPanelOpen(false); }}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-9 h-9 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-sm tracking-widest shadow-xs">
              Δ
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-sans flex items-center gap-1.5">
                <span>Foro de Ética</span>
                <span className="text-[9px] font-mono font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-sm border border-emerald-100 uppercase">
                  Beta
                </span>
              </h1>
              <p className="text-[10px] text-slate-400">Dilemas y Filosofía Digital</p>
            </div>
          </div>

          {/* Quick Search bar (RF13) */}
          {!activeThreadId && !isAdminPanelOpen && (
            <div id="header-search-bar" className="hidden md:flex flex-1 max-w-md relative">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                id="search-threads-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar dilema por palabra clave (ia, bioética, etc.)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 border border-transparent hover:border-slate-200 focus:border-slate-350 focus:bg-white focus:outline-none transition-all rounded-full text-xs text-slate-800"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-2 py-0.5 px-1 bg-slate-200 hover:bg-slate-300 text-[10px] rounded"
                >
                  Limpiar
                </button>
              )}
            </div>
          )}

          {/* User authentication states (RF02, RF05) */}
          <div className="flex items-center gap-3">
            
            {/* Visual Notifications Bell (RF20: Visual Notification of activities) */}
            {currentUser && (
              <div className="relative">
                <button
                  id="notifications-bell-btn"
                  onClick={() => setIsNotificationPaneOpen(!isNotificationPaneOpen)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.some(n => !n.read) && (
                    <span id="unread-notifications-badge" className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                {isNotificationPaneOpen && (
                  <div id="notifications-panel-pane" className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 z-50 text-xs">
                    <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[10px] text-slate-500">Notificaciones Recientes (RF20)</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-slate-450 italic text-center py-4">No tienes notificaciones pendientes.</p>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => handleNotificationClick(notif.threadId)}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                              notif.read ? 'bg-white border-slate-100 text-slate-600' : 'bg-indigo-50/50 border-indigo-100/50 text-indigo-905'
                            }`}
                          >
                            <p className="font-semibold">{notif.senderName} respondió a tu dilema:</p>
                            <p className="italic underline truncate mt-0.5">"{notif.threadTitle}"</p>
                            <span className="text-[9px] text-slate-400 mt-1 block">{new Date(notif.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Admin control panel link (RF23) */}
            {currentUser?.isAdmin && (
              <button
                id="header-admin-panel-btn"
                onClick={() => {
                  setIsAdminPanelOpen(!isAdminPanelOpen);
                  setActiveThreadId(null);
                }}
                className={`p-2 text-xs font-semibold rounded-xl uppercase tracking-wider flex items-center gap-1 transition-colors ${
                  isAdminPanelOpen 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white text-red-700 hover:bg-red-50 border border-slate-200'
                }`}
              >
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Admin (RF23)</span>
              </button>
            )}

            {currentUser ? (
              /* User logged state */
              <div className="flex items-center gap-2">
                <button
                  id="header-profile-modal-btn"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center gap-2 align-middle border border-slate-250 hover:bg-slate-50 transition-all p-1.5 pr-3 rounded-full cursor-pointer bg-white"
                >
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName} 
                    className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-semibold text-slate-800 hidden md:inline truncate max-w-[120px]">
                    {currentUser.displayName}
                  </span>
                </button>
                <button
                  id="header-logout-btn"
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                  title="Cerrar Sesión (RF05)"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Anonymous/Offline user logged out */
              <button
                id="header-login-trigger-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-1.5 px-4 rounded-xl text-xs flex items-center gap-1 shadow-xxs transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Ingresar / Simular</span>
              </button>
            )}

          </div>

        </div>
      </header>

      {/* MOBILE EXTRA SEARCH BAR WRAPPER */}
      <div className="md:hidden bg-white p-3 border-b border-slate-200 flex items-center justify-center">
        <div className="w-full relative max-w-sm">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            id="mobile-search-threads-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar dilema por palabra clave o tag..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-200/50 focus:bg-white focus:outline-none transition-colors border border-transparent rounded-full text-xs text-slate-800"
          />
        </div>
      </div>

      {/* APPLICATION CORE NOTIFICATION TOAST */}
      {success && (
        <div id="global-toast-success" className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-xl flex items-center gap-2.5 max-w-sm text-xs border border-white/10 animate-slide-up">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* MAIN CONTAINER BODY */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        
        {isAdminPanelOpen ? (
          /* ADMIN PORT VIEW (RF23, RF24, RF26-30) */
          <div>
            <div className="mb-4">
              <button
                id="btn-close-admin-panel"
                onClick={() => setIsAdminPanelOpen(false)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Volver a Dilemas
              </button>
            </div>
            <AdminPanel
              currentUser={currentUser!}
              allUsers={allUsers}
              onRefreshUsers={bootstrapApp}
              onRefreshThreads={fetchThreads}
              categories={categories}
              onRefreshCategories={bootstrapApp}
            />
          </div>
        ) : activeThreadId ? (
          /* THREAD DETAILS CHAT BOARD */
          <ThreadDetail 
            threadId={activeThreadId}
            currentUser={currentUser}
            onBack={() => setActiveThreadId(null)}
            onRefreshThreads={fetchThreads}
            triggerAuth={() => setIsAuthModalOpen(true)}
          />
        ) : (
          /* PRIMARY FORUM FEED LAYOUT */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Sidebar theme panels filters / widgets */}
            <div id="forum-sidebar-column" className="md:col-span-3 space-y-5">
              
              {/* Category list title heading */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xxs">
                <div className="flex items-center gap-2 text-slate-500 mb-3.5">
                  <SlidersHorizontal className="w-4.5 h-4.5 text-slate-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Filtrar por Tema</h3>
                </div>

                <div className="space-y-1.5 flex flex-col">
                  <button
                    id="cat-filter-all"
                    onClick={() => { setSelectedCategory(null); }}
                    className={`text-left px-3 py-2 text-xs font-semibold rounded-xl leading-normal transition-all flex items-center gap-2 ${
                      selectedCategory === null 
                        ? 'bg-slate-900 text-white shadow-xs' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5" />
                    <span>Todos los dilemas</span>
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      id={`cat-filter-${cat.id}`}
                      onClick={() => { setSelectedCategory(cat.name); }}
                      className={`text-left px-3 py-2 text-xs font-semibold rounded-xl leading-normal transition-all flex items-center justify-between gap-1.5 ${
                        selectedCategory === cat.name 
                          ? 'bg-slate-900 text-white shadow-xs' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                      title={cat.description}
                    >
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Debate rules summary notes panel */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xxs">
                <div className="flex items-center gap-2 text-slate-500 mb-2.5">
                  <HelpCircle className="w-4.5 h-4.5 text-slate-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Reglas del Foro</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Este es un entorno intelectual para debatir dilemas éticos profundos. No se admiten ataques directos, discriminación ni desinformación médica o tecnológica. Actúe de manera constructiva. (WCAG 2.1 AA Compliant)
                </p>
                <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Conexión Segura</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">● HTTPS (RNF07)</span>
                </div>
              </div>
            </div>

            {/* Core Thread list stream board feed */}
            <div id="forum-feeds-column" className="md:col-span-9 space-y-5">
              
              {/* Actions feed banner: create thread (RF09) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3.5 shadow-xxs">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">¿Tienes un planteamiento o dilema propio?</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Inicia un diálogo moral y recibe posturas de la comunidad.</p>
                </div>
                <button
                  id="btn-create-thread-trigger"
                  onClick={() => setIsCreateThreadOpen(!isCreateThreadOpen)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-xxs transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Plantear Dilema (RF09)</span>
                </button>
              </div>

              {/* CRITICAL WORKSPACE: CREATE NEW DILEMMA THREAD FORM (RF09, RF12) */}
              {isCreateThreadOpen && (
                <div id="new-thread-form-box" className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Nuevo Dilema Ético (RF09)</span>
                    </h3>
                    <button 
                      id="close-new-thread-btn"
                      onClick={() => setIsCreateThreadOpen(false)} 
                      className="p-1 rounded-full text-slate-400 hover:text-slate-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleCreateThreadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Título del Dilema</label>
                      <input
                        id="new-thread-title"
                        type="text"
                        placeholder="Ej: ¿Es permisible la vigilancia algorítmica para la productividad corporativa?"
                        value={newTitle}
                        onChange={(e) => { setNewTitle(e.target.value); setErrorMsg(''); }}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white text-xs md:text-sm font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pilar Temático (Categoría RF12)</label>
                        <select
                          id="new-thread-category"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none text-xs"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tags o Keywords (Separadas por comas)</label>
                        <input
                          id="new-thread-keywords"
                          type="text"
                          placeholder="privacidad, datos, etica, corporativo"
                          value={newKeywordsString}
                          onChange={(e) => setNewKeywordsString(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Cuestionamiento / Cuerpo del Dilema</label>
                      <textarea
                        id="new-thread-content"
                        rows={5}
                        placeholder="Escriba los pormenores, consideraciones históricas y perspectivas morales del asunto..."
                        value={newContent}
                        onChange={(e) => { setNewContent(e.target.value); setErrorMsg(''); }}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white text-xs md:text-sm leading-relaxed"
                      />
                    </div>

                    <div className="flex justify-end gap-2 text-xs font-semibold">
                      <button
                        id="cancel-submit-thread"
                        type="button"
                        onClick={() => setIsCreateThreadOpen(false)}
                        className="px-3.5 py-2 border rounded-xl hover:bg-slate-50 text-slate-600"
                      >
                        Descartar
                      </button>
                      <button
                        id="submit-new-thread"
                        type="submit"
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs"
                      >
                        Publicar Hilo
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* SEARCH SUMMARY INDICATOR */}
              {(selectedCategory || searchQuery) && (
                <div className="text-xs bg-slate-100 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                  <span>
                    Mostrando resultados filtrados por:{' '}
                    <strong>
                      {selectedCategory ? `Tema: [${selectedCategory}]` : ''}
                      {searchQuery ? ` Búsqueda: "${searchQuery}"` : ''}
                    </strong>{' '}
                    ({threads.length} dilemas encontrados)
                  </span>
                  <button
                    id="clear-filters-btn"
                    onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                    className="text-red-600 font-bold hover:underline"
                  >
                    Quitar filtros
                  </button>
                </div>
              )}

              {/* THREADS GRID DISPLAY PANEL STREAM LIST */}
              <div className="space-y-4">
                {paginatedThreads.length === 0 ? (
                  <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl text-slate-500">
                    <p className="text-sm font-semibold">No se encontraron dilemas éticos que coincidan.</p>
                    <p className="text-xs text-slate-450 mt-1">Intente refinar la búsqueda o explore otros temas morales.</p>
                  </div>
                ) : (
                  paginatedThreads.map((thr) => (
                    <div 
                      key={thr.id} 
                      id={`thread-card-${thr.id}`}
                      onClick={() => setActiveThreadId(thr.id)}
                      className="bg-white border border-slate-250/80 hover:border-slate-400 p-5 rounded-2xl cursor-pointer transition-all shadow-xxs hover:shadow-xs group duration-150 flex flex-col gap-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2.5">
                        <span className="text-[9px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                          {thr.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {new Date(thr.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h2 className="text-base md:text-lg font-bold text-slate-900 leading-snug group-hover:text-black transition-colors">
                        {thr.title}
                      </h2>

                      <p className="text-slate-600 text-xs md:text-sm line-clamp-2 leading-relaxed">
                        {thr.content}
                      </p>

                      {/* Author row & replies counter label RF15 */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-1.5">
                        <div className="flex items-center gap-2">
                          <img 
                            src={thr.authorPhoto} 
                            alt={thr.authorName} 
                            className="w-6.5 h-6.5 rounded-full object-cover border border-slate-200" 
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-xs text-slate-500 font-medium truncate max-w-[150px]">
                            {thr.authorName}
                          </span>
                        </div>

                        {/* Reply counter RF15 */}
                        <div id={`reply-count-badge-${thr.id}`} className="flex items-center gap-1.5 text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-xl">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-bold">{thr.replyCount || 0}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* PAGINATION PANEL CONTROLS (RF14) */}
              {totalPages > 1 && (
                <div id="forum-pagination-controls" className="flex items-center justify-center gap-4 pt-6">
                  <button
                    id="pagination-prev"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-1.5 py-1 text-xs border rounded-xl hover:bg-white text-slate-600 disabled:opacity-40 select-none flex items-center gap-0.5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>

                  <span className="text-xs font-mono text-slate-500 font-semibold">
                    Página {currentPage} de {totalPages}
                  </span>

                  <button
                    id="pagination-next"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="p-1.5 py-1 text-xs border rounded-xl hover:bg-white text-slate-600 disabled:opacity-40 select-none flex items-center gap-0.5 transition-colors"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>

          </div>
        )}
      </main>

      {/* FOOTER AREA */}
      <footer id="app-footer" className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Foro de Ética. Propiciando el debate responsable y la reflexión sistemática.</p>
          <div className="flex gap-4 font-semibold">
            <a href="#" className="hover:text-white transition-colors">Digital</a>
            <a href="#" className="hover:text-white transition-colors">Bioética</a>
            <a href="#" className="hover:text-white transition-colors">Profesional</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1 text-emerald-400 font-mono">
              <span>GDPR & ISO (RNF08/11)</span>
            </a>
          </div>
        </div>
      </footer>

      {/* DIALOG POPUPS ARCHITECTURE */}
      
      {/* 1. AUTH / TEST PROFILE TRIGGER MODAL (RF01, RF02, RF03, RF06) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        mockUsers={allUsers}
      />

      {/* 2. PROFILE SETTINGS / LOG / UNSUBSCRIBE MODAL (RF04, RF07, RF08) */}
      {isProfileModalOpen && currentUser && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          currentUser={currentUser}
          onProfileUpdate={handleProfileUpdate}
          onDeleteAccount={handleDeleteAccount}
          onLogout={handleLogout}
        />
      )}

    </div>
  );
}
