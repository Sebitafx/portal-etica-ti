import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";

initializeApp();
const db = getFirestore();

/**
 * Mantiene el contador commentCount en threads automáticamente
 * cuando se agrega o elimina un comentario (subcolección).
 */
export const onCommentWritten = onDocumentWritten(
  "threads/{threadId}/comments/{commentId}",
  async (event) => {
    const { threadId } = event.params;
    const threadRef = db.collection("threads").doc(threadId);

    const snapshot = await db
      .collection("threads")
      .doc(threadId)
      .collection("comments")
      .count()
      .get();

    await threadRef.update({
      commentCount: snapshot.data().count,
      updatedAt: new Date().toISOString(),
    });
  }
);
