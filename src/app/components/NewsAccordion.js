'use client'

import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import getAllDocs from '../../firebase/firestore/getAllDocs';
import classes from './Library.module.css';
import AddNews from './AddNews';
import { deleteData } from '../../firebase/firestore/deleteDoc';
import { useAuthContext } from "@/context/AuthContext";
import { getAndModifyDoc } from '../../firebase/firestore/getAndModifyDoc';
import { manualRefresh } from '../../firebase/firestore/addData';

function NewsAccordion() {
  const { user } = useAuthContext();
  const isAdmin = user? user.isAdmin : false;
  const [newsDataArray, setNewsDataArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Store selected news item

  useEffect(() => {
    const storedNewsData = localStorage.getItem('newsDataArray');
    if (storedNewsData) {
      setNewsDataArray(JSON.parse(storedNewsData));
    } else {
      fetchNewsData();
    }
  }, []);

  const fetchNewsData = async () => {
    try {
      const { results, error } = await getAllDocs('news');
      if (!error) {
        setNewsDataArray(results);
        localStorage.setItem('newsDataArray', JSON.stringify(results));
      } else {
        console.error('Error fetching news data:', error);
      }
    } catch (error) {
      console.error('Error fetching news data:', error);
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
      const { result, error } = await getAndModifyDoc('news', selectedItem.id, updatedFormData);
      if (error) {
        console.error('Error updating document:', error);
      } else {
        console.log('Document updated successfully:', result);
        closeModal();
        manualRefresh(); // Trigger a manual refresh after updating data
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const { success, error } = await deleteData('news', itemId);
      if (error) {
        console.error('Error deleting document:', error);
      } else {
        console.log('Document deleted successfully', itemId);
        manualRefresh();
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteClick = (itemId) => {
    handleDelete(itemId); // Pass book.id to handleDelete
};

  return (
    <div className={classes.accordion}>
      <Accordion>
        {newsDataArray.map((item, index) => (
          <Accordion.Item key={index} eventKey={String(index)}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
              {isAdmin && (
                <>
                <Button variant="primary" onClick={() => openModal(item)} className="me-3">
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDeleteClick(item.id)}>
                 Delete
               </Button>
               </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Modal for editing news */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNews news={selectedItem} handleUpdate={handleUpdate} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NewsAccordion;
