import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  doSignInWithGoogle,
  doSignInWithEmail,
  doSignInWithEmailAndPassword,
} from "../config/auth";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/features/authSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   setLoading(true);
    //   const result = await doSignInWithEmail(email);
    //   console.log(result);
    //   console.log("Email sign-in link sent!");
    // } catch (error) {
    //   console.log("Something went wrong:", error);
    // } finally {
    //   setLoading(false);
    // }

    // to signin using email and password
    try {
      setLoading(true);
      const results = await doSignInWithEmailAndPassword(email, password);

      // Store user data in Redux
      dispatch(
        setAuth({
          uid: results?.user.uid,
          email: results?.user.email,
          photoURL:
            results?.user.photoURL ||
            "https://cdn-icons-png.flaticon.com/128/924/924915.png",
        })
      );
      // Save to cookies
      Cookies.set("user", results?.user.uid, { expires: 7 });
    } catch (error) {
      console.log("Something went wrong : ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await doSignInWithGoogle();
      const user = result.user;

      // Store user data in Redux
      dispatch(
        setAuth({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );

      // Save to cookies
      Cookies.set("user", user, { expires: 7 });

      navigate("/");
    } catch (error) {
      console.log("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authcontainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputcontainer}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="John123"
            value={email}
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
              style={{ position: "relative" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password ? (
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
        <button type="submit" className={styles.submitbtn} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <button
          onClick={onGoogleSignIn}
          style={{ margin: "20px 0" }}
          disabled={loading}
        >
          <FaGoogle color="#FFFFFF" size={30} />
        </button>
        <p className={styles.authredirect}>
          Don't have an account?{" "}
          <Link
            to={"/register"}
            style={{ color: "#1E40AF", textDecoration: "underline" }}
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
