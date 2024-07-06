"use client";

import { useEffect } from "react";
import { signOutUser } from "../../firebase/auth/signout";
import { useDarkMode } from "@/context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/legacy/image";
import { useAuthContext } from "@/context/AuthContext";
import Button from "react-bootstrap/Button";
import fetchBooks from "../../firebase/firestore/fetchBooks";
import fetchNewsData from "@/firebase/firestore/fetchNewsData";
import { useModal } from "@/context/ModalContext";
import classes from "./Library.module.css";

function Navigation() {
  const { user } = useAuthContext();
  const isAdmin = user ? user.isAdmin : false;
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { showModal } = useModal();

  const handleToggleDarkMode = () => {
    // const updatedMode = !darkMode;
    toggleDarkMode();
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
    }
  }, [darkMode]);

  const handleSignout = async () => {
    redirectToHome();
    signOutUser();
  };

  const handleRefresh = () => {
    fetchBooks();
    fetchNewsData();
    showModal("News and books refreshed", "go have a look");
  };

  const redirectToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="sticky-top">
      <nav
        className="navbar navbar-expand flex-wrap py-0"
        style={{ zIndex: 1000, backgroundColor: darkMode ? "black" : "white" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand py-0" href="/">
            <div className="d-flex align-items-center justify-content-start">
              <div className={classes.navTitles}>
                <Image
                  src={
                    darkMode
                      ? "/images/perceptia_logo_negative.jpg"
                      : "/images/perceptia_logo.jpg"
                  }
                  alt="The door of perception"
                  object-fit="contain"
                  width={55}
                  height={90}
                  className="img-fluid"
                  priority
                />

                <Image
                  src={
                    darkMode ? "/images/pplogoneg.jpg" : "/images/pplogo.jpg"
                  }
                  alt="perceptia press"
                  object-fit="contain"
                  width={400}
                  height={90}
                  className="img-fluid"
                  priority
                />
              </div>
            </div>
          </Link>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center mb-1">
              <li className="nav-item mx-auto ">
                <Link className={`nav-link ${classes.navText}`} href="Faq">
                  FAQs
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${classes.navText}`} href="Contact">
                  Contact
                </Link>
              </li>
              {user && isAdmin && (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link  ${classes.navText}`}
                      href="Admin"
                    >
                      Admin
                    </Link>
                  </li>
                  <Button
                    variant="outline-danger"
                    className=" ms-2 mb-2 fs-0"
                    onClick={handleRefresh}
                    style={{ fontSize: "10px", padding: "5px 10px" }}
                  >
                    Refresh
                  </Button>
                </>
              )}
              {!user && (
                <li className="nav-item">
                  <Link className={`nav-link ${classes.navText}`} href="Signin">
                    Sign-in
                  </Link>
                </li>
              )}

              {user && (
                <li className="nav-item">
                  <Button
                    variant="outline-danger"
                    className={`${classes.navBtn} rounded-circle `}
                    style={{
                      fontSize: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      lineHeight: "1",
                    }}
                    onClick={handleSignout}
                  >
                    sign out
                  </Button>
                </li>
              )}
              <li className="nav-item">
                <Button
                  variant="light"
                  className={`rounded-circle ${classes.navBtn}`}
                  onClick={handleToggleDarkMode}
                  style={{
                    fontSize: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navigation;
