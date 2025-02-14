import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/blog.module.css";
import ContainerBox from "../components/common/containerBox/ContainerBox";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

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
      <div className={styles.intro}>
        <h1>Write Your Blog</h1>
        <Link to="/write" className={styles.introbtn}>
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className={styles.svg}
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className={styles.introbtnbtm}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>

      <div className={styles.blogContainer}>
        <h2>Blogs.</h2>
        <div className={styles.containerWrapper}>
          {blogList.length > 0 ? (
            blogList.map((blog) => {
              return <ContainerBox blog={blog} key={blog?.id} />;
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
                to={"/write"}
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
