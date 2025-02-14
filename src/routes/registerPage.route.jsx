import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/register.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { doCreateUserWithEmailAndPassword } from "../config/auth";
import { Spinner } from "react-activity";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await doCreateUserWithEmailAndPassword(email, password);
      toast.success("User Created Successfully, Please login");
      setLoading(false);
    } catch (error) {
      toast.error("Somethingw went wrong : ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authcontainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputcontainer}>
          <label htmlFor="username">Email : </label>
          <input
            type="email"
            name="email"
            placeholder="something@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
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
          {loading ? <Spinner /> : "Sign Up"}
        </button>
        <p className={styles.authredirect}>
          Already have an account?
          <Link
            to={"/login"}
            style={{
              color: "#1E40AF",
              textDecoration: "underline",
              padding: "0 10px",
            }}
          >
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
