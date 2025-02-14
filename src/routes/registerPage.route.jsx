import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/register.module.css"
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  return (
    <div className={styles.authcontainer}>
      <form onSubmit={()=>{}}>
        <div className={styles.inputcontainer}>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            placeholder="Khizar Ali"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="username">UserName : </label>
          <input
            type="text"
            name="username"
            placeholder="khizi123"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="password">Password : </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              style={{ position: "relative" }}
            />
            {password.length > 0 ? (
              showPassword ? (
                <i
                  className={styles.passicon}
                  onClick={() => setshowPassword(!showPassword)}
                >
                  <FiEyeOff />
                </i>
              ) : (
                <i
                  className={styles.passicon}
                  onClick={() => setshowPassword(!showPassword)}
                >
                  <FiEye />
                </i>
              )
            ) : null}
          </div>
        </div>
        <button type="submit" className={styles.submitbtn}>
          Sign Up
        </button>
        <p className={styles.authredirect}>
          Already have an account?
          <Link
            to={"/login"}
            style={{ color: "#1E40AF", textDecoration: "underline",padding:'0 10px' }}
          >
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
