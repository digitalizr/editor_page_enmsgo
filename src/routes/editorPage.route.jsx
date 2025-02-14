import React, { useState } from "react";
import styles from "../styles/editor.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { toast } from "react-toastify";
import { uploadFile } from "../config/awsConfig";

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
    heroImg : false
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file uploads
  const handleFileChange = async (event, fieldName) => {
    setUploadingStates((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please Choose an Image");
      return;
    }
    try {
      const data = await uploadFile(file);
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: data?.Location,
      }));
    } catch (error) {
      console.error("File upload failed: ", error);
      toast.error("File upload failed. Please try again.");
      setUploadingStates((prevState) => ({
        ...prevState,
        [fieldName]: false,
      }));
    } finally {
      setUploadingStates((prevState) => ({
        ...prevState,
        [fieldName]: false,
      }));
    }
  };

  // Handle form submission
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
        console.log("Data updated successfully");
        toast.success("Landing Page Updated Successfully");
      } else {
        console.log("No fields provided for update");
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
        {/* Text Inputs */}
        <div>
          <input
            type="file"
            accept="image/*"
            id="heroImg"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "heroImg")}
          />
          <label htmlFor="heroImg" className={styles.writebtn}>
            {uploadingStates.heroImg ? ( 
              <Spinner color="#FFFFFF" size={20} />
            ) : formData.heroImg ? (
              <img
                className={styles.uploadpreview}
                src={formData.heroImg}
                alt="heroImg"
                style={{ height: "80px", borderRadius: "10px" }}
              />
            ) : (
              "Upload hero Image"
            )}
          </label>
        </div>
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

        {/* Image Upload Inputs */}
        <div>
          <input
            type="file"
            accept="image/*"
            id="ai-analysis-upload"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "aiAnalysisImg")}
          />
          <label htmlFor="ai-analysis-upload" className={styles.writebtn}>
            {uploadingStates.aiAnalysisImg ? ( // Check the loading state
              <Spinner color="#FFFFFF" size={20} />
            ) : formData.aiAnalysisImg ? (
              <img
                className={styles.uploadpreview}
                src={formData.aiAnalysisImg}
                alt="AI Analysis"
                style={{ height: "80px", borderRadius: "10px" }}
              />
            ) : (
              "Upload AI Analysis Image"
            )}
          </label>
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            id="alerts-upload"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "alertsImg")}
          />
          <label htmlFor="alerts-upload" className={styles.writebtn}>
            {uploadingStates.alertsImg ? (
              <Spinner color="#FFFFFF" size={20} />
            ) : formData.alertsImg ? (
              <img
                className={styles.uploadpreview}
                src={formData.alertsImg}
                alt="Alerts"
                style={{ height: "80px", borderRadius: "10px" }}
              />
            ) : (
              "Upload Alerts Image"
            )}
          </label>
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            id="dashboard-upload"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "dashboardImg")}
          />
          <label htmlFor="dashboard-upload" className={styles.writebtn}>
            {uploadingStates.dashboardImg ? (
              <Spinner color="#FFFFFF" size={20} />
            ) : formData.dashboardImg ? (
              <img
                className={styles.uploadpreview}
                src={formData.dashboardImg}
                alt="Dashboard"
                style={{ height: "80px", borderRadius: "10px" }}
              />
            ) : (
              "Upload Dashboard Image"
            )}
          </label>
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            id="report-gen-upload"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "reportGenImg")}
          />
          <label htmlFor="report-gen-upload" className={styles.writebtn}>
            {uploadingStates.reportGenImg ? (
              <Spinner color="#FFFFFF" size={20} />
            ) : formData.reportGenImg ? (
              <img
                className={styles.uploadpreview}
                src={formData.reportGenImg}
                alt="Report Generation"
                style={{ height: "80px", borderRadius: "10px" }}
              />
            ) : (
              "Upload Report Generation Image"
            )}
          </label>
        </div>

        {/* View Headings */}
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

        {/* Submit Button */}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <Spinner color="#FFFFFF" size={20} /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Editor;
