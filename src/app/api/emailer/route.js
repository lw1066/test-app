import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("hi from the route");
  const body = await req.json();
  console.log("body-------------------", body);

  const {
    name,
    email,
    message,
    bookSamples,
    orderQuery,
    submission,
    other,
    registration,
  } = body;

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

  let mailOptions;

  if (registration) {
    // Compose email for registration
    const {
      firstName,
      familyName,
      schoolOrInstitution,
      address1,
      address2,
      postcode,
      country,
      schoolType,
      levelsTaught,
      teachingInterests,
      agreedToPolicy,
    } = body;

    mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: "lewis_webster@hotmail.com", // Change this to the recipient's email for registration
      subject: `Registration Form Submission: ${firstName} ${familyName}`,
      html: `
        <p>First Name: ${firstName}</p>
        <p>Family Name: ${familyName}</p>
        <p>Email: ${email}</p>
        <p>School or Institution: ${schoolOrInstitution}</p>
        <p>Address 1: ${address1}</p>
        <p>Address 2: ${address2}</p>
        <p>Postcode: ${postcode}</p>
        <p>Country: ${country}</p>
        <p>School Type: ${Object.keys(schoolType)
          .filter((key) => schoolType[key])
          .join(", ")}</p>
        <p>Levels Taught: ${Object.keys(levelsTaught)
          .filter((key) => levelsTaught[key])
          .join(", ")}</p>
        <p>Teaching Interests: ${teachingInterests}</p>
        <p>Agreed to Policy: ${agreedToPolicy ? "Yes" : "No"}</p>
      `,
    };
  } else {
    mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: "lewis_webster@hotmail.com",
      subject: `${[
        bookSamples && "SAMPLES",
        orderQuery && "ORDER",
        submission && "SUB",
        other && "OTHER",
      ]
        .filter(Boolean)
        .join(" + ")} | ${name} | ${email}`,
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Contact about: ${[
          bookSamples && "Samples",
          orderQuery && "Order Query",
          submission && "Submissions",
          other && "Other",
        ]
          .filter(Boolean)
          .join(" + ")}</p>
        <p>Message: ${message}</p>
      `,
    };
  }

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
