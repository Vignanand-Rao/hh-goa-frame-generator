import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function saveBuilder(builder) {
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