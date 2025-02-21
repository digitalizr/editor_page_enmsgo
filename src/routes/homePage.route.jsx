import React from "react";
import Editor from "../routes/editorPage.route";
import { useTheme } from "../context/ThemeContext";

const HomePage = () => {
  const theme = useTheme()
  return (
    <div style={{
        padding : "50px 0",
    }}>
      <Editor />
    </div>
  );
};

export default HomePage;
