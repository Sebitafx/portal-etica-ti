/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { OperationType, FirestoreErrorInfo } from '../types';
import firebaseConfig from '../firebase-applet-config.json';

// Determine if the config is a real deployed configuration or a placeholder
export const isFirebaseEnabled = 
  firebaseConfig && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'placeholder_api_key' &&
  !firebaseConfig.apiKey.startsWith('MY_');

let app;
let authInstance: any = null;
let dbInstance: any = null;

if (isFirebaseEnabled) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    authInstance = getAuth(app);
    // CRITICAL: The app will break if second parameter databaseId is ignored when customized
    dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
    console.log('Firebase successfully initialized on this instance.');

    // CRITICAL CONSTRAINT: Test connection on boot
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(dbInstance, 'test', 'connection'));
        console.log('Firebase connection test succeeded.');
      } catch (error) {
        if (error instanceof Error && error.message.includes('offline')) {
          console.error("Please check your Firebase configuration. Client appears to be offline.");
        } else {
          console.log("Firebase initialized. Test doc not found, which is expected:", error);
        }
      }
    };
    testConnection();
  } catch (error) {
    console.error('Error initializing real Firebase service, falling back to simulation:', error);
  }
} else {
  console.log('Using robust Ethics Forum Offline/Local Storage Simulation Engine.');
}

export const auth = authInstance;
export const db = dbInstance;

/**
 * Handles errors during firestore operations, printing formatted telemetry for tracking.
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
    },
    operationType,
    path,
  };
  console.error('Firestore Security Rule Violation or Quota Block: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
