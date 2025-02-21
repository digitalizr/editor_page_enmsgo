import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/blog.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import Heading from "../components/common/introHeading/Heading";
import CardComp from "../components/cardComp/CardComp";

const BlogPage = () => {
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ id: doc.id, ...doc.data() });
      });
      setBlogList(tempData);
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
      <Heading heading={"Write your Blogs"} id="blogs" />

      <div className={styles.blogContainer}>
        <h2>Blogs.</h2>
        <div className={styles.containerWrapper}>
          {blogList.length > 0 ? (
            blogList.map((blog) => {
              return <CardComp data={blog} collection={"blogs"} key={blog?.id} />
            })
          ) : (
            <h3 style={{ color: "white" }}>
              Write a Perfect Story...{" "}
              <Link
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  padding: "0 10px",
                }}
                to={"/write?collection=blogs"}
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

export default BlogPage;
