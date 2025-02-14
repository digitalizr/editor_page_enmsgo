import React from "react";
import styles from "./containerBox.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const ContainerBox = ({
  blog,
  headingClr = "#FFFFFF",
  subHeadingClr = "#FFFFFF",
  descClr = "#FFFFFF",
}) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/singleblog?id=${blog.id}`);
  };

  const handleShare = () => {
    const blogUrl = `${window.location.origin}/singleblog?id=${blog.id}`;
    const shareText = `${blog?.title}\n\n${blog?.subTitle}\n\n${blog?.desc.slice(0, 100)}...`;
  
    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: shareText,
          url: blogUrl,
        })
        .catch((error) => console.error("Sharing failed", error));
    } else {
      const encodedTitle = encodeURIComponent(blog?.title);
      const encodedDescription = encodeURIComponent(blog?.desc.slice(0, 150));
      const encodedUrl = encodeURIComponent(blogUrl);
      const encodedImage = encodeURIComponent(blog?.img);
  
      // Social Media Share URLs
      const shareOptions = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle} - ${encodedUrl}`,
      };
  
      // Open the default share option (LinkedIn as fallback)
      window.open(shareOptions.linkedin, "_blank");
    }
  };
  

  return (
    <div className={styles.cBCon}>
      <img src={blog?.img} alt="img" className={styles.cBImg} />
      <h3 style={{ color: headingClr }}> {blog?.title} </h3>
      <h3 style={{ color: subHeadingClr }}> {blog?.subTitle} </h3>
      <p
        style={{ color: descClr }}
        dangerouslySetInnerHTML={{ __html: blog?.desc.slice(0, 90) + " ..." }}
      ></p>
      <div className={styles.btnWrapper}>
        <Button
          title="Share"
          btnStyles={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            color: "#65558F",
            border: "1px solid #79747E",
            outline: "none",
            borderRadius: "25px",
            margin: "0 10px",
          }}
          handleClick={handleShare}
        />
        <Button
          title="Read"
          btnStyles={{
            padding: "10px 20px",
            backgroundColor: "#65558F",
            color: "#FFFFFF",
            border: "none",
            outline: "none",
            borderRadius: "25px",
          }}
          handleClick={handleReadMore}
        />
      </div>
    </div>
  );
};

export default ContainerBox;
