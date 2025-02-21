import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Box from '@mui/material/Box';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
// Auth
import {useAuth} from "../hooks";
import {ProtectedRoute} from "./ProtectedRoute";
// Layouts
import {AuthLayout} from "../layouts/auth";
import {DashboardLayout} from '../layouts/dashboard';
// Pages
import {Login} from "../pages/login";
import {NotFound} from "../pages/not-found";
import {Home} from "../pages/home";
import {Suspense} from "react";

export const Routes = () => {
    const { token } = useAuth();

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "*",
            element: <NotFound />,
        }
    ];

    const renderFallback = (
        <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
            <LinearProgress
                sx={{
                    width: 1,
                    maxWidth: 320,
                    bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
                    [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
                }}
            />
        </Box>
    );

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element:
                <DashboardLayout>
                    <Suspense fallback={renderFallback}>
                        <ProtectedRoute />
                    </Suspense>
                </DashboardLayout>, // Wrap the component in ProtectedRoute
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