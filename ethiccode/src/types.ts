/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  createdAt: string;
  isAdmin: boolean;
  isBanned: boolean;
  banReason?: string;
  status: 'active' | 'suspended';
}

export type ThreadCategory = 'Ética Digital' | 'Bioética' | 'Ética Profesional' | 'Ética Ambiental' | 'Dilemas Morales';

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  createdAt: string;
  updatedAt?: string;
  isLocked: boolean;
  replyCount: number;
  keywords: string[];
}

export interface Comment {
  id: string;
  threadId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  createdAt: string;
  updatedAt?: string;
  quotedCommentId?: string | null;
  quotedCommentText?: string | null;
  quotedCommentAuthor?: string | null;
}

export interface Report {
  id: string;
  type: 'thread' | 'comment';
  targetId: string; // threadId or commentId
  threadId: string; // always link to thread for context
  reason: string;
  reportedBy: string;
  reportedByName: string;
  contentSummary: string; // preview of the reported text
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'register' | 'login' | 'create_thread' | 'create_comment' | 'edit_profile' | 'delete_thread' | 'edit_comment' | 'report' | 'delete_comment' | 'delete_account';
  description: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  recipientId: string;
  senderName: string;
  type: 'comment';
  threadId: string;
  threadTitle: string;
  createdAt: string;
  read: boolean;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}
