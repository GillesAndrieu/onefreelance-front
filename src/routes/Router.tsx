import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Box from '@mui/material/Box';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
// Auth
import {useAuth} from "../hooks";
import {ProtectedRoute} from "./ProtectedRoute";
import {AuthWrapper} from "../hooks/AuthExpire";
// Layouts
import {AuthLayout} from "../layouts/auth";
import {DashboardLayout} from '../layouts/dashboard';
// Pages
import {Login} from "../pages/login";
import {NotFound} from "../pages/not-found";
import {Home} from "../pages/home";
import {CreateUser, EditUser, Users} from "../pages/users";
import {Clients, CreateClient, EditClient} from "../pages/clients";
import {Contracts, CreateContract, EditContract} from "../pages/contracts";
import {Suspense} from "react";
import {varAlpha} from "../theme/styles";

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
                    bgcolor: (theme) => varAlpha(theme.palette.text.primary, 0.16),
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
                <AuthWrapper>
                    <DashboardLayout>
                        <Suspense fallback={renderFallback}>
                            <ProtectedRoute />
                        </Suspense>
                    </DashboardLayout>
                </AuthWrapper>, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "/profile",
                    element: <div>User Profile</div>,
                },
                {
                    path: "/users",
                    element: <Users />,
                },
                {
                    path: "/users/create",
                    element: <CreateUser />,
                },
                {
                    path: "/users/update",
                    element: <EditUser />,
                },
                {
                    path: "/clients",
                    element: <Clients />,
                },
                {
                    path: "/clients/create",
                    element: <CreateClient />,
                },
                {
                    path: "/clients/update",
                    element: <EditClient />,
                },
                {
                    path: "/contracts",
                    element: <Contracts />,
                },
                {
                    path: "/contracts/create",
                    element: <CreateContract />,
                },
                {
                    path: "/contracts/update",
                    element: <EditContract />,
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