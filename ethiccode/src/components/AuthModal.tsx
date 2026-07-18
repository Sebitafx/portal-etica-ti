/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Image as ImageIcon, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';
import { isFirebaseEnabled } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  mockUsers: UserProfile[];
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess, mockUsers }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'recover'>('login');
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhoto, setRegPhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150');
  
  // Recovery fields
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  
  // Email verification screen for registration
  const [needsVerificationScreen, setNeedsVerificationScreen] = useState(false);
  const [registeredPendingUser, setRegisteredPendingUser] = useState<UserProfile | null>(null);

  // Error/Success statuses
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!loginEmail || !loginPassword) {
      setError('Por favor complete todos los campos.');
      return;
    }

    // In Simulation mode (or real Auth mock), we look up the user
    const found = mockUsers.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (found) {
      if (found.isBanned) {
        setError(`Esta cuenta ha sido suspendida por la administración. Razón: ${found.banReason || 'Incumplimiento de normas'}.`);
        return;
      }
      onAuthSuccess(found);
      setSuccess('Sesión iniciada con éxito.');
      onClose();
    } else {
      setError('Usuario no encontrado o contraseña incorrecta en la simulación.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Strict validation (RF01)
    if (!regName.trim()) {
      setError('El nombre de usuario es obligatorio.');
      return;
    }
    if (regName.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres.');
      return;
    }
    if (!regEmail.includes('@') || regEmail.length < 5) {
      setError('Ingrese un correo electrónico válido.');
      return;
    }
    if (regPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const newUser: UserProfile = {
      uid: 'user_' + Math.random().toString(36).substr(2, 9),
      email: regEmail,
      displayName: regName,
      photoURL: regPhoto,
      emailVerified: false, // RF06: Needs verification first
      createdAt: new Date().toISOString(),
      isAdmin: false,
      isBanned: false,
      status: 'active'
    };

    setRegisteredPendingUser(newUser);
    setNeedsVerificationScreen(true);
  };

  const verifyEmailSimulated = () => {
    if (registeredPendingUser) {
      const verifiedUser = { ...registeredPendingUser, emailVerified: true };
      onAuthSuccess(verifiedUser);
      setSuccess('¡Correo verificado con éxito! Cuenta activada.');
      setNeedsVerificationScreen(false);
      onClose();
    }
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!recoverEmail || !recoverEmail.includes('@')) {
      setError('Ingrese una dirección de correo válida.');
      return;
    }

    setRecoverySent(true);
    setTimeout(() => {
      setRecoverySent(false);
      setSuccess('Se ha enviado un enlace de recuperación a tu correo electrónico.');
      setActiveTab('login');
    }, 2500);
  };

  const handleFastLogin = (user: UserProfile) => {
    onAuthSuccess(user);
    setSuccess(`Ingresaste como ${user.displayName}`);
    onClose();
  };

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150'
  ];

  if (!isOpen) return null;

  return (
    <div id="auth-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-100"
      >
        {/* Banner */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-semibold tracking-tight">Foro de Ética</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {isFirebaseEnabled ? 'Autenticación real por Firebase' : 'Ingresa o simula identidades para pruebas'}
            </p>
          </div>
          <button 
            id="close-auth-btn"
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div id="auth-error-banner" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-sm">
              <ShieldAlert className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div id="auth-success-banner" className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-2.5 text-emerald-800 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {needsVerificationScreen ? (
            /* Email verification pending (RF06) */
            <div id="email-verification-panel" className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Verifique su correo electrónico</h3>
              <p className="text-slate-600 text-sm mt-2 max-w-sm mx-auto">
                Registramos a <strong>{registeredPendingUser?.displayName}</strong>. Hemos enviado un enlace de confirmación simulado a <span className="font-mono text-xs">{registeredPendingUser?.email}</span>.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  id="verify-email-btn"
                  onClick={verifyEmailSimulated}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-xl shadow-xs transition-colors text-sm"
                >
                  Confirmar Verificación (Simulado ✉️)
                </button>
                <button
                  id="cancel-verification-btn"
                  onClick={() => setNeedsVerificationScreen(false)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-xl transition-colors text-sm"
                >
                  Volver al Registro
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-slate-100 mb-6 pb-px">
                <button
                  id="tab-login"
                  onClick={() => { setActiveTab('login'); setError(''); }}
                  className={`flex-1 pb-3 text-center text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'login' 
                      ? 'border-slate-900 text-slate-900' 
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  id="tab-register"
                  onClick={() => { setActiveTab('register'); setError(''); }}
                  className={`flex-1 pb-3 text-center text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'register' 
                      ? 'border-slate-900 text-slate-900' 
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Crear Cuenta (RF01)
                </button>
              </div>

              {activeTab === 'login' && (
                <form id="login-form" onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5Packed">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        id="login-email-input"
                        type="email"
                        placeholder="ejemplo@ethics.org"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Contraseña</label>
                      <button
                        id="forgot-password-link"
                        type="button"
                        onClick={() => setActiveTab('recover')}
                        className="text-xs text-slate-600 hover:text-slate-900 hover:underline"
                      >
                        ¿Olvidó su contraseña?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        id="login-password-input"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <button
                    id="submit-login-btn"
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-xl shadow-xs transition-colors text-sm mt-2"
                  >
                    Ingresar con Email
                  </button>
                </form>
              )}

              {activeTab === 'register' && (
                <form id="register-form" onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Nombre Completo</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        id="reg-name-input"
                        type="text"
                        placeholder="Nombre de filósofo o pensador"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        id="reg-email-input"
                        type="email"
                        placeholder="ejemplo@ethics.org"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Contraseña (Mínimo 6 caracteres)</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        id="reg-password-input"
                        type="password"
                        placeholder="••••••••"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Foto de Perfil</label>
                    <div className="flex items-center gap-3">
                      <img 
                        src={regPhoto} 
                        alt="Profile preview" 
                        className="w-12 h-12 rounded-full border border-slate-200 object-cover shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 mb-2">Seleccione una foto preestablecida o proporcione el enlace:</p>
                        <div className="grid grid-cols-6 gap-1.5">
                          {avatarPresets.map((preset, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setRegPhoto(preset)}
                              className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
                                regPhoto === preset ? 'border-slate-900 scale-105' : 'border-transparent hover:scale-105'
                              }`}
                            >
                              <img src={preset} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-3">
                      <ImageIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        id="reg-photo-url-input"
                        type="url"
                        placeholder="https://enlace-a-tu-imagen.jpg"
                        value={regPhoto}
                        onChange={(e) => setRegPhoto(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-xs"
                      />
                    </div>
                  </div>

                  <button
                    id="submit-register-btn"
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-xl shadow-xs transition-colors text-sm mt-3"
                  >
                    Registrar Cuenta (Enviar Enlace Verificación)
                  </button>
                </form>
              )}

              {activeTab === 'recover' && (
                <form id="recover-form" onSubmit={handleRecovery} className="space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ingrese el correo electrónico asociado a su cuenta. Le enviaremos instrucciones inmediatas para restablecer su clave de acceso.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Correo Registrado</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        id="recover-email-input"
                        type="email"
                        placeholder="ejemplo@ethics.org"
                        value={recoverEmail}
                        onChange={(e) => setRecoverEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      id="cancel-recover-btn"
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-xl transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      id="submit-recover-btn"
                      type="submit"
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-xl shadow-xs transition-colors text-sm"
                    >
                      Recuperar Clave
                    </button>
                  </div>
                </form>
              )}

              {/* Developer Demo Account switcher (RF15: < 3 clics para probar, RNF04) */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <span>Acceso Rápido para Pruebas (Admin / Usuarios)</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {mockUsers.map((u) => (
                    <button
                      key={u.uid}
                      id={`fast-login-${u.uid}`}
                      onClick={() => handleFastLogin(u)}
                      className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-slate-100 text-left rounded-xl transition-all border border-slate-200/60"
                    >
                      <img 
                        src={u.photoURL} 
                        alt={u.displayName} 
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-800 truncate">{u.displayName}</p>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1">
                          {u.isAdmin ? (
                            <span className="text-red-600 font-semibold uppercase tracking-wider">Admin</span>
                          ) : (
                            <span className="text-slate-600">Usuario</span>
                          )}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
