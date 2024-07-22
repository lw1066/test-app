import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { Editor } from "@tinymce/tinymce-react";
import classes from "@/app/components/Library.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useDarkMode } from "@/context/DarkModeContext";
import { useModal } from "@/context/ModalContext";
import { checkIfDataIsStale } from "@/firebase/firestore/checkIfDataIsStale";
import fetchNewsData from "@/firebase/firestore/fetchNewsData";
import { useBook } from "@/context/updateContext";
import { deleteNewsItem, updateNewsItem } from "@/firebase/firestore/newsUtils";
import { useRouter } from "next/navigation";

function NewsCarousel() {
  const { user } = useAuthContext();
  const { setNewsUpdateInfo } = useBook();
  const router = useRouter();
  const isAdmin = user ? user.isAdmin : false;
  const [newsDataArray, setNewsDataArray] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const { showModal, closeModal } = useModal();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const loadNewsData = async () => {
      let attempts = 0;
      let success = false;
      let results = [];
      let error = null;

      while (attempts < 3 && !success) {
        attempts++;
        try {
          const fetchResult = await fetchNewsData();
          if (fetchResult.error) {
            error = fetchResult.error;
          } else {
            results = fetchResult.results;
            success = true;
          }
        } catch (err) {
          error = err;
          console.error(`Attempt ${attempts} failed:`, err);
        }
      }

      if (success) {
        setNewsDataArray(results);
        localStorage.setItem("newsDataArray", JSON.stringify(results));
        localStorage.setItem("newsDataTimestamp", new Date().toISOString());
      } else {
        setError("Sorry, there is a server access problem - try again later");
      }
    };

    const storedNewsData = localStorage.getItem("newsDataArray");
    const storedTimestamp = localStorage.getItem("newsDataTimestamp");
    const isDataStale = checkIfDataIsStale(storedTimestamp);

    if (storedNewsData !== null && storedNewsData !== "" && !isDataStale) {
      console.log("Using cached news data");
      setNewsDataArray(JSON.parse(storedNewsData));
    } else {
      loadNewsData();
    }
  }, []);

  const handleEditClick = (item) => {
    setEditingItem(item.id);
    setEditedContent(item.description);
  };

  const handleSaveClick = async (item) => {
    await updateNewsItem(
      item.id,
      { description: editedContent },
      showModal,
      closeModal
    );
    setEditingItem(null);
  };

  const handleDeleteClick = (itemId) => {
    deleteNewsItem(itemId, showModal);
  };

  const handleUpdateClick = (item) => {
    setNewsUpdateInfo(item);
    router.push("/Admin");
  };

  return (
    <>
      <div
        className={classes.headerContainer}
        style={{
          backgroundColor: darkMode ? "black" : "#ededed",
          margin: "0 auto",
        }}
      >
        <h2 className={classes.headerText}>Perceptia News</h2>
      </div>

      <div className={classes.newsCarousel}>
        <Carousel data-bs-theme="dark" interval={30000}>
          {newsDataArray.map((item, index) => (
            <Carousel.Item
              key={index}
              style={{ minHeight: "200px", minWidth: "250px" }}
            >
              <div>
                <Carousel.Caption
                  style={{
                    height: "100%",
                    color: darkMode ? "white" : "black",
                  }}
                >
                  {editingItem === item.id ? (
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                      initialValue={item.description}
                      init={{
                        inline: true,
                        menubar: false,
                        plugins: [
                          "link",
                          "lists",
                          "table",
                          "autolink",
                          "media",
                        ],
                        toolbar:
                          "undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
                      }}
                      onEditorChange={(content) => setEditedContent(content)}
                    />
                  ) : (
                    <div
                      className={classes.captionDescription}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                  {isAdmin && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      {editingItem === item.id ? (
                        <>
                          <Button
                            variant="success"
                            onClick={() => handleSaveClick(item)}
                            className="me-3"
                          >
                            Save
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setEditingItem(null)}
                            className="me-3"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="primary"
                            onClick={() => handleEditClick(item)}
                            className="me-3"
                          >
                            Edit Here
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleUpdateClick(item)}
                            className="me-3"
                          >
                            Edit There
                          </Button>
                        </>
                      )}
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
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default NewsCarousel;
