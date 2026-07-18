/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, User, Image as ImageIcon, History, AlertTriangle, LogOut, CheckCircle2 } from 'lucide-react';
import { UserProfile, UserActivity } from '../types';
import { forumDb } from '../lib/db';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onProfileUpdate: (updated: UserProfile) => void;
  onDeleteAccount: () => void;
  onLogout: () => void;
}

export default function ProfileModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onProfileUpdate, 
  onDeleteAccount, 
  onLogout 
}: ProfileModalProps) {
  const [name, setName] = useState(currentUser.displayName);
  const [photo, setPhoto] = useState(currentUser.photoURL);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.displayName);
      setPhoto(currentUser.photoURL);
      setConfirmDelete(false);
      setSuccess('');
      fetchUserActivities();
    }
  }, [isOpen, currentUser]);

  const fetchUserActivities = async () => {
    try {
      const list = await forumDb.getActivities(currentUser.uid);
      setActivities(list);
    } catch (err) {
      console.error('Error fetching activities:', err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);

    try {
      await forumDb.updateUserProfile(currentUser.uid, {
        displayName: name,
        photoURL: photo
      });
      
      const updatedUser: UserProfile = {
        ...currentUser,
        displayName: name,
        photoURL: photo
      };

      await forumDb.logActivity(currentUser.uid, 'edit_profile', `Actualizó su perfil público: Nombre "${name}"`);
      onProfileUpdate(updatedUser);
      setSuccess('Perfil actualizado con éxito.');
      setTimeout(() => setSuccess(''), 3000);
      fetchUserActivities();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelf = async () => {
    try {
      await forumDb.logActivity(currentUser.uid, 'delete_account', 'Cerró voluntariamente esta cuenta.');
      await forumDb.deleteUserProfile(currentUser.uid);
      onDeleteAccount();
      onClose();
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="profile-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-slate-300" />
            <h2 className="text-lg font-semibold tracking-tight">Mi Perfil y Configuración</h2>
          </div>
          <button 
            id="close-profile-btn"
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inner flex split layout */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Edit Profile Column (RF04) */}
          <div className="md:col-span-5 space-y-5 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <div className="flex flex-col items-center text-center">
              <img 
                src={photo} 
                alt={currentUser.displayName} 
                className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 shadow-xs mb-3"
                referrerPolicy="no-referrer"
              />
              <p className="text-sm font-semibold text-slate-900">{currentUser.displayName}</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{currentUser.email}</p>
              {currentUser.isAdmin && (
                <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-800 uppercase tracking-wide">
                  Administrador
                </span>
              )}
            </div>

            {success && (
              <div id="profile-success-alert" className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Nombre de Usuario (RF04)</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    id="profile-name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Foto de Perfil (Dirección Web)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    id="profile-photo-input"
                    type="url"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  id="profile-logout-btn"
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="flex items-center gap-1.5 justify-center py-2 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 text-xs transition-colors font-medium shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Salir
                </button>
                <button
                  id="profile-save-btn"
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-xl shadow-xs transition-colors text-xs text-center"
                >
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>

            {/* Danger Zone: delete own account (RF08) */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">Zona de Peligro</h3>
              {!confirmDelete ? (
                <button
                  id="trigger-delete-self-btn"
                  onClick={() => setConfirmDelete(true)}
                  className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-xl transition-colors text-xs text-center border border-red-100"
                >
                  Eliminar mi cuenta definitivamente
                </button>
              ) : (
                <div id="delete-self-confirm-box" className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-2">
                  <p className="text-[11px] text-red-800 leading-normal flex items-start gap-1">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>¿Está seguro? Esta acción borrará permanentemente sus credenciales y anonimizará todos sus aportes. No puede revertirse.</span>
                  </p>
                  <div className="flex gap-1.5 pt-1.5">
                    <button
                      id="cancel-delete-self-btn"
                      onClick={() => setConfirmDelete(false)}
                      className="flex-1 py-1 px-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
                    >
                      Mantener Cuenta
                    </button>
                    <button
                      id="confirm-delete-self-btn"
                      onClick={handleDeleteSelf}
                      className="flex-1 py-1 px-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Confirmar Borrado
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Log List Column (RF07) */}
          <div className="md:col-span-7 flex flex-col min-h-0">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <History className="w-4 h-4 text-slate-400" />
              <span>Historial de Actividad (RF07)</span>
            </h3>

            <div className="flex-1 overflow-y-auto bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-3 max-h-[350px]">
              {activities.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <p className="text-xs">No hay registros de actividad previos.</p>
                </div>
              ) : (
                activities.map((act) => (
                  <div key={act.id} className="p-2.5 bg-white rounded-lg border border-slate-200/60 shadow-xxs">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide bg-slate-100 px-1.5 py-0.5 rounded-sm">
                        {act.type}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(act.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1.5 leading-normal">{act.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
