// /pages/api/sendEmail.js

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("hi from the route");
  const body = await req.json();
  console.log("body-------------------", body);
  const { name, email, message, bookSamples, orderQuery, submission } = body;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  // Compose email
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: "lewis_webster@hotmail.com", // Change this to the recipient's email
    subject: `Contact: ${name},  ${bookSamples ? "SAMPLES" : ""} ${
      orderQuery ? "ORDER" : ""
    } ${submission ? "SUB" : ""}`,
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
      <p>Book Samples: ${bookSamples ? "Yes" : "No"}</p>
      <p>Order Query: ${orderQuery ? "Yes" : "No"}</p>
      <p>Submission: ${submission ? "Yes" : "No"}</p>
    `,
  };

  console.log("mailoptions---------------------", mailOptions);

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.log("error----", error);
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
