import { Injectable, inject, signal } from "@angular/core";
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs, serverTimestamp, setDoc,
} from "@angular/fire/firestore";
//import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";

import { Auth, User } from "@angular/fire/auth";
import { onAuthStateChanged } from "@firebase/auth";
import { Profile } from "../models/profile";

@Injectable({ providedIn: "root" })
export class ProfileService {
  
  private db = inject(Firestore);
  private readonly COLLECTION = "profiles";
  private auth = inject(Auth);
  //auth so we can get user id
  user = signal<User | null>(null);
  
  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
    });
  }

  /** Does a document with this id exist? */
  async exists(id: string): Promise<boolean> {
    try {
      const snap = await getDoc(doc(this.db, this.COLLECTION, id));
      return snap.exists();
    } catch (e) {
      // If rules deny read, you can either rethrow or treat as non-existent:
      // throw e;
      return false;
    }
  }

    /** List the current user's todos once (newest first). */
  async list(): Promise<Profile[]> {
    const col = collection(this.db, this.COLLECTION);
    const snap = await getDocs(col);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Profile));
  }


  /** Get a single Profile by id (once). Returns null if not found. */
  async get(id: string): Promise<Profile | null> {
    const ref = doc(this.db, this.COLLECTION, id);
    const snap = await getDoc(ref);
    return snap.exists() ? {id:snap.id, ...snap.data()} as Profile : null;
  }

  /**
   * Create a Profile document using the currently logged-in user's UID.
   * @param data - The profile data fields to set (Partial<Profile> allows providing only some fields initially).
   * @returns The user's UID (which is the document ID).
   */
  /** Create a Profile and return its new id. */
  async create(data: Partial<Profile>): Promise<string> {

    const currentUser = this.user();
    if (!currentUser) {
      throw new Error("User must be logged in to create a profile.");
    }

    // Use the non-null 'currentUser' variable instead of calling this.user() again
    const newDocRef = doc(this.db, this.COLLECTION, currentUser.uid);
    const docId = newDocRef.id;

    await setDoc(
      newDocRef,
      {
        ...data,
        // Use the non-null 'currentUser' variable here too
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: null, // Explicitly set updatedAt to null on creation
      },
      { merge: true }
    );

    return docId;
  }

  /** Patch fields on a Profile. */
  async update(id: string, patch: Partial<Profile>): Promise<void> {
    await updateDoc(doc(this.db, this.COLLECTION, id), {
      ...patch,
      updatedAt: serverTimestamp(),
    } as any);
  }

  /** Delete a Profile. */
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.db, this.COLLECTION, id));
  }

}