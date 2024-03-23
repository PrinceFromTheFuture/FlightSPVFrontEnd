import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/redux/store.ts";
import SingleFlight from "@/pages/singleFlight/SingleFlight.tsx";
import Root from "./Root.tsx";
import { SingleFlightLayout } from "./pages/singleFlight/SingleFlightLayout.tsx";
import Navmenue from "./pages/Navmenue.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <Navmenue>
            <Home />
          </Navmenue>
        ),
      },
      {
        path: "/singleFlight",
        element: <SingleFlightLayout />,
        children: [
          {
            path: "/singleFlight/:flightID",
            element: <SingleFlight />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
