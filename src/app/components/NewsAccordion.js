import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classes from "@/app/components/Library.module.css";
import AddNews from "@/app/components/AddNews";
import { deleteData } from "@/firebase/firestore/deleteDoc";
import { useAuthContext } from "@/context/AuthContext";
import { getAndModifyDoc } from "@/firebase/firestore/getAndModifyDoc";
import { manualRefresh } from "@/firebase/firestore/addData";
import { useDarkMode } from "@/context/DarkModeContext";
import { useModal } from "@/context/ModalContext";
import { checkIfDataIsStale } from "@/firebase/firestore/checkIfDataIsStale";
import fetchNewsData from "@/firebase/firestore/fetchNewsData";

function NewsAccordion() {
  const { user } = useAuthContext();
  const isAdmin = user ? user.isAdmin : false;
  const [newsDataArray, setNewsDataArray] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { showModal } = useModal();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        const { results, error } = await fetchNewsData();
        if (!error) {
          setNewsDataArray(results);
        } else {
          console.error("Error fetching news data:", error);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    const storedNewsData = localStorage.getItem("newsDataArray");
    const storedTimestamp = localStorage.getItem("newsDataTimestamp");
    const isDataStale = checkIfDataIsStale(storedTimestamp);

    if (storedNewsData && !isDataStale) {
      console.log("Using cached news data");
      setNewsDataArray(JSON.parse(storedNewsData));
    } else {
      loadNewsData();
    }
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setShowUpdateModal(true);
  };

  const closeModal = () => {
    setShowUpdateModal(false);
  };

  const handleUpdate = async (updatedFormData) => {
    try {
      const { result, error } = await getAndModifyDoc(
        "news",
        selectedItem.id,
        updatedFormData
      );

      if (error) {
        console.error("Error updating document:", error);
        showModal(`So sorry - there's an error!`, `${error}`);
        return;
      }

      showModal(`News updated!`, `All done`);
      closeModal();
      manualRefresh();
    } catch (error) {
      console.error("Unexpected error:", error);
      showModal(`So sorry - there's an error!`, `${error}`);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const { success, error } = await deleteData("news", itemId);
      if (error) {
        console.error("Error deleting document:", error);
        showModal(`So sorry - there's an error!`, `${error}`);
      } else {
        showModal(`News item deleted!`, `All done`);
        manualRefresh();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteClick = (itemId) => {
    handleDelete(itemId);
  };

  return (
    <>
      <div
        className={classes.headerContainer}
        style={{
          backgroundColor: darkMode ? "black" : "gray",
          margin: "0 auto",
        }}
      >
        <h2 className={classes.headerText}>The Latest News</h2>
      </div>
      <div className={classes.newsCarousel}>
        <Carousel data-bs-theme="dark" controls={false} interval={8000}>
          {newsDataArray.map((item, index) => (
            <Carousel.Item
              key={index}
              style={{ minHeight: "400px", minWidth: "250px" }}
            >
              <div>
                <Carousel.Caption
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    color: darkMode ? "white" : "black",
                    fontSize: ".75rem",
                    fontSize: "clamp(.6rem, 1.1vw, 1rem)",
                  }}
                >
                  <h3 className={classes.captionTitle}>{item.title}</h3>
                  <div
                    className={classes.captionDescription}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  {isAdmin && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="primary"
                        onClick={() => openModal(item)}
                        className="me-3"
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Modal for editing news */}
      <Modal show={showUpdateModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNews news={selectedItem} handleUpdate={handleUpdate} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewsAccordion;
