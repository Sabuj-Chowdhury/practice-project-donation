import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import ErrorPage from "../page/ErrorPage";
import Home from "../page/Home";
import Registration from "../authentications/Registration";
import Login from "../authentications/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
]);

export default router;
