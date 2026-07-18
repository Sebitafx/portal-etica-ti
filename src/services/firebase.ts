import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  enableMultiTabIndexedDbPersistence,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const hasConfig = firebaseConfig.apiKey?.length > 0;
export const isFirebaseReady = hasConfig;

let auth!: ReturnType<typeof getAuth>;
let db!: ReturnType<typeof getFirestore>;
let storage!: ReturnType<typeof getStorage>;
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (hasConfig && getApps().length === 0) {
  try {
    const app = initializeApp(firebaseConfig, "ethicode");
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    if (import.meta.env.VITE_USE_EMULATORS === "true") {
      connectAuthEmulator(auth, "http://localhost:9099");
      connectFirestoreEmulator(db, "localhost", 8080);
      connectStorageEmulator(storage, "localhost", 9199);
    }

    enableMultiTabIndexedDbPersistence(db).catch(() => {});

    // Initialize Analytics if supported in the environment (e.g. browser context)
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    });
  } catch (e) {
    console.warn("Firebase init failed:", e);
  }
}

export { auth, db, storage, analytics };
