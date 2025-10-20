import { Injectable, inject } from "@angular/core";
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs, // new version 
  serverTimestamp // new version
} from "@angular/fire/firestore";
//import { getDocs, serverTimestamp } from "firebase/firestore"; // old version
import { Activity } from "../models/activity";


@Injectable({ providedIn: "root" })
export class DbActivityService {
  // Use Angular's `inject` function to get an instance of the Firestore service.
  private db = inject(Firestore);
  // Define a constant for the collection name to avoid "magic strings" and make it easy to change.
  private readonly COLLECTION = "activity";

    /** List the current user's Activitys once (newest first). */
  async list(): Promise<Activity[]> {
    const col = collection(this.db, this.COLLECTION);
    const snap = await getDocs(col);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Activity));
  }


  /** Get a single Activity by id (once). Returns null if not found. */
  async get(id: string): Promise<Activity | null> {
    const ref = doc(this.db, this.COLLECTION, id);
    const snap = await getDoc(ref);
    return snap.exists() ? {id:snap.id, ...snap.data()} as Activity : null;
  }

  /** Create a Activity and return its new id. */
  async add(data:Activity): Promise<string> {
    const res = await addDoc(collection(this.db, this.COLLECTION), {
      ...data,
    });
    return res.id;
  }

  /** Patch fields on a Activity. */
  async update(id: string, patch: Partial<Activity>): Promise<void> {
    await updateDoc(doc(this.db, this.COLLECTION, id), {
      ...patch,
      updatedAt: serverTimestamp(),
    } as any);
  }

  /** Delete a Activity. */
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.db, this.COLLECTION, id));
  }

}