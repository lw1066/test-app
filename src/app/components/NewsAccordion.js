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
import { useModal } from "@/context/ModalContext";
import Link from "next/link";
import { checkIfDataIsStale } from "@/firebase/firestore/checkIfDataIsStale";
import fetchNewsData from "@/firebase/firestore/fetchNewsData";

function NewsAccordion({ onClick }) {
  const { user } = useAuthContext();
  const isAdmin = user ? user.isAdmin : false;
  const [newsDataArray, setNewsDataArray] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { showModal } = useModal();
  const { darkMode } = useDarkMode();

  useEffect(() => {
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

  const loadNewsData = async () => {
    const { results, error } = await fetchNewsData();
    if (!error) {
      setNewsDataArray(results);
    } else {
      console.error("Error fetching news data:", error);
    }
  };

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
      <h1 style={{ fontSize: 36, textAlign: "center", marginTop: 20 }}>
        Welcome to Perceptia Press!
      </h1>
      <p style={{ textAlign: "center", paddingInline: 10 }}>
        Browse the{" "}
        <a href="#!" onClick={onClick} style={{ textDecoration: "none" }}>
          catalogue
        </a>{" "}
        to explore our titles or go to{" "}
        <Link href="/About" style={{ textDecoration: "none" }}>
          FAQs
        </Link>{" "}
        to learn more about us.
      </p>
      <div className={classes.accordion}>
        <Carousel data-bs-theme="dark" controls={false} interval={5000}>
          {newsDataArray.map((item, index) => (
            <Carousel.Item key={index}>
              <div
                className="d-block w-100"
                style={{
                  height: "450px",
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
