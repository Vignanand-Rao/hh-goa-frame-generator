import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export async function saveBuilder(builder) {
  const normalizedMobile = builder.mobile.trim();
  const normalizedEmail = builder.email.trim().toLowerCase();

  const mobileQuery = query(
    collection(db, "builders"),
    where("mobile", "==", normalizedMobile)
  );

  const emailQuery = query(
    collection(db, "builders"),
    where("email", "==", normalizedEmail)
  );

  const [mobileSnapshot, emailSnapshot] = await Promise.all([
    getDocs(mobileQuery),
    getDocs(emailQuery),
  ]);

  const mobileExists = mobileSnapshot.docs.some(
    (item) => item.id !== builder.builderId
  );

  const emailExists = emailSnapshot.docs.some(
    (item) => item.id !== builder.builderId
  );

  if (mobileExists) {
    throw new Error("This mobile number is already registered.");
  }

  if (emailExists) {
    throw new Error("This email address is already registered.");
  }

  await setDoc(
    doc(db, "builders", builder.builderId),
    {
      ...builder,
      mobile: normalizedMobile,
      email: normalizedEmail,
    }
  );
}

export async function getBuilder(builderId) {
  const snap = await getDoc(
    doc(db, "builders", builderId.trim().toUpperCase())
  );

  if (!snap.exists()) {
    return null;
  }

  return snap.data();
}