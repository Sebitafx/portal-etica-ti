/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  Quote, 
  Flag, 
  Lock, 
  Unlock,
  CornerDownRight,
  Send,
  Loader2,
  Calendar,
  Check,
  AlertOctagon,
  X
} from 'lucide-react';
import { Thread, Comment, UserProfile } from '../types';
import { forumDb } from '../lib/db';

interface ThreadDetailProps {
  threadId: string;
  currentUser: UserProfile | null;
  onBack: () => void;
  onRefreshThreads: () => void;
  triggerAuth: () => void;
}

export default function ThreadDetail({ 
  threadId, 
  currentUser, 
  onBack, 
  onRefreshThreads,
  triggerAuth
}: ThreadDetailProps) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create / edit thread state
  const [isEditingThread, setIsEditingThread] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Comment fields
  const [newCommentContent, setNewCommentContent] = useState('');
  const [quotedComment, setQuotedComment] = useState<{ id: string; author: string; text: string } | null>(null);
  
  // Edit comment fields
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  // Report fields
  const [reportingCommentId, setReportingCommentId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');

  // Notifications
  const [success, setSuccess] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchThreadAndComments();
  }, [threadId]);

  const fetchThreadAndComments = async () => {
    setLoading(true);
    try {
      const t = await forumDb.getThreadById(threadId);
      if (t) {
        setThread(t);
        setEditTitle(t.title);
        setEditContent(t.content);
        const c = await forumDb.getComments(threadId);
        setComments(c);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Text formatter for bold and italics (RF22)
  const formatText = (text: string): React.ReactNode[] => {
    if (!text) return [];
    // Matches **bold** or *italic*
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index} className="font-sans italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  const handleEditThread = async () => {
    if (!thread || !currentUser) return;
    if (!editTitle.trim() || !editContent.trim()) {
      setErr('El título y contenido del dilema son obligatorios.');
      return;
    }
    try {
      await forumDb.updateThread(thread.id, {
        title: editTitle.trim(),
        content: editContent.trim()
      });
      await forumDb.logActivity(currentUser.uid, 'create_thread', `Editó los contenidos de su dilema: "${editTitle}"`);
      setSuccess('Hilo editado con éxito.');
      setIsEditingThread(false);
      onRefreshThreads();
      fetchThreadAndComments();
      setTimeout(() => setSuccess(''), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteThread = async () => {
    if (!thread || !currentUser) return;
    if (!confirm('¿Seguro que desea eliminar este hilo de discusión y todas sus respuestas?')) return;
    try {
      await forumDb.deleteThread(thread.id);
      await forumDb.logActivity(currentUser.uid, 'delete_thread', `Eliminó su dilema ético: "${thread.title}"`);
      onRefreshThreads();
      onBack();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleLockThread = async () => {
    if (!thread || !currentUser?.isAdmin) return;
    const nextState = !thread.isLocked;
    try {
      await forumDb.updateThread(thread.id, { isLocked: nextState });
      await forumDb.logActivity(currentUser.uid, 'edit_profile', `${nextState ? 'Cerró' : 'Desbloqueó'} el hilo: "${thread.title}"`);
      setSuccess(nextState ? 'Hilo cerrado. No se admiten nuevos aportes.' : 'Hilo reabierto.');
      fetchThreadAndComments();
      onRefreshThreads();
      setTimeout(() => setSuccess(''), 2500);
    } catch (e) {
       console.error(e);
    }
  };

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      triggerAuth();
      return;
    }
    if (thread?.isLocked) return;
    if (!newCommentContent.trim()) {
      setErr('Escribir opiniones sustanciales es clave en foros de debate.');
      return;
    }

    try {
      await forumDb.createComment({
        threadId: threadId,
        content: newCommentContent.trim(),
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPhoto: currentUser.photoURL,
        quotedCommentId: quotedComment?.id || null,
        quotedCommentText: quotedComment?.text || null,
        quotedCommentAuthor: quotedComment?.author || null
      });

      await forumDb.logActivity(currentUser.uid, 'create_comment', `Publicó una postura en el hilo: "${thread?.title}"`);
      
      setNewCommentContent('');
      setQuotedComment(null);
      setSuccess('Comentario publicado con éxito.');
      fetchThreadAndComments();
      onRefreshThreads();
      setTimeout(() => setSuccess(''), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateComment = async (commId: string) => {
    if (!currentUser) return;
    if (!editingCommentText.trim()) return;

    try {
      await forumDb.updateComment(commId, editingCommentText.trim());
      await forumDb.logActivity(currentUser.uid, 'edit_comment', 'Actualizó los términos de su comentario.');
      setEditingCommentId(null);
      setEditingCommentText('');
      setSuccess('Comentario modificado.');
      fetchThreadAndComments();
      setTimeout(() => setSuccess(''), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteComment = async (commId: string) => {
    if (!confirm('¿Seguro que desea eliminar este comentario?')) return;
    try {
      await forumDb.deleteComment(commId);
      if (currentUser) {
        await forumDb.logActivity(currentUser.uid, 'delete_comment', 'Eliminó uno de sus comentarios.');
      }
      setSuccess('Comentario removido.');
      fetchThreadAndComments();
      onRefreshThreads();
      setTimeout(() => setSuccess(''), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleQuoteComment = (comm: Comment) => {
    // Limits previews quoting (RF19)
    const rawPreview = comm.content.length > 80 ? comm.content.substr(0, 80) + '...' : comm.content;
    setQuotedComment({
      id: comm.id,
      author: comm.authorName,
      text: rawPreview
    });
    // Scroll down to reply editor
    document.getElementById('new-comment-textarea')?.focus();
  };

  const handleReportCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      triggerAuth();
      return;
    }
    if (!reportingCommentId || !reportReason.trim()) return;

    try {
      const commObj = comments.find(c => c.id === reportingCommentId);
      const summary = commObj ? commObj.content.substr(0, 70) + '...' : 'Comentario';

      await forumDb.createReport({
        type: 'comment',
        targetId: reportingCommentId,
        threadId: threadId,
        reason: reportReason.trim(),
        reportedBy: currentUser.uid,
        reportedByName: currentUser.displayName,
        contentSummary: summary
      });

      await forumDb.logActivity(currentUser.uid, 'report', `Reportó contenido inapropiado: "${reportReason}"`);
      
      setReportingCommentId(null);
      setReportReason('');
      setSuccess('El comentario ha sido reportado para revisión de moderación.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No se pudo recuperar la información del hilo seleccionado.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl">Volver</button>
      </div>
    );
  }

  const isThreadAuthor = currentUser && thread.authorId === currentUser.uid;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Back button */}
      <button 
        id="btn-back-to-home"
        onClick={onBack} 
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a dilemas</span>
      </button>

      {/* SUCCESS / ERROR ALERTS */}
      {success && (
        <div id="thread-detail-success" className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}
      {err && (
        <div id="thread-detail-error" className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-red-600 shrink-0" />
          <span>{err}</span>
        </div>
      )}

      {/* CORE DISCUSSION LEAD DISCOURSE HILO CONTAINER */}
      <div id={`thread-lead-${thread.id}`} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xxs">
        
        {isEditingThread ? (
          /* EDIT CARD WORKSPACE (RF10) */
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Modificar Dilema Ético</h3>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Título adaptado</label>
              <input
                id="edit-thread-title-input"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-slate-450 focus:bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Cuestionamiento / Dilema</label>
              <textarea
                id="edit-thread-content-textarea"
                rows={5}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-450 focus:bg-white text-xs leading-relaxed"
              />
            </div>
            <div className="flex justify-end gap-2 text-xs">
              <button 
                id="cancel-edit-thread-btn"
                onClick={() => setIsEditingThread(false)} 
                className="px-3 py-1.5 border hover:bg-slate-50 rounded-lg text-slate-600 font-medium"
              >
                Cancelar
              </button>
              <button 
                id="submit-edit-thread-btn"
                onClick={handleEditThread} 
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg"
              >
                Guardar Dilema
              </button>
            </div>
          </div>
        ) : (
          /* STANDARD VIEW MODE */
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
                {thread.category}
              </span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] font-mono text-slate-400">{new Date(thread.createdAt).toLocaleString()}</span>
                {thread.isLocked && (
                  <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ml-2">
                    <Lock className="w-2.5 h-2.5" /> BLOQUEADO
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-4">
              {thread.title}
            </h1>

            {/* Profile Line of owner */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <img 
                src={thread.authorPhoto} 
                alt={thread.authorName} 
                className="w-10 h-10 rounded-full border object-cover shrink-0" 
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">{thread.authorName}</p>
                <p className="text-[10px] text-slate-400">Creador del dilema</p>
              </div>
            </div>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {thread.content}
            </p>

            {/* Keywords */}
            {thread.keywords && thread.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-5">
                {thread.keywords.map((key) => (
                  <span key={key} className="text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-sm">
                    #{key}
                  </span>
                ))}
              </div>
            )}

            {/* Thread Owner / Moderator controls (RF11, RF25) */}
            <div className="flex flex-wrap gap-2 justify-end mt-6 pt-4 border-t border-slate-100 text-xs">
              {currentUser?.isAdmin && (
                <button
                  id="lock-thread-status-btn"
                  onClick={handleToggleLockThread}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-colors font-semibold ${
                    thread.isLocked 
                      ? 'border-emerald-200 hover:bg-emerald-50 text-emerald-700' 
                      : 'border-amber-200 hover:bg-amber-50 text-amber-700'
                  }`}
                >
                  {thread.isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  {thread.isLocked ? 'Desbloquear Conversación' : 'Cerrar Conversación (RF25)'}
                </button>
              )}

              {isThreadAuthor && (
                <div className="flex gap-2">
                  <button
                    id="trigger-edit-thread-btn"
                    onClick={() => setIsEditingThread(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-50 border rounded-lg text-slate-600 font-semibold transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Editar
                  </button>
                  <button
                    id="trigger-delete-thread-btn"
                    onClick={handleDeleteThread}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-650 rounded-lg font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-650" />
                    Borrar Hilo
                  </button>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* COMMENTS DEBATE SECTIONS PANEL LIST (RF16) */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-200">
          <MessageSquare className="w-4 h-4 text-slate-400" />
          <span>Posturas y Comentarios ({comments.length})</span>
        </h3>

        <div className="space-y-3.5">
          {comments.length === 0 ? (
            <div className="text-center py-10 bg-slate-50/50 border border-slate-250/30 rounded-xl text-slate-400 text-xs">
              Aún no se han publicado posturas éticas para este dilema. ¡Aporta el primer argumento!
            </div>
          ) : (
            comments.map((comm) => (
              <div 
                key={comm.id} 
                id={`comment-${comm.id}`} 
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-xxs space-y-3"
              >
                {/* Author context line */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img 
                      src={comm.authorPhoto} 
                      alt={comm.authorName} 
                      className="w-7 h-7 rounded-full border object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{comm.authorName}</p>
                    </div>
                  </div>
                  {/* Timestamp exact (RF21) */}
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(comm.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Quoted comment text if any (RF19) */}
                {comm.quotedCommentId && (
                  <div className="p-2.5 bg-slate-50 border-l-2 border-slate-400 rounded-r-lg text-slate-600 text-xs flex gap-1.5 items-start">
                    <Quote className="w-4.5 h-4.5 text-slate-300 shrink-0 mt-0.5" />
                    <div className="min-w-0 font-sans">
                      <p className="text-[10px] font-bold text-slate-500 mb-0.5">Cita a {comm.quotedCommentAuthor}:</p>
                      <p className="italic truncate">"{comm.quotedCommentText}"</p>
                    </div>
                  </div>
                )}

                {/* Comment content */}
                {editingCommentId === comm.id ? (
                  /* INLINE EDIT MODE (RF17) */
                  <div className="space-y-3">
                    <textarea
                      id={`edit-comment-${comm.id}`}
                      rows={3}
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
                    />
                    <div className="flex justify-end gap-1.5 text-xs">
                      <button 
                        id={`cancel-edit-comm-${comm.id}`}
                        onClick={() => { setEditingCommentId(null); setEditingCommentText(''); }} 
                        className="px-2.5 py-1 border rounded hover:bg-slate-50 font-semibold"
                      >
                        Cancelar
                      </button>
                      <button 
                        id={`save-edit-comm-${comm.id}`}
                        onClick={() => handleUpdateComment(comm.id)} 
                        className="px-3 py-1 bg-slate-900 text-white rounded font-semibold"
                      >
                        Actualizar
                      </button>
                    </div>
                  </div>
                ) : (
                  /* STANDARD FORMATTED VIEW (RF16, RF22) */
                  <p className="text-slate-700 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                    {formatText(comm.content)}
                  </p>
                )}

                {/* Action buttons (Quotes RF19, edit RF17, delete RF18, report RF26) */}
                <div className="flex items-center justify-between pt-1.5 text-[10px] text-slate-400">
                  
                  {/* Community report system (RF26) */}
                  {reportingCommentId === comm.id ? (
                    <form onSubmit={handleReportCommentSubmit} className="w-full flex items-center gap-1.5 mt-2 bg-slate-50 p-2 rounded-lg border border-red-50">
                      <Flag className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <input
                        id="comment-report-reason-input"
                        type="text"
                        placeholder="Razón del reporte (ofensivo, agresivo)..."
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="flex-1 bg-transparent focus:outline-none text-slate-700 pl-1 py-0.5 text-xs"
                      />
                      <button
                        id="submit-comment-report"
                        type="submit"
                        className="text-red-600 hover:text-red-700 font-bold px-2 py-0.5"
                      >
                        Reportar
                      </button>
                      <button
                        id="cancel-comment-report"
                        type="button"
                        onClick={() => setReportingCommentId(null)}
                        className="text-slate-500 px-1 hover:text-slate-800"
                      >
                        X
                      </button>
                    </form>
                  ) : (
                    <button
                      id={`btn-report-comm-${comm.id}`}
                      onClick={() => {
                        if (!currentUser) { triggerAuth(); return; }
                        setReportingCommentId(comm.id);
                        setReportReason('');
                      }}
                      className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Flag className="w-3 h-3 text-slate-350" />
                      <span>Reportar infracción</span>
                    </button>
                  )}

                  <div className="flex items-center gap-3">
                    {!thread.isLocked && (
                      <button
                        id={`btn-quote-comm-${comm.id}`}
                        onClick={() => handleQuoteComment(comm)}
                        className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
                        title="Citar postura"
                      >
                        <Quote className="w-3 h-3 text-slate-350" />
                        <span>Citar</span>
                      </button>
                    )}

                    {currentUser && comm.authorId === currentUser.uid && !editingCommentId && (
                      <>
                        <button
                          id={`btn-edit-comm-${comm.id}`}
                          onClick={() => {
                            setEditingCommentId(comm.id);
                            setEditingCommentText(comm.content);
                          }}
                          className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Editar</span>
                        </button>
                        <button
                          id={`btn-delete-comm-${comm.id}`}
                          onClick={() => handleDeleteComment(comm.id)}
                          className="flex items-center gap-1 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Eliminar</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

      {/* NEW COMMENT FORM EDITOR (RF16) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xxs">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          Escribe tu Postura Moral
        </h4>
        
        {thread.isLocked ? (
          <div className="p-4 bg-slate-50 text-center rounded-xl border border-slate-100 text-slate-500 text-xs">
            Esta conversación ha sido archivada o bloqueada por la moderación del foro. No se admiten respuestas adicionales. (RF25)
          </div>
        ) : (
          <form onSubmit={handleCreateComment} className="space-y-4">
            
            {/* Quoted comment bubble preview */}
            {quotedComment && (
              <div id="quote-editor-preview" className="p-3 bg-indigo-50 border-l-2 border-indigo-400 rounded-r-lg text-slate-700 text-xs flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold text-slate-500">Citando postura de {quotedComment.author}:</span>
                  <p className="italic truncate">"{quotedComment.text}"</p>
                </div>
                <button 
                  id="cancel-quote-editor"
                  type="button" 
                  onClick={() => setQuotedComment(null)} 
                  className="p-0.5 rounded-full hover:bg-indigo-100 text-slate-500"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            )}

            <div className="relative">
              <textarea
                id="new-comment-textarea"
                rows={4}
                placeholder={
                  currentUser 
                    ? "Razone y debata con educación. Puede dar formato básico usando **negrita** o *cursiva*..." 
                    : "Inicie sesión para participar de los debates éticos..."
                }
                disabled={!currentUser}
                value={newCommentContent}
                onChange={(e) => { setNewCommentContent(e.target.value); setErr(''); }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white text-xs md:text-sm leading-relaxed"
              />
              {!currentUser && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-xxs rounded-xl flex items-center justify-center p-4 text-center">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-2">Se requiere autenticación para publicar opiniones</p>
                    <button
                      id="btn-inline-login"
                      type="button"
                      onClick={triggerAuth}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-1.5 px-4 rounded-xl text-xs"
                    >
                      Definir Identidad
                    </button>
                  </div>
                </div>
              )}
            </div>

            {currentUser && (
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400">
                  Formato: **grosor** y *cursiva* soportado (RF22)
                </span>
                <button
                  id="btn-submit-comment"
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-xs text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Publicar Postura (RF16)
                </button>
              </div>
            )}
          </form>
        )}
      </div>

    </div>
  );
}
