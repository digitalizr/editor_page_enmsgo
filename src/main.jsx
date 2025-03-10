import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import HomePage from "./routes/homePage.route.jsx";
import LoginPage from "./routes/loginPage.route.jsx";
import RegisterPage from "./routes/registerPage.route.jsx";
import BlogPage from "./routes/blogPage.route.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import WritePage from "./routes/writePage.route.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SingleBlogPost from "./routes/singleBlogPage.route.jsx";
import UseCase from "./routes/useCasePage.route.jsx";
import EnergyManagement from "./routes/energyManagement.route.jsx";
import ThemeProvider from "./context/ThemeContext";
import ValidateRoute from "./components/ValidateRoute";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/blogs",
        element: <BlogPage />,
      },
      {
        path: "/use-cases",
        element: <UseCase />,
      },
      {
        path: "/energy-management",
        element: <EnergyManagement />,
      },
      {
        path: "/write",
        element: (
          <ProtectedRoute>
            <WritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/singleblog",
        element: <SingleBlogPost />,
      },
      {
        path: "/login",
        element: (
          <ValidateRoute>
            <LoginPage />
          </ValidateRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ValidateRoute>
            <RegisterPage />
          </ValidateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </ThemeProvider>
    </Provider>
    ,
  </StrictMode>
);

// Clear auth cookie
// Cookies.remove("authToken");
// dispatch(clearAuth());
