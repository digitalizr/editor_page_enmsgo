import React, { useState } from "react";
import styles from "../styles/editor.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { toast } from "react-toastify";
import { uploadFile,deleteFile } from "../config/awsConfig";
import { getKeyFromUrl } from "../helpers/helpers";

const Editor = ({ initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      heroImg: "",
      heading1: "",
      heading2: "",
      desc: "",
      viewHeading1: "",
      viewHeading2: "",
      aiAnalysisImg: "",
      alertsImg: "",
      dashboardImg: "",
      reportGenImg: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [uploadingStates, setUploadingStates] = useState({
    aiAnalysisImg: false,
    alertsImg: false,
    dashboardImg: false,
    reportGenImg: false,
    heroImg: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (event, fieldName) => {
    setUploadingStates((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please Choose an Image");
      setUploadingStates((prevState) => ({
        ...prevState,
        [fieldName]: false,
      }));
      return;
    }

    try {
      const oldImageUrl = formData[fieldName];
      if (oldImageUrl) {
        const oldImageKey = getKeyFromUrl(oldImageUrl);
        if (oldImageKey) {
          await deleteFile(oldImageKey);
        }
      }
      const data = await uploadFile(file);
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: data,
      }));
    } catch (error) {
      toast.error("File upload failed. Please try again.");
    } finally {
      setUploadingStates((prevState) => ({
        ...prevState,
        [fieldName]: false,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData();
  };

  const updateData = async () => {
    setLoading(true);
    try {
      const updatedFields = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value.trim() !== "")
      );
      if (Object.keys(updatedFields).length > 0) {
        await setDoc(doc(db, "data", "qHLA59NCsSaZDlvDnYFT"), updatedFields, {
          merge: true,
        });
        toast.success("Landing Page Updated Successfully");
      }
    } catch (error) {
      console.log("Something went wrong: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <h2 className={styles.heading}>Edit Content</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {["heroImg", "aiAnalysisImg", "alertsImg", "dashboardImg", "reportGenImg"].map(
          (field) => (
            <div key={field} className={styles.uploadContainer}>
              <input
                type="file"
                accept="image/*"
                id={field}
                className={styles.uploadInput}
                onChange={(e) => handleFileChange(e, field)}
              />
              <label htmlFor={field} className={styles.uploadLabel}>
                {uploadingStates[field] ? (
                  <Spinner color="#FFFFFF" size={20} />
                ) : formData[field] ? (
                  "Change Image"
                ) : (
                  `Upload ${field.replace("Img", "").replace(/([A-Z])/g, " $1")}`
                )}
              </label>
              {formData[field] && (
                <img className={styles.uploadPreview} src={formData[field]} alt={field} />
              )}
            </div>
          )
        )}
        <input
          type="text"
          name="heading1"
          value={formData.heading1}
          onChange={handleChange}
          placeholder="Heading 1"
          className={styles.input}
        />
        <input
          type="text"
          name="heading2"
          value={formData.heading2}
          onChange={handleChange}
          placeholder="Heading 2"
          className={styles.input}
        />
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Description"
          className={styles.textarea}
          rows="4"
        />
        <input
          type="text"
          name="viewHeading1"
          value={formData.viewHeading1}
          onChange={handleChange}
          placeholder="View Heading 1"
          className={styles.input}
        />
        <input
          type="text"
          name="viewHeading2"
          value={formData.viewHeading2}
          onChange={handleChange}
          placeholder="View Heading 2"
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <Spinner color="#FFFFFF" size={20} /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Editor;
