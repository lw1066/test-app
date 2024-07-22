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
import { usePathname } from "next/navigation";
import { SocialLinks } from "./SocialLinks";

function Navigation() {
  const { user } = useAuthContext();
  const isAdmin = user ? user.isAdmin : false;
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { showModal } = useModal();
  const pathname = usePathname();

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

  const handleRefresh = async () => {
    await fetchBooks();
    await fetchNewsData();
    localStorage.setItem("showModalAfterReload", "true");
    localStorage.setItem("modalMessage", `Should all be up to date`);

    window.location.replace("/");
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
        <div className="container-fluid navBar">
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
          <div className={`ms-auto ${classes.navBarLinksContainer}`}>
            <div className={`${classes.socialLinks}`}>
              <SocialLinks />
            </div>
            <div
              className="collapse navbar-collapse justify-content-end"
              style={{ minWidth: "290px" }}
              id="navbar"
            >
              <ul className="navbar-nav ms-auto align-items-center mb-1">
                <li className="nav-item" style={{ width: "64px" }}>
                  <Link
                    className="nav-link"
                    style={{
                      transform: pathname === "/" ? "scale(1.2)" : "scale(1)",
                      fontWeight: pathname === "/" ? "900" : "normal",
                      transition:
                        "transform 0.6s ease-in-out, font-weight 0.3s ease-in-out",
                    }}
                    href="/"
                  >
                    <span className={classes.navLinkText}>Home</span>
                  </Link>
                </li>
                <li className="nav-item" style={{ width: "55px" }}>
                  <Link
                    className={`nav-link ${classes.navLink}`}
                    style={{
                      transform:
                        pathname === "/Faq" ? "scale(1.2)" : "scale(1)",
                      fontWeight: pathname === "/Faq" ? "900" : "normal",
                      transition:
                        "transform 0.6s ease-in-out, font-weight 0.3s ease-in-out",
                    }}
                    href="Faq"
                  >
                    <span className={classes.navLinkText}>FAQs</span>
                  </Link>
                </li>
                <li className="nav-item" style={{ width: "72px" }}>
                  <Link
                    className="nav-link"
                    style={{
                      transform:
                        pathname === "/Contact" ? "scale(1.2)" : "scale(1)",
                      fontWeight: pathname === "/Contact" ? "900" : "normal",
                      transition:
                        "transform 0.6s ease-in-out, font-weight 0.3s ease-in-out",
                    }}
                    href="Contact"
                  >
                    <span className={classes.navLinkText}>Contact</span>
                  </Link>
                </li>
                {user && isAdmin && (
                  <>
                    <li className="nav-item" style={{ width: "55px" }}>
                      <Link
                        className="nav-link"
                        style={{
                          transform:
                            pathname === "/Admin" ? "scale(1.2)" : "scale(1)",
                          fontWeight: pathname === "/Admin" ? "900" : "normal",
                          transition:
                            "transform 0.6s ease-in-out, font-weight 0.3s ease-in-out",
                        }}
                        href="Admin"
                      >
                        <span className={classes.navLinkText}>Admin</span>
                      </Link>
                    </li>
                    {/* <Button
                      variant="outline-danger"
                      className=" ms-2 mb-2 fs-0"
                      onClick={handleRefresh}
                      style={{ fontSize: "10px", padding: "5px 10px" }}
                    >
                      Refresh
                    </Button> */}
                  </>
                )}
                {!user && (
                  <li className="nav-item" style={{ width: "68px" }}>
                    <Link
                      className="nav-link"
                      style={{
                        transform:
                          pathname === "/Signin" ? "scale(1.2)" : "scale(1)",
                        fontWeight: pathname === "/Signin" ? "900" : "normal",
                        transition:
                          "transform 0.6s ease-in-out, font-weight 0.3s ease-in-out",
                      }}
                      href="Signin"
                    >
                      <span className={classes.navLinkText}>Sign-in</span>
                    </Link>
                  </li>
                )}

                {user && (
                  <li className="nav-item" style={{ width: "45px" }}>
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
        </div>
      </nav>
    </div>
  );
}
export default Navigation;
