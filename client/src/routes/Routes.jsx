import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import ErrorPage from "../page/ErrorPage";
import Home from "../page/Home";
import Registration from "../authentications/Registration";
import Login from "../authentications/Login";
import AvailableDonations from "../page/AvailableDonations";
import PrivateRoute from "./PrivateRoute";
import AddDonations from "../page/AddDonations";
import MyDonations from "../page/MyDonations";
import ReceivedDonations from "../page/ReceivedDonations";

import DonationDetail from "../page/DonationDetail";

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
      {
        path: "/available-donation",
        element: <AvailableDonations></AvailableDonations>,
      },
      {
        path: "/donate",
        element: (
          <PrivateRoute>
            <AddDonations></AddDonations>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-donations",
        element: (
          <PrivateRoute>
            <MyDonations></MyDonations>
          </PrivateRoute>
        ),
      },
      {
        path: "/donation-detail/:id",
        element: (
          <PrivateRoute>
            <DonationDetail></DonationDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "/received-donations",
        element: (
          <PrivateRoute>
            <ReceivedDonations></ReceivedDonations>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
