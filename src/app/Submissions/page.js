import classes from "../components/Library.module.css";

function Page() {
  const submissionGuideUrl =
    "https://firebasestorage.googleapis.com/v0/b/test-pp-njs.appspot.com/o/MS%20Submission%20Guidelines.pdf?alt=media&token=9132d7c9-35b6-4b15-b534-1e3dbf1a0123";
  const googleFormsLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSc7ncjkKopry6gRQjjcRgjSIfpZZhXmDvsfTjKR5YTbAEoxFQ/viewform?usp=sf_link";
  const emailLink =
    "mailto:submissions@perceptiapress.com?subject=Perceptia Press: Author Submission";

  return (
    <>
      <div className={classes.bannerImage}>
        <img
          src="/images/subsF.jpg"
          alt="student asking a question"
          className={classes.bannerImage}
        />
      </div>
      <div
        className="d-flex flex-column align-items-center justify-content-center mt-5"
        style={{ width: "60%", margin: "10% auto" }}
      >
        <p className={classes.pageDescription}>
          Becoming an Author with Perceptia Press
        </p>
        <p className={classes.pageDescriptionSubmissions}>
          Thank you for your interest in submitting a manuscript to Perceptia
          Press. We are always keen to look at new projects.
        </p>
        <p className={classes.pageDescriptionSubmissions}>
          First download our{" "}
          <a
            href={submissionGuideUrl}
            className={classes.linkStyle}
            target="blank"
          >
            Guidelines
          </a>{" "}
          and consider your submission. Then complete this{" "}
          <a
            href={googleFormsLink}
            className={classes.linkStyle}
            target="blank"
          >
            Proposal
          </a>{" "}
          (opens in googleforms) in as much detail as possible.
        </p>
        <p className={classes.pageDescriptionSubmissions}>
          Finally, send a sample unit (if available) and recent CV including any
          publishing experience to{" "}
          <a className={classes.linkStyle} href={emailLink}>
            submissions@perceptiapress.com
          </a>
          . We look forward to seeing your work.
        </p>
      </div>
    </>
  );
}

export default Page;
