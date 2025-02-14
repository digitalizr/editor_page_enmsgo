import React from "react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import styles from "./footer.module.css";
import { getAuth, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth } from "../../redux/features/authSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate() 
  // redux auth value
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(clearAuth());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlelogin = () =>{
    navigate("/login")
  }

  return (
    <div className={styles.footer}>
      {/* Left side: Logo */}
      <div className={styles.logo}>
        <img
          src="/logo-transparent.png"
          alt="Logo"
          className={styles.logoImg}
        />
      </div>

      {/* Middle: Social Icons */}
      <div className={styles.socialIcons}>
        <a href="mailto:example@example.com" className={styles.iconLink}>
          <FaEnvelope size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/example"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
        >
          <FaLinkedin size={24} />
        </a>
      </div>

      {/* Right side: Logout Button */}
      <div className={styles.logout}>
        <button className={styles.logoutButton} onClick={user ? handleLogout : handlelogin}>
          <FiLogOut size={20} />
          {user ? "Logout" : "Login" }
          <p style={{padding : "0 5px"}}>{user && user?.email}</p>
        </button>
      </div>
    </div>
  );
};

export default Footer;
