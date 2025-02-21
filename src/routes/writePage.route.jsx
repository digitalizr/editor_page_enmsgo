import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { toast } from "react-toastify";
import { uploadFile } from "../config/awsConfig";
import styles from "../styles/write.module.css";

const WritePage = () => {
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const collectionName = searchParams.get("collection");

  useEffect(() => {
    if (img)
      setValue(
        (prev) => prev + `<p><img src="${img}" alt="Uploaded Image"/></p>`
      );
  }, [img]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target);
      const title = formData.get("title")?.trim();
      const subTitle = formData.get("subTitle")?.trim();
      const desc = value?.trim();

      if (!title || !subTitle || !desc) {
        toast.error("Please fill all the details");
        setLoading(false);
        return;
      }
      if (!collectionName) {
        toast.error("Collection name is missing in the URL");
        setLoading(false);
        return;
      }

      const docRef = await addDoc(collection(db, collectionName), {
        title,
        img: cover || "",
        subTitle,
        desc,
      });

      setLoading(false);
      toast.success(`${collectionName} Created Successfully`);
      navigate(`/singleblog?id=${docRef?.id}&collection=${collectionName}`);
    } catch (error) {
      console.error("Error adding document:", error);
      toast.error("Error adding document");
      setLoading(false);
    }
  };


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please Choose an Image")
      return;
    }
    const data = await uploadFile(file);
    setCover(data);
  };

  const handleContentImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please Choose an Image")
      return;
    }
    const data = await uploadFile(file);
    setImg(data);
  };

  return (
    <div className={styles.writecontainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
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
                className={styles.uploadpreview}
                src={cover}
                alt="Cover"
                style={{
                  // width: "100px",
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
          className={styles.input}
          type="text"
          placeholder="Blog Title"
          name="title"
          readOnly={loading}
        />
        <textarea
          className={styles.textarea}
          name="subTitle"
          placeholder="A Short Description"
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
          theme="snow"
          className={styles.reactquill}
          value={value}
          onChange={setValue}
          readOnly={loading}
        />
        <button type="submit" className={styles.submitbtn} disabled={loading}>
          {loading ? <Spinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default WritePage;
