import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import classes from './Library.module.css';
import AddResources from '../components/AddResources';
import { getAndModifyDoc } from '../../firebase/firestore/getAndModifyDoc';
import { useAuthContext } from "@/context/AuthContext";
import { deleteData } from '../../firebase/firestore/deleteDoc';

const BookCard = ({ book }) => {
  const user = useAuthContext();
  const filteredLinks = book.links ? book.links.filter(link => link.type !== 'order') : [];
  const lockedLinks = filteredLinks.filter(link => link.locked);
  const unlockedLinks = filteredLinks.filter(link => !link.locked);

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

  const handleDelete = async (bookId) => {
    try {
      const { success, error } = await deleteData('books', bookId);
      if (error) {
        console.error('Error deleting document:', error);
      } else {
        console.log('Document deleted successfully');
        handleCloseModal();// Handle any necessary UI updates after deletion
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteClick = () => {
    handleDelete(book.id); // Pass book.id to handleDelete
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

  const cardStyle = {
    backgroundImage: `url(${book.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px', // Set a suitable height for the card
    position: 'relative',
  };

  return (
    <>
      <Card className={`${classes.bookcard} bg-dark text-white position-relative`} style={cardStyle}>
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
          {user.user !== null && (
              <>
                <Button variant="danger" size="sm" className="me-2 mb-2" onClick={handleDeleteClick}>
                  Delete
                </Button>
                <Button variant="danger" size="sm" className="mb-2" onClick={handleUpdateClick}>
                  Update
                </Button>
              </>
            )}
          <span className={classes.genres}>
            {book.genres ? (
                book.genres.map(item => <p key={item}>{item}</p>)
              ) : (<p>No genres available</p>)
            }
          </span>
            <Modal.Title style={{ flex: '1' }}>{book.title}</Modal.Title>
            {book.author && <p className={classes.author}>{book.author}</p>}
            {book.bookDetails && <p className={classes.details}>{book.bookDetails}</p>}
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
        <div className="d-flex justify-content-between w-100 align-items-center">
          {unlockedLinks.length > 0 && (
              <div className={classes.linksContainer}>
                {unlockedLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline-primary"
                    className={classes.linkButton}
                    onClick={() => window.open(link.link, '_blank')}
                  >
                    {link.type}
                  </Button>
                ))}
              </div>
            )
          }
          {user.user !== null && lockedLinks.length > 0 && (
              <div className={classes.linksContainer}>
                {lockedLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline-warning"
                    className={classes.linkButton}
                    onClick={() => window.open(link.link, '_blank')}
                  >
                    {link.type}
                  </Button>
                ))}
              </div>
            )
          }
        </div>
       
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
