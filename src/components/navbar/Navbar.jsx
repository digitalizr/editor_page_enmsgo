import React, { useState } from "react";
import styles from "./navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CiLogin } from "react-icons/ci";
import { doSignOut } from "../../config/auth";
// pgl wo h jo roz same kaam kre aur kahe nateeja alag ho

function Navbar() {
  const [open, setOpen] = useState(false);
  // redux auth value
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    doSignOut(dispatch);
  };

  return (
    <div className={styles.navbarContainer}>
      {/* Logo */}
      <NavLink to="/" className={styles.logocontainer}>
        <img src="/logo-transparent.png" alt="logo" />
        <span>ENMSgo</span>
      </NavLink>
      {/* MOBILE MENU */}
      <div className={styles.mobilemenu}>
        {/* icon container */}

        {/* Hamburger Menu */}
        <div
          className={styles.iconContainer}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div
            className={`${styles.bar} ${styles.originLeft} ${
              open ? styles.rotate45 : ""
            }`}
          ></div>
          <div
            className={`${styles.bar} ${open ? styles.opacityZero : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${styles.originLeft} ${
              open ? styles.inverseRotate : ""
            }`}
          ></div>
        </div>

        {/* mobile menu */}
        <div
          className={`${styles.mobileLinkList} ${open ? styles.active : ""}`}
        >
          <NavLink
            to="/blogs"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${styles.menuitem} ${isActive ? styles.activeLink : ""}`
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/use-cases"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${styles.menuitem} ${isActive ? styles.activeLink : ""}`
            }
          >
            Use Cases
          </NavLink>
          <NavLink
            to="/energy-management"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${styles.menuitem} ${isActive ? styles.activeLink : ""}`
            }
          >
            Energy Management
          </NavLink>
          <div
            className={styles.mobEndContainer}
            style={
              open ? { flexDirection: "column" } : { flexDirection: "row" }
            }
          >
            <div
              style={
                open ? { flexDirection: "column" } : { flexDirection: "row" }
              }
            ></div>
             {auth && (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <CiLogin /> Logout
            </button>
          )}
            <Link to={"/login"} className={styles.getStarted}>
              <img src={user?.photoURL || "/avatar.png"} alt="userimg" />
              <button>Get Started</button>
            </Link>
          </div>
        </div>
      </div>
      {/* desktop menu */}
      <div className={styles.desktopmenu}>
        <NavLink
          to="/blogs"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `${styles.menuitem} ${isActive ? styles.activeLink : ""}`
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="/use-cases"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `${styles.menuitem} ${isActive ? styles.activeLink : ""}`
          }
        >
          Use Cases
        </NavLink>
        <NavLink
          to="/energy-management"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `${styles.menuitem} ${isActive ? styles.activeLink : ""}`
          }
        >
          Energy Management
        </NavLink>
        <div className={styles.mobEndContainer}>
          {auth && (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <CiLogin /> Logout
            </button>
          )}
          <Link to={"/login"} className={styles.getStarted}>
            <img src={user?.photoURL || "/avatar.png"} alt="userimg" />
            <button>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
