import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/theme-provider";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

import { HomePage } from "./pages/HomePage.tsx";
import { CategoriesPage } from "./pages/CategoriesPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { PinDetail } from "./pages/PinDetail.tsx";
import { SearchPage } from "./pages/SearchPage.tsx";

import store from "./app/store.ts";
import { Provider } from "react-redux";
import { useAppSelector } from "./app/hooks";
import { CreateImagePage } from "./pages/CreateImagePage.tsx";
import "@mantine/dropzone/styles.css";
import { MantineProvider } from "@mantine/core";
import { PinDetailEdit } from "./pages/PinDetailEdit.tsx";
import ProfilePageEdit  from "./pages/ProfilePageEdit.tsx";

const Main = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const router = createBrowserRouter([
    {
      path: "/",
      element: userInfo ? <App /> : <LoginPage />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/category/:name",
          element: <CategoriesPage />,
        },
        {
          path: "/profile/:userId",
          element: <ProfilePage />,
        },{
          path: "/profile/:userId/edit",
          element : <ProfilePageEdit />,
        },
        {
          path: "pin/:pinId",
          element: <PinDetail />,
        },{
          path: "pin/:pinId/edit",
          element : <PinDetailEdit />
        } ,
        {
          path: "search/:searchTerm",
          element: <SearchPage />,
        },
        {
          path: "create",
          element: <CreateImagePage />,
        },
      ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Main;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      <Provider store={store}>
        <HelmetProvider>
          {/* <App /> */}
          <MantineProvider>
            <Main />
          </MantineProvider>
        </HelmetProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
