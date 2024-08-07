import { useState } from "react";
import { useDarkMode } from "@/context/DarkModeContext";
import { Button, Modal, ListGroup, ListGroupItem } from "react-bootstrap";
import classes from "@/app/components/Library.module.css";
// import AddResources from "@/app/components/AddResources";
// import { getAndModifyDoc } from "@/firebase/firestore/getAndModifyDoc";
import { useAuthContext } from "@/context/AuthContext";
import { deleteData } from "@/firebase/firestore/deleteDoc";
import { useModal } from "@/context/ModalContext";
import AudioModal from "@/app/components/AudioModal";
import Image from "next/image";
import "@/app/globals.css";
import { deleteImageFromFirebase } from "@/firebase/firestore/deleteImageFromFirebase";
import { useBook } from "@/context/updateContext";
import { useRouter } from "next/navigation";
import fetchBooks from "@/firebase/firestore/fetchBooks";

const BookCard = ({ book, onModalOpen, onModalClose, onMouseLeave }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { showModal } = useModal();
  const isAdmin = user ? user.isAdmin : false;
  const filteredLinks = book?.links
    ? book.links.filter(
        (link) => !["amazon", "euro", "asian", "other"].includes(link.type)
      )
    : [];
  const buyLinks = book?.links
    ? book.links.filter((link) =>
        ["amazon", "euro", "asian", "other"].includes(link.type)
      )
    : [];
  const lockedLinks = filteredLinks.filter((link) => link.locked);
  const unlockedLinks = filteredLinks.filter((link) => !link.locked);
  const { darkMode } = useDarkMode();

  const [showBookModal, setShowBookModal] = useState(false);
  const [showAudioListModal, setShowAudioListModal] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);

  // const [imageLoading, setImageLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState("");

  const { setBookUpdateInfo } = useBook();

  const handleCloseModal = () => {
    setShowBookModal(false);
    if (onModalClose) onModalClose();
    if (onMouseLeave) onMouseLeave();
  };
  const handleShowModal = () => {
    setShowBookModal(true);
    if (onModalOpen) onModalOpen();
  };

  const hasAmazonLink = buyLinks.some((link) => link.type.includes("amazon"));
  const hasAsianLink = buyLinks.some((link) => link.type.includes("asian"));
  const hasEuroLink = buyLinks.some((link) => link.type.includes("euro"));
  const hasOtherLink = buyLinks.some((link) => link.type.includes("other"));

  const audioFileUrls = book?.audioFileUrls || [];
  const sortedAudioFileUrls = audioFileUrls.sort((a, b) =>
    a.downloadURL.localeCompare(b.downloadURL)
  );

  const loadingImage = darkMode
    ? "/images/perceptia_logo_negative.jpg"
    : "/images/perceptia_logo.jpg";

  const handleDeleteClick = async () => {
    const imageUrl = book.imageUrl;
    await handleDelete(book.id, imageUrl);
  };

  const handleDelete = async (bookId, imageUrl) => {
    console.log("in handle delete click>>>", imageUrl);
    try {
      await deleteImageFromFirebase(imageUrl);
      const { success, error } = await deleteData("books", bookId);
      if (error) {
        console.error("Error deleting document:", error);
        showModal("Sorry it's gone wrong", `this happened: ${error}`);
      } else {
        await fetchBooks();
        showModal("Book deleted", "All done");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateClick = () => {
    console.log("update time");
    setBookUpdateInfo(book);
    router.push("/Admin");
  };

  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  const handleAudioClick = () => {
    setShowAudioListModal(true);
  };

  const handleShowAudioModal = (audio) => {
    setShowAudioModal(true);
    setCurrentAudioUrl(audio);
  };

  return (
    <>
      <div className={classes.bookcard} onClick={handleShowModal}>
        <Image
          className={`classes.loadingImage ${
            imageLoaded ? classes.hidden : ""
          }`}
          src={loadingImage}
          alt="Loading..."
          fill
          sizes="20vw"
        />
        <Image
          className={`${classes.image}  ${imageLoaded ? classes.loaded : ""}`}
          src={book?.imageUrl}
          alt={book?.title}
          width={0}
          height={0}
          style={{ width: "90px", height: "auto" }}
          onLoad={() => setImageLoaded(true)}
          unoptimized={true}
        />
      </div>

      <Modal
        show={showBookModal}
        onHide={handleCloseModal}
        size="lg"
        animation="slide-up"
      >
        <Modal.Header closeButton>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="text-start">
              {isAdmin && (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    className="me-2 mb-2"
                    onClick={handleDeleteClick}
                    style={{ fontSize: "10px", padding: "5px 10px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mb-2"
                    onClick={handleUpdateClick}
                    style={{ fontSize: "10px", padding: "5px 10px" }}
                  >
                    Update
                  </Button>
                </>
              )}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ minWidth: 70, height: 95, position: "relative" }}>
                  <Image
                    src={book?.imageUrl}
                    alt={book?.title}
                    fill={true}
                    object-fit="contain"
                    className="img-fluid"
                    unoptimized
                  />
                </div>
                <div
                  style={{
                    marginLeft: 20,
                    marginTop: 0,
                  }}
                >
                  <Modal.Title>
                    <p className={classes.modalTitle}>{book?.title}</p>
                  </Modal.Title>
                  {book?.subTitle && (
                    <p className={classes.modalSubTitle}>{book?.subTitle}</p>
                  )}
                  {book?.author && (
                    <p className={classes.modalBookDetails}>{book?.author}</p>
                  )}
                  {book?.bookDetails && (
                    <p className={classes.modalBookDetails}>
                      {book?.bookDetails}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body
          style={{
            padding: "1rem 2rem",
            backgroundColor: darkMode ? "black" : "white",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          <div>
            {hasAmazonLink && (
              <Button
                variant="outline-success"
                className={classes.linkButton}
                onClick={() =>
                  handleLinkClick(
                    buyLinks.find((link) => link.type.includes("amazon")).link
                  )
                }
              >
                Buy at Amazon
              </Button>
            )}
            {hasAsianLink && (
              <Button
                variant="outline-success"
                className={classes.linkButton}
                onClick={() =>
                  handleLinkClick(
                    buyLinks.find((link) => link.type.includes("asian")).link
                  )
                }
              >
                Buy at Englishbooks.jp
              </Button>
            )}
            {hasEuroLink && (
              <Button
                variant="outline-success"
                className={classes.linkButton}
                onClick={() =>
                  handleLinkClick(
                    buyLinks.find((link) => link.type.includes("euro")).link
                  )
                }
              >
                Buy at BEBC.co.uk
              </Button>
            )}
            {hasOtherLink && (
              <Button
                variant="outline-success"
                className={classes.linkButton}
                onClick={() =>
                  handleLinkClick(
                    buyLinks.find((link) => link.type.includes("other")).link
                  )
                }
              >
                Distributer
              </Button>
            )}
          </div>

          <hr style={{ margin: "0.5rem" }} />

          <div className="d-flex justify-content-between w-100 align-items-center">
            {(unlockedLinks.length > 0 || audioFileUrls.length > 0) &&
              audioFileUrls.length > 0 && (
                <div className={classes.linksContainer}>
                  <Button
                    variant="outline-primary"
                    className={classes.linkButton}
                    onClick={handleAudioClick}
                  >
                    Audio
                  </Button>
                  {unlockedLinks.map((link, index) => (
                    <Button
                      key={index}
                      variant="outline-primary"
                      className={classes.linkButton}
                      onClick={() => window.open(link.link, "_blank")}
                    >
                      {link.type}
                    </Button>
                  ))}
                </div>
              )}
            {user && user.user !== null && lockedLinks.length > 0 && (
              <div className={classes.linksContainer}>
                {lockedLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline-warning"
                    className={classes.linkButton}
                    onClick={() => window.open(link.link, "_blank")}
                  >
                    {link.type}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {(unlockedLinks.length > 0 ||
            lockedLinks.length > 0 ||
            audioFileUrls.length > 0) && <hr style={{ margin: "0.5rem" }} />}

          <div
            className={classes.bookContent}
            dangerouslySetInnerHTML={{ __html: book?.description }}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showAudioListModal}
        onHide={() => setShowAudioListModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{book?.title} Audio</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: darkMode ? "black" : "white",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Image
              src={book?.imageUrl}
              alt={book?.title}
              width={100}
              height={125}
              object-fit="contain"
              className="img-fluid"
              unoptimized
            />
          </div>
          <p style={{ textAlign: "center", margin: "1rem" }}>Click to play</p>
          <ListGroup>
            {sortedAudioFileUrls.map((audio, index) => (
              <ListGroupItem
                key={index}
                action
                onClick={() => handleShowAudioModal(audio)}
              >
                {audio.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      <AudioModal
        show={showAudioModal}
        handleClose={() => {
          setShowAudioModal(false);
        }}
        audio={currentAudioUrl}
        bookTitle={book?.title}
        bookImage={book?.imageUrl}
      />
    </>
  );
};

export default BookCard;
