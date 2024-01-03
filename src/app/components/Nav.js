'use client'

import { useEffect } from 'react';
import { signOutUser } from '../../firebase/auth/signout';
import { useDarkMode } from '@/context/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useAuthContext } from "@/context/AuthContext";
import Button from 'react-bootstrap/Button';
import classes from './Nav.module.css';


function Navigation() {
  const { user } = useAuthContext();
  const isAdmin = user? user.isAdmin : false;
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleToggleDarkMode = () => {
    const updatedMode = !darkMode;
    toggleDarkMode();
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-bs-theme');
    }
  }, [darkMode]);
  
  const handleSignout = async () => {
    redirectToHome(); 
    signOutUser();
  };

  const redirectToHome = () => {
    window.location.href = '/'; 
  };
  

    return (
      <div className="sticky-top">
      <nav className='navbar navbar-expand-lg' style={{ zIndex: 1000, backgroundColor: darkMode ? 'black' : 'white' }} >
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
          <img
                src={ darkMode ? "/images/perceptia_logo_negative.jpg": "/images/perceptia_logo.jpg"}
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
                <Link className="nav-link" aria-current="page" href="About">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="contact" href="Contact">
                  Contact us
                </Link>
              </li>
             {!user && <li className="nav-item">
                <Link className="nav-link" href="Signin">
                  Teacher Sign-in
                </Link>
              </li>}
              {user && <Button variant='outline-danger' onClick={handleSignout}>Signout</Button>}
              <li className="nav-item">
                {/* Dark mode toggle button */}
                <Button variant='light' className="rounded-circle ms-2" onClick={handleToggleDarkMode}>
                  <FontAwesomeIcon icon= {darkMode ? faSun : faMoon} />
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