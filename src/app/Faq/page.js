"use client";

import FAQAccordion from "../components/FAQAccordion";
import classes from "../components/Library.module.css";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className={classes.bannerImage}>
        <img
          src="/images/faq_image.jpg"
          alt="student asking a question"
          className={classes.bannerImage}
        />
        <h1 className={classes.pageImageText}>Frequently Asked Questions</h1>
      </div>
      <div className="d-flex flex-column  align-items-center justify-content-center mt-2 mb-5">
        <p className={classes.pageDescription}>
          Any more questions -&nbsp;
          <Link className={classes.linkStyle} href="Contact">
            Contact us!
          </Link>
        </p>
        <FAQAccordion />
      </div>
    </>
  );
};

export default Page;
