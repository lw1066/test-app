import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addData } from "../../firebase/firestore/addData";
import { uploadImageToFirebase } from "../../firebase/firestore/storage";
import { Editor } from "@tinymce/tinymce-react";
import { useModal } from "@/context/ModalContext";

const AddResources = ({ book, handleUpdate }) => {
  const editorRef = useRef(null);
  const { showModal } = useModal();

  const isUpdate = book ? true : false;

  const initialFormData = book
    ? {
        title: book.title || "title",
        description: book.description || "description",
        author: book.author || "author",
        bookDetails: book.bookDetails || "details",
        genres: book.genres || "",
        imageFile: null,
        imageUrl: book.imageUrl || "",
        links: book.links || "",
      }
    : {
        title: "",
        description: "",
        author: "",
        bookDetails: "",
        genres: [],
        imageFile: null,
        imageUrl: "",
        links: [{ type: "", link: "", locked: false }],
      };

  const [formData, setFormData] = React.useState(initialFormData);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      imageFile: file,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, description: content });
  };

  const handleLinkChange = (index, event) => {
    const { name, value } = event.target;
    const updatedLinks = [...formData.links];
    updatedLinks[index][name] = value;
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleLockedChange = (index) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index].locked = !updatedLinks[index].locked;
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleAddLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { type: "", link: "", locked: false }],
    });
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...formData.links];
    updatedLinks.splice(index, 1);
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Upload the image to Firebase Storage
      if (formData.imageFile) {
        const imageUrl = await uploadImageToFirebase(formData.imageFile); // Function to upload image

        const formDataWithoutImageFile = { ...formData, imageUrl };
        delete formDataWithoutImageFile.imageFile; // Remove the imageFile property

        const { result, error } = await addData(
          "books",
          formDataWithoutImageFile
        );

        if (error) {
          console.error("Error adding document:", error);
          showModal(`So sorry - there's an error!`, `${error}`);
        } else {
          console.log("Document added with ID:", result);
          showModal(`Book added!`, `All done`);
          setFormData({
            title: "",
            description: "Add description here",
            author: "",
            bookDetails: "",
            genres: [],
            imageFile: null,
            imageUrl: "",
            links: [{ type: "", link: "", locked: false }],
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGenreChange = (event) => {
    const { value } = event.target;
    const selectedGenres = [...formData.genres]; // Copy current genres array

    if (selectedGenres.includes(value)) {
      // If genre already exists, remove it
      const index = selectedGenres.indexOf(value);
      selectedGenres.splice(index, 1);
    } else {
      // If genre does not exist, add it
      selectedGenres.push(value);
    }

    setFormData({ ...formData, genres: selectedGenres });
  };

  const handleInputUpdateChange = () => {
    handleUpdate(formData);
  };

  return (
    <>
      <main>
        <Container>
          <h1 className="edit-title">Enter new book</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Control
                type="text"
                name="title"
                placeholder="Title of item"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="author" className="mb-3">
              <Form.Control
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleInputChange} // Use the same function for all inputs
              />
            </Form.Group>

            <Form.Group controlId="bookDetails" className="mb-3">
              <Form.Control
                type="text"
                name="bookDetails"
                placeholder="Book Details"
                value={formData.bookDetails}
                onChange={handleInputChange} // Use the same function for all inputs
              />
            </Form.Group>

            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              textareaName="textarea"
              name="description"
              value={formData.description}
              init={{
                height: 500,
                menubar: "insert | edit",
                plugins: ["link"],
                toolbar:
                  "undo redo | fontfamily fontsizeinput forecolor backcolor | " +
                  "lineheight bold italic underline | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | link | paste",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                default_link_target: "_blank",
              }}
              onEditorChange={handleEditorChange}
            />

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Choose the image file</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group controlId="genres" className="mb-3">
              <Form.Label>Choose the genres</Form.Label>
              {[
                "Reading",
                "Listening",
                "Speaking",
                "Writing",
                "Culture",
                "Medical",
              ].map((genre) => (
                <Form.Check
                  key={genre}
                  type="checkbox"
                  label={genre}
                  value={genre}
                  checked={formData.genres.includes(genre)}
                  onChange={handleGenreChange}
                />
              ))}
            </Form.Group>

            <Form.Group controlId="links" className="mb-3">
              <Form.Label>Links</Form.Label>
              {formData.links.map((link, index) => (
                <div key={index}>
                  <Form.Control
                    type="text"
                    placeholder="Type"
                    name="type"
                    value={link.type}
                    onChange={(e) => handleLinkChange(index, e)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Link"
                    name="link"
                    value={link.link}
                    onChange={(e) => handleLinkChange(index, e)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Locked"
                    checked={link.locked}
                    onChange={() => handleLockedChange(index)}
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveLink(index)}
                    className="mt-3 mb-3"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="secondary" onClick={handleAddLink}>
                Add Link
              </Button>
            </Form.Group>

            {!isUpdate && (
              <Button variant="primary" type="submit" className="me-3">
                Save
              </Button>
            )}
            {isUpdate && (
              <Button variant="primary" onClick={handleInputUpdateChange}>
                Update
              </Button>
            )}
          </Form>
        </Container>
      </main>
    </>
  );
};

export default AddResources;
