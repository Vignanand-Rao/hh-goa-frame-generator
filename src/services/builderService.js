import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export async function saveBuilder(builder) {
  if (!builder?.builderId) {
    throw new Error("Builder ID is required.");
  }

  await setDoc(
    doc(
      db,
      "builders",
      builder.builderId
    ),
    builder
  );
}

export async function getBuilder(builderId) {
  if (!builderId) {
    return null;
  }

  const snap = await getDoc(
    doc(
      db,
      "builders",
      builderId
    )
  );

  if (!snap.exists()) {
    return null;
  }

  return snap.data();
}