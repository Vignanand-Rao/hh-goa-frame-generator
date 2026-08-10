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


// =====================================================
// SAVE BUILDER
// =====================================================

export async function saveBuilder(builder) {
  const builderData = {
    ...builder,

    // Keep email consistent for searching
    email: builder.email
      ? builder.email.trim().toLowerCase()
      : "",

    // Keep mobile as a string
    mobile: builder.mobile
      ? String(builder.mobile).trim()
      : "",
  };

  await setDoc(
    doc(db, "builders", builder.builderId),
    builderData
  );
}


// =====================================================
// GET BUILDER BY BUILDER ID
// =====================================================

export async function getBuilder(builderId) {
  if (!builderId) {
    return null;
  }

  const normalizedId = builderId
    .trim()
    .toUpperCase();

  const snap = await getDoc(
    doc(db, "builders", normalizedId)
  );

  if (!snap.exists()) {
    return null;
  }

  return snap.data();
}


// =====================================================
// GET BUILDER BY EMAIL
// =====================================================

export async function getBuilderByEmail(email) {
  if (!email) {
    return null;
  }

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  if (!normalizedEmail) {
    return null;
  }

  const buildersRef = collection(
    db,
    "builders"
  );

  const emailQuery = query(
    buildersRef,
    where("email", "==", normalizedEmail)
  );

  const snapshot = await getDocs(emailQuery);

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data();
}