import admin from "firebase-admin";
import { NextResponse } from "next/server";

// Initialize Firebase Admin SDK with environment variables
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log("email received: ", email);

    if (!email) {
      return NextResponse.json({
        success: false,
        error: "Email is required",
      });
    }

    const userRecord = await admin.auth().getUserByEmail(email);
    const { uid } = userRecord;
    console.log("uid: ", uid);

    await admin.auth().setCustomUserClaims(uid, { admin: true });
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Custom claim set successfully",
    });
  } catch (error) {
    console.error("Error setting custom claim: ", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to set custom claim",
    });
  }
}
