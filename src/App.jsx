import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const Login = lazy(() => import("./features/auth/Login"));
const EmployeeList = lazy(
  () => import("./features/employees/list/EmployeeList"),
);
const EmployeeAnalytics = lazy(
  () => import("./features/employees/analytics/EmployeeAnalytics"),
);
const EmployeeMap = lazy(() => import("./features/employees/map/EmployeeMap"));
const EmployeeDetail = lazy(
  () => import("./features/employees/detail/EmployeeDetail"),
);
const PhotoResult = lazy(() => import("./features/photo/PhotoResult"));

import LoginSkeleton from "./features/auth/LoginSkeleton";
import AppLayout from "./layouts/AppLayout";
import AppLayoutSkeleton from "./ui/AppLayoutSkeleton";
import Error from "./ui/Error";
import PageNotFound from "./ui/PageNotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoginSkeleton />}>
        <Login />
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<AppLayoutSkeleton />}>
        <AppLayout />,
      </Suspense>
    ),
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <EmployeeList />,
        // loader: listLoader,
      },
      {
        path: "/analytics",
        element: <EmployeeAnalytics />,
      },
      {
        path: "/map",
        element: <EmployeeMap />,
      },
      {
        path: "/employees/:employeeId",
        element: <EmployeeDetail />,
        // loader: detailLoader,
      },
      {
        path: "/photo-result",
        element: <PhotoResult />,
        // loader: photoLoader,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
