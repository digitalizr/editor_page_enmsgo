import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import styles from "./mainLayout.module.css";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/features/authSlice";
import Cookies from "js-cookie";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const uid = Cookies.get("user");
    if (uid) {
      const auth = getAuth();

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.uid === uid) {
          dispatch(
            setAuth({
              uid: user.uid,
              email: user.email,
              photoURL:
                user.photoURL ||
                "https://cdn-icons-png.flaticon.com/128/924/924915.png",
            })
          );
        } else {
          Cookies.remove("user");
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [dispatch]);

  return (
    <div className={styles.layoutcontainer}>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
