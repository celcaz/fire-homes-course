"use server";

import { auth, firestore } from "@/firebase/server";

export const deleteProperty = async (id: string, authToken: string) => {
  const verifiedToken = await auth.verifyIdToken(authToken);
  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  if (!id) {
    return {
      error: true,
      message: "An error ocurred",
    };
  }

  // actually deleting the property in the database
  await firestore.collection("properties").doc(id).delete();

  return { error: false, message: "Property deleted successfully" };
};
