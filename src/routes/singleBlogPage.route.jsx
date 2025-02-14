import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import styles from "../styles/singleBlogPost.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { toast } from "react-toastify";
import { uploadFile } from "../config/awsConfig";

const SingleBlogPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const blogId = searchParams.get("id");
  const [blog, setBlog] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(false);
  const [contentImg, setContentImg] = useState("");

  useEffect(() => {
    getBlog();
  }, []);

  useEffect(() => {
    if (contentImg)
      setDesc(
        (prev) =>
          prev + `<p><img src="${contentImg}" alt="Uploaded Image"/></p>`
      );
  }, [contentImg]);

  const getBlog = async () => {
    setLoadingBlog(true);
    try {
      if (!blogId) return;
      const docRef = doc(db, "blogs", blogId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data());
        setTitle(docSnap.data().title);
        setSubTitle(docSnap.data().subTitle);
        setDesc(docSnap.data().desc);
        setCover(docSnap.data().img);
        setLoadingBlog(false);
      } else {
        console.log("No such document!");
        toast.error("No such document found...");
        setLoadingBlog(false);
      }
    } catch (error) {
      toast.error("No such document found... : ", error);
      setLoadingBlog(false);
    } finally {
      setLoadingBlog(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "blogs", blogId));
      setLoading(false);
      toast.success("Blog Deleted Successfully...");
      navigate("/blogs");
    } catch (error) {
      toast.error("Something went wrong... : ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      if (!blogId) return;
      const docRef = doc(db, "blogs", blogId);
      await updateDoc(docRef, {
        img: cover || blog?.img,
        title,
        subTitle,
        desc,
      });
      setLoading(false);
      toast.success("Blog Updated Successfully");
      setModalIsOpen(false);
      getBlog();
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong while updating blog... : ", error);
    } finally {
      setLoading(false);
    }
  };



  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please choose an Image...")
      return;
    }
    const data = await uploadFile(file);
    setCover(data?.Location);
  };

  const handleContentImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please choose an Image...")
      return;
    }
    const data = await uploadFile(file);
    setContentImg(data?.Location);
  };

  if (loadingBlog) {
    return (
      <div
        style={{
          width: "100%",
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    blog && (
      <div className={styles.mainContainer}>
        <div className={styles.mainTop}>
          <div>
            <h1>{blog.title}</h1>
            <h2>{blog.subTitle}</h2>
          </div>
          <div>
            <img src={blog.img} alt={blog.title} />
          </div>
        </div>
        <div className={styles.mainBtm}>
          <p dangerouslySetInnerHTML={{ __html: blog.desc }}></p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.editButton}
            onClick={() => setModalIsOpen(true)}
          >
            <FaEdit /> Edit Blog
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            <FaTrash /> Delete Blog
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className={styles.modal}
        >
          <h2 style={{ color: "#FFFFFF" }}>Edit Blog</h2>

          <div className={styles.uploadContainer}>
            <input
              type="file"
              accept="image/*"
              id="cover-upload"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="cover-upload" className={styles.writebtn}>
              {cover ? (
                <img
                  className={styles.uploadPreview}
                  src={cover}
                  alt="Cover"
                  style={{
                    height: "80px",
                    backgroundSize: "cover",
                    borderRadius: "10px",
                  }}
                />
              ) : (
                "Add a cover image"
              )}
            </label>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            style={{ color: "black" }}
            readOnly={loading}
          />
          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="Sub Title"
            style={{ color: "black" }}
            readOnly={loading}
          />
          {/* Image Upload Buttons */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label htmlFor="content-image-upload" style={{ cursor: "pointer" }}>
              🖼️
            </label>
            <input
              type="file"
              accept="image/*"
              id="content-image-upload"
              style={{ display: "none" }}
              onChange={handleContentImageChange}
            />
          </div>
          <ReactQuill
            value={desc}
            onChange={setDesc}
            className={styles.reactquill}
            placeholder="Blog Description..."
            readOnly={loading}
          />
          <button onClick={handleEdit}>
            {loading ? <Spinner /> : "Save Changes"}
          </button>
        </Modal>
      </div>
    )
  );
};

export default SingleBlogPost;
