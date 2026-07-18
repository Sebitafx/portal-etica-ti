import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail,
  deleteUser,
  type User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage, isFirebaseReady } from "@/services/firebase";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: "user" | "admin";
  isBanned: boolean;
  createdAt: string;
  threadCount: number;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  fastLogin: (uid: string, displayName: string, email: string, isAdmin?: boolean) => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
  logActivity: (type: string, description: string) => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  uploadPhoto: (file: File) => Promise<string>;
  isAdmin: boolean;
  isBanned: boolean;
  firebaseReady: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function notReady(): never {
  throw new Error(
    "Firebase no está configurado. Completa el archivo .env con las credenciales de tu proyecto Firebase."
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseReady || !auth || !db) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser && db) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as UserProfile);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    if (!auth || !db) notReady();
    await signInWithEmailAndPassword(auth!, email, password);
    const docRef = doc(db!, "users", auth!.currentUser!.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const profile = docSnap.data() as UserProfile;
      if (profile.isBanned) {
        await signOut(auth!);
        throw new Error("Tu cuenta ha sido suspendida.");
      }
    } else {
      // Auto-create document if user was created directly via Firebase console
      await setDoc(docRef, {
        uid: auth!.currentUser!.uid,
        displayName: auth!.currentUser!.displayName || email.split("@")[0],
        email,
        photoURL: auth!.currentUser!.photoURL || "",
        role: email.includes("admin") ? "admin" : "user",
        isBanned: false,
        createdAt: new Date().toISOString(),
        threadCount: 0,
      });
    }
    await logActivity("login", "Inicio de sesión");
  };

  const register = async (email: string, password: string, displayName: string) => {
    if (!auth || !db) notReady();
    const cred = await createUserWithEmailAndPassword(auth!, email, password);
    await firebaseUpdateProfile(cred.user, { displayName });
    await setDoc(doc(db!, "users", cred.user.uid), {
      uid: cred.user.uid,
      displayName,
      email,
      photoURL: "",
      role: "user",
      isBanned: false,
      createdAt: new Date().toISOString(),
      threadCount: 0,
    });
    await logActivity("register", "Registro de cuenta");
  };

  const logout = async () => {
    if (!auth) notReady();
    await logActivity("logout", "Cierre de sesión");
    await signOut(auth!);
  };

  const fastLogin = async (uid: string, displayName: string, email: string, isAdmin = false) => {
    if (!db) notReady();
    const docRef = doc(db, "users", uid);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      await setDoc(docRef, {
        uid,
        displayName,
        email,
        photoURL: "",
        role: isAdmin ? "admin" : "user",
        isBanned: false,
        createdAt: new Date().toISOString(),
        threadCount: 0,
      });
    }
    const updated = await getDoc(docRef);
    setUserProfile(updated.data() as UserProfile);
  };

  const recoverPassword = async (email: string) => {
    if (!auth) notReady();
    await sendPasswordResetEmail(auth!, email);
  };

  const deleteAccount = async () => {
    if (!auth || !db || !user) notReady();
    await deleteDoc(doc(db, "users", user.uid));
    await deleteUser(user);
  };

  const logActivity = async (type: string, description: string) => {
    if (!db || !user?.uid) return;
    try {
      await addDoc(collection(db, "activities"), {
        userId: user.uid,
        type,
        description,
        createdAt: serverTimestamp(),
      });
    } catch {
      // Silently fail - activity logging is non-critical
    }
  };

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (!user || !db) return;
    if (data.displayName) {
      await firebaseUpdateProfile(user, { displayName: data.displayName });
    }
    if (data.photoURL !== undefined) {
      await firebaseUpdateProfile(user, { photoURL: data.photoURL });
    }
    const updateData: Record<string, string> = {};
    if (data.displayName) updateData.displayName = data.displayName;
    if (data.photoURL !== undefined) updateData.photoURL = data.photoURL;
    if (Object.keys(updateData).length > 0) {
      await updateDoc(doc(db, "users", user.uid), updateData);
    }
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      setUserProfile(docSnap.data() as UserProfile);
    }
    await logActivity("edit_profile", "Actualización de perfil");
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    if (!user || !storage) notReady();
    const storageRef = ref(storage!, `users/${user.uid}/profile.jpg`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateUserProfile({ photoURL: url });
    return url;
  };

  const isAdmin = userProfile?.role === "admin";
  const isBanned = userProfile?.isBanned ?? false;

  return (
    <AuthContext.Provider
      value={{
        user, userProfile, loading,
        login, register, logout,
        fastLogin, recoverPassword, deleteAccount, logActivity,
        updateUserProfile, uploadPhoto,
        isAdmin, isBanned,
        firebaseReady: isFirebaseReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
