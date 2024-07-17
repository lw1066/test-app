import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useDarkMode } from "@/context/DarkModeContext";
import Link from "next/link";
import classes from "./Library.module.css";

export const SocialLinks = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className="d-flex justify-content-center mx-auto">
      <a
        href="https://www.facebook.com/perceptiapress/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        <FontAwesomeIcon
          icon={faFacebook}
          size="lg"
          color={darkMode ? "white" : "black"}
          className={classes.socialLink}
        />
      </a>
      <a
        href="https://www.instagram.com/perceptiapress/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none mx-4"
      >
        <FontAwesomeIcon
          icon={faInstagram}
          size="lg"
          color={darkMode ? "white" : "black"}
          margin="0"
          className={classes.socialLink}
        />
      </a>
      <a
        href="https://www.youtube.com/channel/UCjGuvG6n2zBnKPdpelMXlXg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        <FontAwesomeIcon
          icon={faYoutube}
          size="lg"
          color={darkMode ? "white" : "black"}
          className={classes.socialLink}
        />
      </a>
    </div>
  );
};
