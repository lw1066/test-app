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
        <p className={classes.pageDescription}>
          Thank you for your interest in submitting a manuscript to Perceptia
          Press. We are always interested in looking at new projects.
        </p>
        <p className={classes.pageDescription}>
          Please download and check the Submissions Guidelines, then complete
          this proposal form carefully and in as much detail as possible.
          Finally, send a sample unit (if available) and recent CV including any
          publishing experience to submissions@perceptiapress.com. We look
          forward to seeing your work.
        </p>
      </div>
    </>
  );
}

export default Page;
