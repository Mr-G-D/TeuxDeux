import {
  getDocs,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./db";

export const readData = async (table) => {
  const collectionRef = collection(db, table);
  const data = await getDocs(collectionRef);
  return data.docs.map((ele) => ({ ...ele.data(), id: ele.id }));
};

export const updateData = async (table, id, data) => {
  try {
    const newDoc = doc(db, table, id);
    await updateDoc(newDoc, data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (table, id) => {
  const data = doc(db, table, id);
  await deleteDoc(data);
};
