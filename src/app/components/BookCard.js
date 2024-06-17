import { useState } from "react";
import { useDarkMode } from "@/context/DarkModeContext";
import { Card, Button, Modal } from "react-bootstrap";
import classes from "./Library.module.css";
import AddResources from "../components/AddResources";
import { getAndModifyDoc } from "../../firebase/firestore/getAndModifyDoc";
import { useAuthContext } from "@/context/AuthContext";
import { deleteData } from "../../firebase/firestore/deleteDoc";
import Image from "next/legacy/image";
import { useModal } from "@/context/ModalContext";

const BookCard = ({ book }) => {
  const { user } = useAuthContext();
  const { showModal } = useModal();
  const isAdmin = user ? user.isAdmin : false;
  const filteredLinks = book.links
    ? book.links.filter(
        (link) => !["amazon", "euro", "asian", "other"].includes(link.type)
      )
    : [];
  const buyLinks = book.links
    ? book.links.filter((link) =>
        ["amazon", "euro", "asian", "other"].includes(link.type)
      )
    : [];
  const lockedLinks = filteredLinks.filter((link) => link.locked);
  const unlockedLinks = filteredLinks.filter((link) => !link.locked);
  const { darkMode } = useDarkMode();

  const [showBookModal, setShowBookModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleCloseModal = () => setShowBookModal(false);
  const handleShowModal = () => setShowBookModal(true);
  const handleCloseUpdate = () => setShowUpdateModal(false);

  const hasAmazonLink = buyLinks.some((link) => link.type.includes("amazon"));
  const hasAsianLink = buyLinks.some((link) => link.type.includes("asian"));
  const hasEuroLink = buyLinks.some((link) => link.type.includes("euro"));
  const hasOtherLink = buyLinks.some((link) => link.type.includes("other"));

  const loadingImage = darkMode
    ? "/images/perceptia_logo_negative.jpg"
    : "/images/perceptia_logo.jpg";

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
    console.log("update time");
  };

  const handleDelete = async (bookId) => {
    try {
      const { success, error } = await deleteData("books", bookId);
      if (error) {
        console.error("Error deleting document:", error);
        showModal("Sorry it's gone wrong", `this happened: ${error}`);
      } else {
        showModal("Book deleted", "All done");
        handleCloseModal(); // Handle any necessary UI updates after deletion
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteClick = () => {
    handleDelete(book.id); // Pass book.id to handleDelete
  };

  const handleUpdate = async (updatedFormData) => {
    try {
      const { result, error } = await getAndModifyDoc(
        "books",
        book.id,
        updatedFormData
      );
      if (error) {
        console.error("Error updating document:", error);
        showModal("Sorry it's gone wrong", `this happened: ${error}`);
      } else {
        showModal("Book updated", "All done");
        handleCloseUpdate();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <Card
        className={`${classes.bookcard} bg-dark text-white `}
        onClick={handleShowModal}
      >
        {imageLoading && (
          <img
            src={loadingImage}
            alt="Loading..."
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="img-fluid"
          />
        )}
        <img
          src={book.imageUrl}
          alt={book.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: imageLoading ? "none" : "block",
          }}
          className="img-fluid"
          onLoad={handleImageLoad}
        />
      </Card>

      <Modal show={showBookModal} onHide={handleCloseModal} size="lg">
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
                  >
                    Delete
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mb-2"
                    onClick={handleUpdateClick}
                  >
                    Update
                  </Button>
                </>
              )}

              <Modal.Title>{book.title}</Modal.Title>
              {book.author && (
                <p className={classes.bookDetails}>{book.author}</p>
              )}
              {book.bookDetails && (
                <p className={classes.bookDetails}>{book.bookDetails}</p>
              )}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* Conditional rendering of buttons based on link keywords */}
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
                Buy on Amazon
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
                Buy in Asia
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
                Buy in Europe
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

          <hr />

          <div className="d-flex justify-content-between w-100 align-items-center">
            {unlockedLinks.length > 0 && (
              <div className={classes.linksContainer}>
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

          {(unlockedLinks.length > 0 || lockedLinks.length > 0) && <hr />}

          <div dangerouslySetInnerHTML={{ __html: book.description }} />
        </Modal.Body>
      </Modal>

      <Modal show={showUpdateModal} onHide={handleCloseUpdate} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddResources
            book={book} // Pass the book data to AddResources
            handleUpdate={handleUpdate}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookCard;
