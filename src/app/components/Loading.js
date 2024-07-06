import Image from "next/image";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "gray", // Change to your desired background color
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "250px", // Adjust width of the circle
          height: "250px", // Adjust height of the circle
          borderRadius: "50%", // Make it circular
          backgroundColor: "white", // White background
          justifyContent: "center", // Center content vertically
          textAlign: "center", // Center text horizontally
          padding: "20px", // Padding inside the circle
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)", // Optional: Add box shadow
        }}
      >
        <Image
          src="/images/perceptia_logo.jpg"
          alt="loading"
          className="img-fluid"
          width={80}
          height={100}
          priority={true}
        />
        <p style={{ color: "black", fontWeight: "500", marginTop: "5px" }}>
          Opening the door...
        </p>
      </div>
    </div>
  );
}
