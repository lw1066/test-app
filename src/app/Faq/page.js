"use client";

import FAQAccordion from "../components/FAQAccordion";
import classes from "../components/Library.module.css";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className={classes.bannerImage}>
        <img
          src="/images/faqF.jpg"
          alt="student asking a question"
          className={classes.bannerImage}
        />
      </div>
      <div className="d-flex flex-column  align-items-center justify-content-center mt-5 mb-5">
        <p className={classes.pageDescription}>
          Any other questions?&nbsp;
          <Link className={classes.linkStyle} href="Contact">
            Contact us.
          </Link>
        </p>
        <FAQAccordion />
      </div>
    </>
  );
};

export default Page;
