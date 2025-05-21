import { lazy, Suspense } from "react";
import { GlobalStyle } from "./styles/styles";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "./ui/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Booking from "./pages/Booking";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import Login from "./pages/Login";
import ProtectedPage from "./ui/ProtectedPage";
import DarkModeProvider from "./context/DarkModeProvider";

function App() {
  const AppLayout = lazy(() => import("./ui/PageLayout"));
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const Cabins = lazy(() => import("./pages/Cabins"));
  const Settings = lazy(() => import("./pages/Settings"));
  const Account = lazy(() => import("./pages/Account"));
  const Bookings = lazy(() => import("./pages/Bookings"));
  const Users = lazy(() => import("./pages/Users"));
  const PageNotFound = lazy(() => import("./pages/PageNotFound"));

  const router = createBrowserRouter(
    [
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedPage>
              <AppLayout />
            </ProtectedPage>
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "cabins",
            element: (
              <Suspense fallback={<Loader />}>
                <Cabins />
              </Suspense>
            ),
          },
          {
            path: "bookings",
            element: (
              <Suspense fallback={<Loader />}>
                <Bookings />
              </Suspense>
            ),
          },
          {
            path: "/booking/:bookingId",
            element: (
              <Suspense fallback={<Loader />}>
                <Booking />
              </Suspense>
            ),
          },
          {
            path: "/checkIn/:bookingId",
            element: (
              <Suspense fallback={<Loader />}>
                <CheckinBooking />
              </Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            ),
          },
          {
            path: "users",
            element: (
              <Suspense fallback={<Loader />}>
                <Users />
              </Suspense>
            ),
          },
          {
            path: "account",
            element: (
              <Suspense fallback={<Loader />}>
                <Account />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <PageNotFound />
          </Suspense>
        ),
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen />
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
        <GlobalStyle />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
