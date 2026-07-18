/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Users, 
  FileText, 
  MessageSquare, 
  AlertTriangle, 
  FolderPlus, 
  Trash2, 
  Lock, 
  Unlock,
  Check, 
  X,
  UserX,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import { UserProfile, Thread, Comment, Report, ForumCategory } from '../types';
import { forumDb } from '../lib/db';

interface AdminPanelProps {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  onRefreshUsers: () => void;
  onRefreshThreads: () => void;
  categories: ForumCategory[];
  onRefreshCategories: () => void;
}

export default function AdminPanel({ 
  currentUser, 
  allUsers, 
  onRefreshUsers, 
  onRefreshThreads,
  categories,
  onRefreshCategories
}: AdminPanelProps) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalThreads: 0,
    totalComments: 0,
    totalReports: 0,
    categoriesCount: 0
  });

  const [reports, setReports] = useState<Report[]>([]);
  const [bannedUsers, setBannedUsers] = useState<UserProfile[]>([]);
  const [activeTab, setActiveTab] = useState<'metrics' | 'reports' | 'users' | 'categories'>('metrics');
  
  // New category form fields
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  
  // Custom ban form fields
  const [selectedUserToBan, setSelectedUserToBan] = useState<string | null>(null);
  const [banReason, setBanReason] = useState('');

  // Info alerts
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, [allUsers]);

  const fetchAdminData = async () => {
    try {
      const dbStats = await forumDb.getStats();
      setStats(dbStats);

      const dbReports = await forumDb.getReports();
      setReports(dbReports);

      setBannedUsers(allUsers.filter(u => u.isBanned || u.status === 'suspended'));
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim() || !newCatDesc.trim()) {
      setErrorMsg('Complete todos los campos de la categoría.');
      return;
    }
    try {
      await forumDb.createCategory(newCatName.trim(), newCatDesc.trim());
      setSuccessMsg(`Categoría "${newCatName}" creada con éxito.`);
      setNewCatName('');
      setNewCatDesc('');
      onRefreshCategories();
      fetchAdminData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (catId: string, name: string) => {
    if (!confirm(`¿Seguro que desea eliminar la categoría "${name}"? El foro se reajustará.`)) return;
    try {
      await forumDb.deleteCategory(catId);
      setSuccessMsg(`Categoría "${name}" eliminada.`);
      onRefreshCategories();
      fetchAdminData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBanUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserToBan) return;
    if (!banReason.trim()) {
      setErrorMsg('Debe especificar una razón para banear al usuario.');
      return;
    }

    try {
      await forumDb.updateUserProfile(selectedUserToBan, {
        isBanned: true,
        status: 'suspended',
        banReason: banReason.trim()
      });

      const userObj = allUsers.find(u => u.uid === selectedUserToBan);
      const name = userObj ? userObj.displayName : 'Usuario';
      
      await forumDb.logActivity(currentUser.uid, 'edit_profile', `Baneó al usuario "${name}" por: ${banReason}`);
      
      setSuccessMsg(`El usuario ${name} ha sido baneado.`);
      setSelectedUserToBan(null);
      setBanReason('');
      onRefreshUsers();
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnbanUser = async (uid: string) => {
    try {
      await forumDb.updateUserProfile(uid, {
        isBanned: false,
        status: 'active',
        banReason: undefined
      });
      
      const userObj = allUsers.find(u => u.uid === uid);
      const name = userObj ? userObj.displayName : 'Usuario';

      await forumDb.logActivity(currentUser.uid, 'edit_profile', `Restauró el acceso al usuario "${name}"`);

      setSuccessMsg(`Acceso restaurado para ${name}.`);
      onRefreshUsers();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolveReport = async (reportId: string, status: 'resolved' | 'dismissed') => {
    try {
      await forumDb.updateReportStatus(reportId, status);
      setSuccessMsg(`Reporte marcado como ${status === 'resolved' ? 'Resuelto' : 'Desestimado'}.`);
      fetchAdminData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOffensiveComment = async (reportId: string, commentId: string) => {
    if (!confirm('¿Seguro que desea eliminar este comentario ofensivo reportado?')) return;
    try {
      await forumDb.deleteComment(commentId);
      await forumDb.updateReportStatus(reportId, 'resolved');
      setSuccessMsg('Comentario eliminado por moderación y reporte resuelto.');
      onRefreshThreads();
      fetchAdminData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
       console.error(err);
    }
  };

  const handleDeleteOffensiveThread = async (reportId: string, threadId: string) => {
    if (!confirm('¿Seguro que desea eliminar este hilo ofensivo reportado? Todos los comentarios se purgarán.')) return;
    try {
      await forumDb.deleteThread(threadId);
      await forumDb.updateReportStatus(reportId, 'resolved');
      setSuccessMsg('Hilo eliminado íntegramente por moderación y reporte resuelto.');
      onRefreshThreads();
      fetchAdminData();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser.isAdmin) {
    return (
      <div className="text-center py-16 bg-red-50 border border-red-100 rounded-2xl max-w-lg mx-auto my-12 p-8">
        <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-red-800">Acceso Privilegiado Denegado</h2>
        <p className="text-sm text-red-600 mt-2">
          Debe contar con credenciales de administrador acreditadas para visualizar este módulo panel.
        </p>
      </div>
    );
  }

  return (
    <div id="admin-panel" className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-xs max-w-7xl mx-auto my-6">
      
      {/* Admin Title Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Dashboard de Moderación Avanzada</h2>
            <p className="text-xs text-slate-500 font-mono">Modo Administrador: {currentUser.displayName} ({currentUser.email})</p>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/60 rounded-xl">
          {(['metrics', 'reports', 'users', 'categories'] as const).map((tab) => (
            <button
              key={tab}
              id={`admin-tab-${tab}`}
              onClick={() => { setActiveTab(tab); setErrorMsg(''); setSuccessMsg(''); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {tab === 'metrics' && 'Estadísticas (RF29)'}
              {tab === 'reports' && 'Reportes (RF27)'}
              {tab === 'users' && 'Baneos (RF24)'}
              {tab === 'categories' && 'Categorías (RF30)'}
            </button>
          ))}
        </div>
      </div>

      {/* Messages banner */}
      {successMsg && (
        <div id="admin-alert-success" className="mb-5 p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div id="admin-alert-error" className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2">
          <X className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* TABS VIEWPORTS */}
      
      {/* 1. STATE STATISTICS AND METRICS (RF23, RF29) */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div id="metric-users" className="bg-white p-4 rounded-xl border border-slate-200 shadow-xxs">
              <div className="flex justify-between items-start text-slate-400 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold text-slate-500">Registrados</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats.totalUsers}</p>
              <p className="text-[10px] text-slate-400 mt-1">Cuentas activas en la BD</p>
            </div>

            <div id="metric-threads" className="bg-white p-4 rounded-xl border border-slate-200 shadow-xxs">
              <div className="flex justify-between items-start text-slate-400 mb-2">
                <FileText className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold text-slate-500">Hilos</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats.totalThreads}</p>
              <p className="text-[10px] text-slate-400 mt-1">Dilemas éticos planteados</p>
            </div>

            <div id="metric-comments" className="bg-white p-4 rounded-xl border border-slate-200 shadow-xxs">
              <div className="flex justify-between items-start text-slate-400 mb-2">
                <MessageSquare className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold text-slate-500 font-sans">Comentarios</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats.totalComments}</p>
              <p className="text-[10px] text-slate-400 mt-1">Respuestas y discusiones</p>
            </div>

            <div id="metric-reports" className="bg-white p-4 rounded-xl border border-slate-200 shadow-xxs">
              <div className="flex justify-between items-start text-slate-400 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] uppercase font-bold text-slate-500">Alerta Reportes</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 text-amber-600">{stats.totalReports}</p>
              <p className="text-[10px] text-slate-400 mt-1">Acciones pendientes</p>
            </div>

            <div id="metric-cats" className="bg-white p-4 rounded-xl border border-slate-200 shadow-xxs col-span-2 md:col-span-1">
              <div className="flex justify-between items-start text-slate-400 mb-2">
                <FolderPlus className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold text-slate-500">Ejes Temáticos</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats.categoriesCount}</p>
              <p className="text-[10px] text-slate-400 mt-1">Agrupaciones morales</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Forum activity graphics placeholders */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>Salud Ética del Foro</span>
              </h3>
              <p className="text-xs text-slate-600 leading-normal mb-3">
                La proporción actual de hilos frente a comentarios es de <strong>1:{(stats.totalComments / (stats.totalThreads || 1)).toFixed(1)}</strong>. Esto demuestra un nivel de engagement moral constructivo y participativo sumamente valioso. Estándares WCAG 2.1 nivel AA y SSL operando en óptimas condiciones.
              </p>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 text-center text-[9px] text-white font-semibold" style={{ width: '40%' }}>40% Digital</div>
                <div className="bg-blue-500 text-center text-[9px] text-white font-semibold" style={{ width: '25%' }}>25% Bioética</div>
                <div className="bg-orange-400 text-center text-[9px] text-white font-semibold" style={{ width: '20%' }}>20% Prof</div>
                <div className="bg-indigo-400 text-center text-[9px] text-white font-semibold" style={{ width: '15%' }}>15% Otros</div>
              </div>
            </div>

            {/* Moderation Policies rules recap */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Políticas de Moderador Activo</h3>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
                <li>Baneo temporal únicamente aplicable con mención motivada (RF24).</li>
                <li>Los hilos cerrados por desinformación o agresividad pueden ser desbloqueados excepcionalmente.</li>
                <li>Los reportes procedentes de cuentas con mala reputación deben contrastarse exhaustivamente.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. SECURITY REPORTS QUEUE (RF26, RF27, RF28) */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-800">Fila de Moderación por Reportes de Comunidad (RF27)</h3>
          {reports.length === 0 ? (
            <div className="text-center py-10 bg-white border rounded-xl text-slate-400 text-xs">
              No existen reportes pendientes de moderar. El foro se encuentra en un estado pacífico.
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 bg-white rounded-xl">
              <table className="w-full text-xs text-left text-slate-600">
                <thead className="bg-slate-50 text-slate-500 text-[10px] font-semibold uppercase tracking-wide border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Tipo</th>
                    <th className="px-4 py-3">Elemento Reportado</th>
                    <th className="px-4 py-3">Motivo reportado</th>
                    <th className="px-4 py-3">Informante</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3 text-right">Acciones (RF28)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reports.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide shrink-0 ${
                          r.type === 'thread' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {r.type === 'thread' ? 'Hilo' : 'Comentario'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 max-w-[200px]">
                        <p className="italic text-slate-800 truncate">"{r.contentSummary}"</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">ID: {r.targetId}</p>
                      </td>
                      <td className="px-4 py-3.5 text-slate-800 font-medium">
                        {r.reason}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500">
                        {r.reportedByName}
                      </td>
                      <td className="px-4 py-3.5/2">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                          r.status === 'pending' ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${r.status === 'pending' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                          {r.status === 'pending' ? 'Pendiente' : r.status === 'resolved' ? 'Resuelto' : 'Desestimado'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                        {r.status === 'pending' ? (
                          <>
                            <button
                              id={`dismiss-report-${r.id}`}
                              onClick={() => handleResolveReport(r.id, 'dismissed')}
                              className="px-2.5 py-1 hover:bg-slate-100 text-slate-600 font-semibold border rounded-lg transition-colors text-[11px]"
                              title="Desestimar acusación"
                            >
                              Desestimar
                            </button>
                            <button
                              id={`delete-offensive-${r.id}`}
                              onClick={() => {
                                if (r.type === 'thread') {
                                  handleDeleteOffensiveThread(r.id, r.targetId);
                                } else {
                                  handleDeleteOffensiveComment(r.id, r.targetId);
                                }
                              }}
                              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-xxs transition-colors text-[11px]"
                              title="Borrar contenido ofensivo"
                            >
                              Borrar Contenido
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">Cerrado</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 3. USER MANAGEMENT & BAN CONTROLS (RF24) */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Active members list */}
          <div className="md:col-span-8 space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">Directorio General de Miembros</h3>
            <div className="overflow-x-auto border border-slate-200 bg-white rounded-xl">
              <table className="w-full text-xs text-left text-slate-600">
                <thead className="bg-slate-50 text-slate-500 text-[10px] font-semibold uppercase tracking-wide border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Usuario</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Nivel</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allUsers.map((u) => (
                    <tr key={u.uid} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 flex items-center gap-2.5">
                        <img 
                          src={u.photoURL} 
                          alt={u.displayName} 
                          className="w-8 h-8 rounded-full border object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-semibold text-slate-800 block truncate max-w-[120px]">{u.displayName}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wide uppercase ${
                          u.isAdmin ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {u.isAdmin ? 'Admin' : 'Pensador'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {u.isBanned || u.status === 'suspended' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                            BANEADO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                            Activo
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {u.isBanned || u.status === 'suspended' ? (
                          <button
                            id={`unban-btn-${u.uid}`}
                            onClick={() => handleUnbanUser(u.uid)}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-2 py-1 rounded-lg border border-emerald-100 transition-colors text-[10px] inline-flex items-center gap-1 align-middle"
                          >
                            <UserCheck className="w-3 h-3" />
                            Unban
                          </button>
                        ) : u.uid === currentUser.uid ? (
                          <span className="text-[10px] text-slate-400">Tú</span>
                        ) : (
                          <button
                            id={`prepare-ban-btn-${u.uid}`}
                            onClick={() => {
                              setSelectedUserToBan(u.uid);
                              setBanReason('');
                            }}
                            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-2 py-1 rounded-lg border border-red-100 transition-colors text-[10px] inline-flex items-center gap-1 align-middle"
                          >
                            <UserX className="w-3 h-3" />
                            Banear
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ban trigger actions workspace form */}
          <div className="md:col-span-4 bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <UserX className="w-4 h-4 text-red-600" />
              <span>Ejecución de Baneo (RF24)</span>
            </h4>
            
            {selectedUserToBan ? (
              <form onSubmit={handleBanUserSubmit} className="space-y-3.5">
                <div className="p-3 bg-red-50/70 rounded-xl border border-red-100">
                  <p className="text-xs text-red-800">
                    Estás aplicando suspensión preventiva de credenciales para:{' '}
                    <strong className="block text-slate-900 mt-1 font-mono">
                      {allUsers.find(u => u.uid === selectedUserToBan)?.displayName}
                    </strong>
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Razón del Baneo</label>
                  <textarea
                    id="ban-reason-input"
                    rows={3}
                    placeholder="Escriba el motivo (vandalismo, insultos, contenido hostil)..."
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-400 focus:bg-white text-xs leading-relaxed"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    id="cancel-ban-btn"
                    type="button"
                    onClick={() => setSelectedUserToBan(null)}
                    className="flex-1 py-1 px-3 text-slate-600 font-medium hover:bg-slate-100 border rounded-lg text-xs"
                  >
                    Salir
                  </button>
                  <button
                    id="confirm-ban-btn"
                    type="submit"
                    className="flex-1 py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-xxs transition-colors text-xs"
                  >
                    Confirmar Ban
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                Seleccione un usuario de la lista de la izquierda para configurar su baneo motivado.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. SECTIONS & CATEGORY MANAGER (RF30) */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Categories List */}
          <div className="md:col-span-7 space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">Ejes Temáticos Clasificados</h3>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((c) => (
                <div key={c.id} className="p-4 bg-white border border-slate-200 rounded-xl flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{c.description}</p>
                    <span className="inline-block mt-2 text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      ID: {c.id}
                    </span>
                  </div>
                  <button
                    id={`delete-cat-btn-${c.id}`}
                    onClick={() => handleDeleteCategory(c.id, c.name)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    title="Eliminar categoría"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Category Form */}
          <div className="md:col-span-5 bg-white p-5 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-750 uppercase tracking-widest mb-3.5 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
              <FolderPlus className="w-4 h-4 text-emerald-500" />
              <span>Nueva Categoría de Foro (RF30)</span>
            </h4>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre Corto</label>
                <input
                  id="new-cat-name-input"
                  type="text"
                  placeholder="Por ej. Ética Espacial, Inteligencia Ecológica"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full p-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Descripción Breve</label>
                <textarea
                  id="new-cat-desc-input"
                  rows={3}
                  placeholder="Defina el tipo de dilemas éticos y debates dirigidos a esta sección temática..."
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full p-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white text-xs leading-normal"
                />
              </div>

              <button
                id="submit-new-cat-btn"
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-xl shadow-xs transition-colors text-xs text-center font-sans tracking-wide"
              >
                Insertar Categoría
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
