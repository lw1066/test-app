import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import classes from './Library.module.css';
import AddResources from '../components/AddResources';
import { getAndModifyDoc } from '../../firebase/firestore/getAndModifyDoc';


const BookCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseUpdate = () => setShowUpdateModal(false);
  
  const hasOrderLink = book.links && book.links.some(link => link.type === 'order');
  const buyLink = hasOrderLink ? book.links.find(link => link.type === 'order').link : '';

  
  const handleUpdateClick = () => {
    setShowUpdateModal(true)
    console.log('update time')
  };

  const handleUpdate = async (updatedFormData) => {
    
    console.log(updatedFormData)
    try {
      const { result, error } = await getAndModifyDoc('books', book.id, updatedFormData);
      if (error) {
        console.error('Error updating document:', error);
      } else {
        console.log('Document updated successfully:', result);
        handleCloseUpdate();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      

      <Card className={`${classes.bookcard} bg-dark text-white position-relative`}>
        <Card.Img src={book.imageUrl} alt={book.title} />
        <Card.ImgOverlay className="d-flex flex-column justify-content-end">
          <Button variant="outline-light" size='sm' onClick={handleShowModal} className="align-self-center">
            <span>More Info...</span>
          </Button>
        </Card.ImgOverlay>
      </Card>


      

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton> 
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="text-start">
            <Modal.Title style={{ flex: '1' }}>{book.title}</Modal.Title>
            <Button variant="danger" size="sm" className={classes.updateButton} onClick={handleUpdateClick}>
            U
            </Button>
            {book.author && <p>{book.author}</p>}
            {book.details && <p>{book.details}</p>}
          </div>
          <div>
          {hasOrderLink && (
            <Button variant="outline-success" size='sm' onClick={() => window.open(buyLink, '_blank')}>
              Buy
            </Button>
          )}
          </div>
        </div>
          
        </Modal.Header>
        <Modal.Body>
        <span className={classes.genres}>
        {book.genres ? (
          book.genres.map(item => <p key={item}>{item}</p>)
        ) : (
          <p>No genres available</p>
        )}
        </span>
          <div dangerouslySetInnerHTML={{ __html: book.description }} />
        </Modal.Body>
      </Modal>

      <Modal show={showUpdateModal} onHide={handleCloseUpdate} size='lg'>
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
