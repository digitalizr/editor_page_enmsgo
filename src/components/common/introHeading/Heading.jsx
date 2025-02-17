import React from "react";
import styles from "./heading.module.css";
import { Link } from "react-router-dom";

const Heading = ({ heading, id }) => {
  return (
    <div className={styles.intro}>
      <h1>{heading}</h1>
      {id && (
        <Link to={`/write?collection=${id}`} className={styles.introbtn}>
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
      )}
    </div>
  );
};

export default Heading;
