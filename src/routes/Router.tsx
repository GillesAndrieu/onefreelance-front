import {createBrowserRouter, RouterProvider} from "react-router-dom";
// Auth
import {useAuth} from "../hooks";
import {ProtectedRoute} from "./ProtectedRoute";
// Layouts
import {AuthLayout} from "../layouts/auth";
// Pages
import {Login} from "../pages/login";
import {NotFound} from "../pages/not-found";
import {Home} from "../pages/home";

export const Routes = () => {
    const { token } = useAuth();

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "*",
            element: <NotFound />,
        }
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "/profile",
                    element: <div>User Profile</div>,
                }
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/login",
            element:
                <AuthLayout>
                    <Login />
                </AuthLayout>,
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};