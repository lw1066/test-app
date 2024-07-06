import classes from "../components/Library.module.css";

function Page() {
  return (
    <>
      <div className={classes.bannerImage}>
        <img
          src="/images/submissions_image.jpg"
          alt="student asking a question"
          className={classes.bannerImage}
        />
        <h1 className={classes.pageImageText}>Submissions</h1>
      </div>
      <div
        className="d-flex flex-column align-items-center justify-content-center mt-2"
        style={{ width: "60%", margin: "0 auto" }}
      >
        <p className={classes.pageDescription}>
          Becoming an Author with Perceptia Press
        </p>
        <p className={classes.pageDescriptionSubmissions}>
          Thank you for your interest in submitting a manuscript to Perceptia
          Press. We are always interested in looking at new projects.
        </p>
        <p className={classes.pageDescriptionSubmissions}>
          Please download our Submissions Guidelines and consider your
          submission. Then complete this proposal form in as much detail as
          possible.
        </p>
        <p className={classes.pageDescriptionSubmissions}>
          Finally, send a sample unit (if available) and recent CV including any
          publishing experience to{" "}
          <a
            className={classes.linkStyle}
            href="mailto:submissions@perceptiapress.com?subject=Submission &body=Thank%20you%20for%20submitting%20to%20us%20we%20will%20be%20in%20touch."
          >
            submissions@perceptiapress.com
          </a>
          . We look forward to seeing your work.
        </p>
      </div>
    </>
  );
}

export default Page;
