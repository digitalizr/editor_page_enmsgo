import React from "react";
import styles from "./button.module.css";

const Button = ({ title, btnStyles, handleClick }) => {
  return (
    <button className={styles.btn} style={btnStyles} onClick={handleClick}>
      {title}
    </button>
  );
};

export default Button;