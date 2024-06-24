import { firebaseApp } from "../config";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

export async function forgotPassword(email) {
  let result = null,
    error = null;
  try {
    result = await sendPasswordResetEmail(auth, email);
    result =
      "Password reset email sent successfully. Please check your inbox (inc spam) for further instructions.";
  } catch (e) {
    error = e;
  }

  return { result, error };
}
