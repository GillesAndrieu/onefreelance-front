import {createBrowserRouter} from "react-router-dom";

import App from "../App";
import Home from "../pages/home/home";
import Login from "../pages/auth/login";
import {ProtectedRoute} from "./ProtectedRoute.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <ProtectedRoute><Home /></ProtectedRoute> },
            { path: "login", element: <Login /> }
        ]
    }]
);