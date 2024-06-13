"use client";

import React, { useState, useEffect } from "react";

import Carousel from "react-bootstrap/Carousel";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import getAllDocs from "../../firebase/firestore/getAllDocs";
import classes from "./Library.module.css";
import AddNews from "./AddNews";
import { deleteData } from "../../firebase/firestore/deleteDoc";
import { useAuthContext } from "@/context/AuthContext";
import { getAndModifyDoc } from "../../firebase/firestore/getAndModifyDoc";
import { manualRefresh } from "../../firebase/firestore/addData";
import { useDarkMode } from "@/context/DarkModeContext";

function NewsAccordion() {
  const { user } = useAuthContext();
  const isAdmin = user ? user.isAdmin : false;
  const [newsDataArray, setNewsDataArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Store selected news item

  const { darkMode } = useDarkMode();

  useEffect(() => {
    const storedNewsData = localStorage.getItem("newsDataArray");
    if (storedNewsData) {
      setNewsDataArray(JSON.parse(storedNewsData));
    } else {
      fetchNewsData();
    }
  }, []);

  const fetchNewsData = async () => {
    try {
      const { results, error } = await getAllDocs("news");
      if (!error) {
        setNewsDataArray(results);
        localStorage.setItem("newsDataArray", JSON.stringify(results));
      } else {
        console.error("Error fetching news data:", error);
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
      } else {
        console.log("Document updated successfully:", result);
        closeModal();
        manualRefresh(); // Trigger a manual refresh after updating data
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const { success, error } = await deleteData("news", itemId);
      if (error) {
        console.error("Error deleting document:", error);
      } else {
        console.log("Document deleted successfully", itemId);
        manualRefresh();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteClick = (itemId) => {
    handleDelete(itemId); // Pass book.id to handleDelete
  };

  console.log(darkMode);
  return (
    <>
      <div className={classes.accordion}>
        <Carousel data-bs-theme="dark" controls={false} interval={5000}>
          {newsDataArray.map((item, index) => (
            <Carousel.Item key={index} eventKey={String(index)}>
              <div
                className="d-block w-100"
                style={{
                  height: "400px",
                  backgroundColor: darkMode ? "#212529" : "white",
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <div className="text-center">
                  <Carousel.Caption
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      color: darkMode ? "white" : "black",
                    }}
                  >
                    <h3>{item.title}</h3>
                    <div
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
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Modal for editing news */}
      <Modal show={showModal} onHide={closeModal}>
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
