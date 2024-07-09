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
    subject: `${[
      bookSamples && "SAMPLES",
      orderQuery && "ORDER",
      submission && "SUB",
    ]
      .filter(Boolean)
      .join(" + ")} | ${name} | ${email}`,

    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
     <p>
  Contact about: ${[
    bookSamples && "Samples",
    orderQuery && "Order Query",
    submission && "Submissions",
  ]
    .filter(Boolean)
    .join(" + ")}
</p>
      <p>Message: ${message}</p>
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
