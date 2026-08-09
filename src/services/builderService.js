import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export async function saveBuilder(builder) {
  const buildersRef = collection(db, "builders");

  const mobileQuery = query(
    buildersRef,
    where("mobile", "==", builder.mobile)
  );

  const emailQuery = query(
    buildersRef,
    where("email", "==", builder.email)
  );

  const [mobileSnapshot, emailSnapshot] = await Promise.all([
    getDocs(mobileQuery),
    getDocs(emailQuery),
  ]);

  if (!mobileSnapshot.empty) {
    throw new Error("This mobile number is already registered.");
  }

  if (!emailSnapshot.empty) {
    throw new Error("This email address is already registered.");
  }

  await setDoc(
    doc(db, "builders", builder.builderId),
    builder
  );
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