import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";

export async function saveBuilder(builder) {
  const mobileQuery = query(
    collection(db, "builders"),
    where("mobile", "==", builder.mobile)
  );

  const emailQuery = query(
    collection(db, "builders"),
    where("email", "==", builder.email.toLowerCase())
  );

  const [mobileSnap, emailSnap] = await Promise.all([
    getDocs(mobileQuery),
    getDocs(emailQuery),
  ]);

  if (!mobileSnap.empty) {
    throw new Error("This mobile number is already registered.");
  }

  if (!emailSnap.empty) {
    throw new Error("This email is already registered.");
  }

  await setDoc(
    doc(db, "builders", builder.builderId),
    builder
  );

  return builder;
}

export async function getBuilder(builderId) {
  const snap = await getDoc(
    doc(db, "builders", builderId)
  );

  if (!snap.exists()) {
    return null;
  }

  return snap.data();
}

export async function findBuilder(builderId) {
  const cleanId = builderId.trim().toUpperCase();

  if (!cleanId) {
    return null;
  }

  const snap = await getDoc(
    doc(db, "builders", cleanId)
  );

  if (!snap.exists()) {
    return null;
  }

  return snap.data();
}