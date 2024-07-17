import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addData, manualRefresh } from "../../firebase/firestore/addData";
import { useModal } from "@/context/ModalContext";
import EditorComponent from "./Editor";
import { updateNewsItem } from "@/firebase/firestore/newsUtils";
import { useBook } from "@/context/updateContext";

const AddNews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { newsUpdateInfo, setNewsUpdateInfo } = useBook();

  const { showModal } = useModal();

  useEffect(() => {
    return () => {
      console.log("cleaning up");
      setNewsUpdateInfo(null);
    };
  }, []);

  const isUpdate = !!newsUpdateInfo;

  const initialNewsData = newsUpdateInfo
    ? {
        title: newsUpdateInfo.title || "title",
        description: newsUpdateInfo.description || "description",
      }
    : {
        title: "",
        description: "",
      };

  const [newsData, setNewsData] = useState(initialNewsData);
  console.log("update news info in addNews @28", newsUpdateInfo);

  const handleUpdate = async (updatedFormData) => {
    await updateNewsItem(newsUpdateInfo.id, updatedFormData, showModal);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewsData({ ...newsData, [name]: value });
  };

  const handleEditorChange = (content, editor) => {
    setNewsData({ ...newsData, description: content });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { result, error } = await addData("news", newsData);

      if (error) {
        console.error("Error adding document:", error);
        showModal(`So sorry - there's an error!`, `${error}`);
        setIsLoading(false);
      } else {
        console.log("Document added with ID:", result);
        showModal(`News item added!`, `All done`);
        setNewsData({
          title: "",
          description: "Add description here",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      showModal(`So sorry - there's an error!`, `${error}`);
      setIsLoading(false);
    }
    manualRefresh();
  };

  const handleInputUpdateChange = async () => {
    setIsLoading(true);
    await handleUpdate(newsData);
    setIsLoading(false);
  };

  return (
    <>
      <main>
        <Container>
          <h1 className="edit-title">
            {isUpdate ? "Update" : "Enter"} news item
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                placeholder="Title of item"
                value={newsData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <EditorComponent
              value={newsData.description}
              onEditorChange={handleEditorChange}
            />
            {!isUpdate && (
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                disabled={isLoading}
              >
                {isLoading ? "Loading" : "Save"}
              </Button>
            )}
            {isUpdate && (
              <Button
                variant="primary"
                onClick={handleInputUpdateChange}
                className="mt-3"
                disabled={isLoading}
              >
                {isLoading ? "Updating" : "Update"}
              </Button>
            )}
          </Form>
        </Container>
      </main>
    </>
  );
};

export default AddNews;
