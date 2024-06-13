import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const showModal = (title, message) => {
    setModalContent({ title, message });
    setShowSuccess(true);
  };

  const hideModal = () => setShowSuccess(false);

  return (
    <ModalContext.Provider
      value={{ showSuccess, showModal, hideModal, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
