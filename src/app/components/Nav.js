
import { signOutUser } from '../../firebase/auth/signout';
import Link from 'next/link';
import { useAuthContext } from "@/context/AuthContext";
import Button from 'react-bootstrap/Button';
import classes from './Nav.module.css';



function Navigation() {
  const { user } = useAuthContext();

  const handleSignout = async () => {
    await signOutUser();
    redirectToSignIn(); // Redirect to '/signin' after signout
  };

  const redirectToSignIn = () => {
    window.location.href = '/Signin'; // Redirect function
  };
  

    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
              <li className="nav-item dropdown">
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
                    <a className="dropdown-item" href="Contact">
                      Contact us
                    </a>
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
                    <a className="dropdown-item" href="Admin">
                      Admin
                    </a>
                  </li>
                </ul>
              </li>
             {!user && <li className="nav-item">
                <Link className="nav-link" href="Signin">
                  Teacher Sign-in
                </Link>
              </li>}
              {user && <Button onClick={handleSignout}>Signout</Button>}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
 export default Navigation;