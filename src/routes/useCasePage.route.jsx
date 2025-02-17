import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/useCase.module.css";
import UseCaseBox from "../components/common/containerBox/UseCaseBox";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import Heading from "../components/common/introHeading/Heading";

const UseCase = () => {
  const [loading, setLoading] = useState(false);
  const [useCaseList, setUseCaseList] = useState([]);

  useEffect(() => {
    getUseCases();
  }, []);

  const getUseCases = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "usecase"));
      const tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ id: doc.id, ...doc.data() });
      });
      setUseCaseList(tempData);
    } catch (error) {
      console.log("Something went wrong:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }}
      >
        <Spinner size={30} color="#FFFFFF" />
      </div>
    );
  }

  return (
    <div>
      <Heading heading={"Write your UseCases"} id={"usecase"} />

      <div className={styles.blogContainer}>
        <h2>Use Cases.</h2>
        <div className={styles.containerWrapper}>
          {useCaseList.length > 0 ? (
            useCaseList.map((useCase) => {
              return <UseCaseBox data={useCase} key={useCase?.id} />;
            })
          ) : (
            <h3 style={{ color: "white" }}>
              Write a Perfect Story...
              <Link
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  padding: "0 10px",
                }}
                to={`/write?collection=usecase`}
              >
                Write Blog
              </Link>
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default UseCase;
