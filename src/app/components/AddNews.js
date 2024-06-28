import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addData, manualRefresh } from "../../firebase/firestore/addData";
import { Editor } from "@tinymce/tinymce-react";
import { useModal } from "@/context/ModalContext";

const AddNews = ({ news, handleUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { showModal } = useModal();

  const isUpdate = news ? true : false;

  const initialNewsData = news
    ? {
        title: news.title || "title",
        description: news.description || "description",
      }
    : {
        title: "",
        description: "",
      };

  const [newsData, setNewsData] = useState(initialNewsData);

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
      // Upload the image to Firebase Storage

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
          <h1 className="edit-title">Enter news item</h1>
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
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              textareaName="textarea"
              name="description"
              value={newsData.description}
              init={{
                height: 500,
                plugins: ["link", "lists", "table", "code"],
                toolbar:
                  "undo redo | fontfamily fontselect fontsizeinput forecolor backcolor | " +
                  "lineheight bold italic underline | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | link | paste image code |" +
                  "table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                font_family_formats:
                  "Noto Sans=noto sans,sans-serif; Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",

                content_style: `
              @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
              body { font-family: 'Noto Sans', sans-serif; font-size: 12px; }`,

                default_link_target: "_blank",
              }}
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
