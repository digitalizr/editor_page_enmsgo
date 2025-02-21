import { useContext, createContext, useState } from "react";
export const ThemeContext = createContext();

// const themeColors = {
//   emeraldTheme: {
//     background: "#022c22",
//     heading: "#064e3b",
//     text: "#065f46",
//     description: "#047857",
//     button: "#059669",
//     buttonHover: "#10b981",
//     border: "#34d399",
//     cardBackground: "#6ee7b7",
//     highlight: "#a7f3d0",
//     lightBackground: "#d1fae5",
//     softBackground: "#ecfdf5",
//   },
//   limeTheme: {
//     background: "#1a2e05",
//     heading: "#365314",
//     text: "#3f6212",
//     description: "#4d7c0f",
//     button: "#65a30d",
//     buttonHover: "#84cc16",
//     border: "#a3e635",
//     cardBackground: "#bef264",
//     highlight: "#d9f99d",
//     lightBackground: "#ecfccb",
//     softBackground: "#f7fee7",
//   },
//     lightTheme :{
//     background: "#ffffff",
//     heading: "#1f2937",
//     text: "#374151",
//     description: "#4b5563",
//     button: "#3b82f6",
//     buttonHover: "#2563eb",
//     border: "#e5e7eb",
//     cardBackground: "#f3f4f6",
//     highlight: "#d1d5db",
//     lightBackground: "#f9fafb",
//     softBackground: "#ffffff",
//   }

// };
export const themeColors = {
  darkTheme: {
    background: "#0f172a",
    heading: "#e5e7eb",
    text: "#d1d5db",
    desc: "#9ca3af",
    button: "#1f2937",
    buttonBackground: "#374151",
    border: "#4b5563",
    lightBackground: "#111827",
  },
  lightTheme: {
    background: "#f8fafc",
    heading: "#1e293b",
    text: "#334155",
    description: "#475569",
    button: "#2563eb",
    buttonBackground: "#3b82f6",
    border: "#cbd5e1",
    lightBackground: "rgba(254,254,254,0.2)",
  },
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeColors.darkTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
//The custom hook
export const useTheme = () => {
  const val = useContext(ThemeContext);
  if (val === undefined) throw new Error("Context is undefined");
  return val;
};

export default ThemeProvider;
