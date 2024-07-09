import Image from "next/image";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#adadad",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          backgroundColor: "white",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
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
