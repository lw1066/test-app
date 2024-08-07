import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addData } from "@/firebase/firestore/addData";
import { uploadImageToFirebase } from "@/firebase/firestore/uploadImageToFirebase";
import { useModal } from "@/context/ModalContext";
import { deleteImageFromFirebase } from "@/firebase/firestore/deleteImageFromFirebase";
import { uploadAudioToFirebase } from "@/firebase/firestore/uploadAudioToFirebase";
import { deleteAudioFromFirebase } from "@/firebase/firestore/deleteAudioFromFirebase";
import fetchBooks from "@/firebase/firestore/fetchBooks";
import EditorComponent from "./Editor";
import { useBook } from "@/context/updateContext";
import { getAndModifyDoc } from "@/firebase/firestore/getAndModifyDoc";

const AddResources = () => {
  const { showModal } = useModal();
  const { bookUpdateInfo, setBookUpdateInfo } = useBook();
  const [isLoading, setIsLoading] = useState(false);
  const genreList = [
    "Reading",
    "Listening",
    "Speaking",
    "Writing",
    "Vocabulary",
    "Culture",
    "Health",
    "CLIL",
    "ESP",
    "Resources",
  ];

  useEffect(() => {
    return () => {
      console.log("cleaning up");
      setBookUpdateInfo(null);
    };
  }, []);

  const isUpdate = !!bookUpdateInfo;
  console.log("update book info in addresources @22", bookUpdateInfo);

  const initialFormData = bookUpdateInfo
    ? {
        title: bookUpdateInfo.title || "title",
        subTitle: bookUpdateInfo.subTitle || "subtitle",
        description: bookUpdateInfo.description || "description",
        author: bookUpdateInfo.author || "author",
        bookDetails: bookUpdateInfo.bookDetails || "details",
        genres: bookUpdateInfo.genres || [],
        imageFile: null,
        imageUrl: bookUpdateInfo.imageUrl || "",
        audioFiles: null,
        audioFileUrls: bookUpdateInfo.audioFileUrls || [],
        links: bookUpdateInfo.links || [{ type: "", link: "", locked: false }],
      }
    : {
        title: "",
        subTitle: "",
        description: "",
        author: "",
        bookDetails: "",
        genres: [],
        imageFile: null,
        imageUrl: "",
        audioFiles: null,
        audioFileUrls: [],
        links: [{ type: "", link: "", locked: false }],
      };

  const [formData, setFormData] = useState(initialFormData);

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      imageFile: file,
    });
  };

  const handleAudioFileChange = (event) => {
    const files = Array.from(event.target.files);
    const audioFiles = files.filter(
      (file) => file.type === "audio/mpeg" || file.type === "audio/mp3"
    );

    setFormData({
      ...formData,
      audioFiles,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditorChange = (content) => {
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
    setIsLoading(true);

    try {
      if (formData.imageFile) {
        const imageUrl = await uploadImageToFirebase(formData.imageFile);
        formData.imageUrl = imageUrl;
      }

      if (formData.audioFiles) {
        const uploadPromises = formData.audioFiles.map(async (file) => {
          const downloadURL = await uploadAudioToFirebase(file);
          return { name: file.name, downloadURL };
        });

        const uploadResults = await Promise.all(uploadPromises);
        formData.audioFileUrls = uploadResults;
      }

      const formDataWithoutFiles = { ...formData };
      delete formDataWithoutFiles.imageFile;
      delete formDataWithoutFiles.audioFiles;

      const { result, error } = await addData("books", formDataWithoutFiles);

      if (error) {
        console.error("Error adding document:", error);
        showModal("So sorry - there's an error!", `${error}`);
        setIsLoading(false);
      } else {
        console.log("Document added with ID:", result);

        setFormData({
          title: "",
          subTitle: "",
          description: "",
          author: "",
          bookDetails: "",
          genres: [],
          imageFile: null,
          imageUrl: "",
          audioFiles: null,
          audioFileUrls: [],
          links: [{ type: "", link: "", locked: false }],
        });
        await fetchBooks();
        localStorage.setItem("showModalAfterReload", "true");
        localStorage.setItem(
          "modalMessage",
          `Document added with ID: ${result}`
        );
        setIsLoading(false);
        window.location.replace("/");
      }
    } catch (error) {
      console.error("Error:", error);
      showModal("So sorry - there's an error!", `${error}`);
      setIsLoading(false);
    }
  };

  const handleRemoveAllAudioFiles = () => {
    setFormData({
      ...formData,
      audioFiles: ["deleteAll"],
      audioFileUrls: [],
    });
  };

  const handleGenreChange = (event) => {
    const { value } = event.target;
    const selectedGenres = [...formData.genres];

    if (selectedGenres.includes(value)) {
      const index = selectedGenres.indexOf(value);
      selectedGenres.splice(index, 1);
    } else {
      selectedGenres.push(value);
    }

    setFormData({ ...formData, genres: selectedGenres });
  };

  const handleUpdate = async (updatedFormData) => {
    try {
      const { result, error } = await getAndModifyDoc(
        "books",
        bookUpdateInfo.id,
        updatedFormData
      );
      if (error) {
        console.error("Error updating document:", error);
        showModal("Sorry it's gone wrong", `this happened: ${error}`);
      } else {
        await fetchBooks();
        showModal("Book updated", "All done");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputUpdateChange = async () => {
    setIsLoading(true);
    console.log("formData:", formData);
    try {
      let imageUrl = formData.imageUrl;
      let audioFileUrls = formData.audioFileUrls;

      if (formData.imageFile) {
        if (bookUpdateInfo.imageUrl) {
          await deleteImageFromFirebase(bookUpdateInfo.imageUrl);
        }
        imageUrl = await uploadImageToFirebase(formData.imageFile);
      }

      if (formData.audioFiles) {
        if (bookUpdateInfo.audioFileUrls) {
          for (const audioFileUrl of bookUpdateInfo.audioFileUrls) {
            console.log("deleting audio:", audioFileUrl);
            await deleteAudioFromFirebase(audioFileUrl);
          }
        }

        audioFileUrls = null;

        if (formData.audioFiles[0] !== "deleteAll") {
          const uploadPromises = formData.audioFiles.map(async (file) => {
            const downloadURL = await uploadAudioToFirebase(file);
            let name = file.name.substring(0, file.name.lastIndexOf("."));
            name = name.replace(/_/g, " ");
            return { name, downloadURL };
          });

          audioFileUrls = await Promise.all(uploadPromises);
        }
      }

      const updatedData = {
        ...formData,
        imageUrl,
        audioFileUrls,
      };
      delete updatedData.imageFile;
      delete updatedData.audioFiles;

      await handleUpdate(updatedData);
      showModal("Book updated!", "All done");
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating document:", error);
      showModal("So sorry - there's an error!", `${error}`);
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Container>
        <h1 className="edit-title">
          {isUpdate ? "Update Book" : "Enter New Book"}
        </h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="book title" className="mb-3">
            <Form.Control
              type="text"
              name="title"
              placeholder="Title of book"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="book title" className="mb-3">
            <Form.Control
              type="text"
              name="subTitle"
              placeholder="subtitle of book"
              value={formData.subTitle}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="author" className="mb-3">
            <Form.Control
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="bookDetails" className="mb-3">
            <Form.Control
              type="text"
              name="bookDetails"
              placeholder="Book Details"
              value={formData.bookDetails}
              onChange={handleInputChange}
            />
          </Form.Group>

          <EditorComponent
            value={formData.description}
            onEditorChange={handleEditorChange}
          />

          <Form.Group controlId="image" className="mb-3">
            <Form.Label>Choose the image file</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
            />
          </Form.Group>

          <Form.Group controlId="audio" className="mb-3">
            <Form.Label>Choose the audio files</Form.Label>
            <Form.Control
              type="file"
              accept="audio/*"
              multiple
              onChange={handleAudioFileChange}
            />
          </Form.Group>

          {formData.audioFileUrls.length > 0 && isUpdate && (
            <Button
              variant="danger"
              onClick={handleRemoveAllAudioFiles}
              className="mb-3"
            >
              Remove All Audio Files
            </Button>
          )}

          <Form.Group controlId="genres" className="mb-3">
            <Form.Label>Choose the genres</Form.Label>
            {genreList.map((genre) => (
              <Form.Check
                key={genre}
                id={`genre-${genre}`}
                type="checkbox"
                label={genre}
                value={genre}
                checked={formData.genres.includes(genre)}
                onChange={handleGenreChange}
              />
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Links: BUY LINKS = amazon, euro, asian, other
            </Form.Label>
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
            <Button
              variant="primary"
              type="submit"
              className="me-3"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Save"}
            </Button>
          )}
          {isUpdate && (
            <Button
              variant="primary"
              onClick={handleInputUpdateChange}
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Update"}
            </Button>
          )}
        </Form>
      </Container>
    </main>
  );
};

export default AddResources;
