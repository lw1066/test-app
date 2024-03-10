"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Signup from "../components/Signup";
import AddResources from "../components/AddResources";
import { Container } from "react-bootstrap";
import AddNews from "../components/AddNews";
import SetCustomClaimByEmail from "../components/SetCustomClaimByEmail";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const isAdmin = user ? user.isAdmin : false;

  return (
    <div>
      {isAdmin ? (
        <>
          <Container className="d-flex justify-content-center border border-3 border-primary mb-4 p-4">
            <h1>Welcome to the admin page</h1>
          </Container>

          <Container className="d-flex justify-content-center border border-3 border-primary mb-4 p-4">
            <AddResources />
          </Container>

          <Container className="d-flex justify-content-center border border-3 border-primary mb-4 p-4">
            <AddNews />
          </Container>

          <Container className="d-flex justify-content-center border border-3 border-primary mb-4 p-4">
            <Signup />
          </Container>

          <Container className="d-flex justify-content-center border border-3 border-primary mb-4 p-4">
            <SetCustomClaimByEmail />
          </Container>
        </>
      ) : (
        <p> There is nothing for you here! </p>
      )}
    </div>
  );
}

export default Page;
