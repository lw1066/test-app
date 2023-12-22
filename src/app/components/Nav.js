'use client'

import { useEffect, useState, useContext } from 'react';
import { signOutUser } from '../../firebase/auth/signout';
import { DarkModeContext } from '@/context/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useAuthContext } from "@/context/AuthContext";
import Button from 'react-bootstrap/Button';
import classes from './Nav.module.css';
import { auth } from '../../firebase/config';

function Navigation() {
  const { user } = useAuthContext();
  const isAdmin = user? user.isAdmin : false;

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleToggleDarkMode = () => {
    toggleDarkMode(); // Call the function to toggle dark mode in your context
    console.log(darkMode)
  };
  
  const handleSignout = async () => {
    await signOutUser();
    redirectToSignIn(); // Redirect to '/signin' after signout
  };

  const redirectToSignIn = () => {
    window.location.href = '/Signin'; // Redirect function
  };
  

    return (
      <div data-bs-theme={darkMode ? 'dark' :''}>
      <nav className={`navbar navbar-expand-lg `} >
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
          <img
                src='/images/perceptia_logo.jpg'
                alt='The doors of perception'
                className={`d-inline-block align-top ${classes.logo}`}
            />{'      '}
            <span className={classes.title}>Perceptia Press</span>
          </Link>
          <button
            className="navbar-toggler"
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="About">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="contact" href="Contact">
                  Contact us
                </Link>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Contact us...
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="Contact">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="Sample">
                      Request a sample
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="Sample">
                      Make a submission
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    {isAdmin===true && <a className="dropdown-item" href="Admin">
                      Admin
                    </a>}
                  </li>
                </ul>
              </li> */}
             {!user && <li className="nav-item">
                <Link className="nav-link" href="Signin">
                  Teacher Sign-in
                </Link>
              </li>}
              {user && <Button variant='outline-danger' onClick={handleSignout}>Signout</Button>}
              <li className="nav-item">
                {/* Dark mode toggle button */}
                {console.log(user)}
                <Button variant='light' className="rounded-circle ms-2" onClick={handleToggleDarkMode}>
                  <FontAwesomeIcon icon= {darkMode ? faMoon : faSun} />
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