"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { showModal } = useModal();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      showModal(
        "Sorry something isn't right",
        "Please check your details and try again."
      );
      return console.log(error);
    }

    return router.push("/");
  };
  return (
    <div className="text-center">
      <div className="mt-4 col-md-3 mx-auto p-2">
        <h1 className="fs-5">
          If you are a teacher, please sign in to access teacher materials. If
          you don&apos;t have an account please contact us to register.
        </h1>
        <p>
          *** to test teacher sign-in use email: teacherTest@test.com pw:
          teachertest
        </p>
        <form onSubmit={handleForm} className="form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
                className="form-control"
                aria-describedby="emailHelp"
                autoComplete="off"
              />
            </label>
            <div id="emailHelp" className="form-text">
              We&apos;ll <strong>never</strong> share your email with anyone.
            </div>
            <label className="mt-3" htmlFor="password">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="form-control"
                autoComplete="off"
              />
            </label>
          </div>

          <button type="submit" className="btn btn-outline-success">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
