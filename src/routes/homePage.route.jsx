import React from "react";
import Editor from "../routes/editorPage.route";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import {  clearAuth } from "../redux/features/authSlice";
import Cookies from "js-cookie";


const HomePage = () => {
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

  return (
    <div>
      <br />
      <br />
      <button onClick={handleLogout}>logout</button>
      <br />
      <br />
      {user?.email || "user logout"}
      <Editor />
    </div>
  );
};

export default HomePage;
