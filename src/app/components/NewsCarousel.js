import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import classes from "@/app/components/Library.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useDarkMode } from "@/context/DarkModeContext";
import { useModal } from "@/context/ModalContext";
import { checkIfDataIsStale } from "@/firebase/firestore/checkIfDataIsStale";
import fetchNewsData from "@/firebase/firestore/fetchNewsData";
import { useBook } from "@/context/updateContext";
import { useRouter } from "next/navigation";
import { deleteNewsItem } from "@/firebase/firestore/newsUtils";

function NewsCarousel() {
  const { user } = useAuthContext();
  const { setNewsUpdateInfo } = useBook();
  const router = useRouter();
  const isAdmin = user ? user.isAdmin : false;
  const [newsDataArray, setNewsDataArray] = useState([]);

  const { showModal } = useModal();
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

    if (storedNewsData && !isDataStale) {
      console.log("Using cached news data");
      setNewsDataArray(JSON.parse(storedNewsData));
    } else {
      loadNewsData();
    }
  }, []);

  const handleUpdateClick = (item) => {
    setNewsUpdateInfo(item);
    router.push("/Admin");
  };

  const handleDeleteClick = (itemId) => {
    deleteNewsItem(itemId, showModal);
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
              style={{ minHeight: "360px", minWidth: "250px" }}
            >
              <div>
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
                        onClick={() => handleUpdateClick(item)}
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
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default NewsCarousel;
