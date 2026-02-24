import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Login = lazy(() => import("./features/auth/Login"));
const EmployeeList = lazy(() => import("./features/employees/EmployeeList"));
const EmployeeAnalytics = lazy(
  () => import("./features/employees/EmployeeAnalytics"),
);
const EmployeeMap = lazy(() => import("./features/employees/EmployeeMap"));
const EmployeeDetail = lazy(
  () => import("./features/employees/EmployeeDetail"),
);
const PhotoResult = lazy(() => import("./features/photo/PhotoResult"));

import AppLayout from "./layouts/AppLayout";
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
    element: <Login />,
  },
  {
    element: <AppLayout />,
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
