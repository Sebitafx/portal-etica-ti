# Firestore Security Rules Specification

## 1. Data Invariants
- **Identity Integrity**: No user may spoof another user's identity. Writes (creation/updates) of user data must have IDs matching `request.auth.uid`.
- **Relational Integrity**: 
  - Comments can only be created if the referenced `threadId` exists and that thread is not locked (`isLocked == false`).
  - Flagged reports can only be submitted with the current user's authenticated ID.
- **Role Isolation/Privilege Escalation**: Standard users cannot modify administrative attributes (`isAdmin`, `isBanned`, `status`).

## 2. The "Dirty Dozen" Payloads (Denial Scenarios)
1. **User Spoofing on User Profile**: Attempting to register or overwrite another user's profile info path `users/malicious_id` with a real credential `request.auth.uid == victim_id`.
2. **Self-Elevating Admin Role**: Attempting to set `users/{uid}.isAdmin = true` as a non-admin user.
3. **Ghost Field Injection**: Adding an undocumented `ghostField: "unauthorized_val"` during a thread update.
4. **Writing to a Locked Thread**: Posting a comment when `thread.isLocked` is true.
5. **Timestamp Hijacking**: Injecting a mock client datetime string past or future on thread creation.
6. **Poison ID Injection**: Specifying a 2MB long random-character string as a document ID to exhaust resources.
7. **Bypassing Invariant**: Deleting a thread owned by another forum participant.
8. **Malicious Report Spoofing**: Submitting an infraction report on comment `comm_abc` with field `reportedBy` set to a victim's user ID.
9. **Spamming Payload String Exceeding Limits**: Sending a 10MB thread description.
10. **Global Notification Scrape**: Attempting to list all visual notifications from all users.
11. **Immutability Mutation**: Modifying a thread's original `authorId` or `createdAt` fields on edit.
12. **Banned User Access**: Posting a comment or thread when the user's status is suspended or banned.
