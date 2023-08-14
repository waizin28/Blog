import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";
import { postsRoute } from "./pages/Posts";
import { usersRoute } from "./pages/Users";
import RootLayout from "./layout/RootLayout";
import { todosRoute } from "./pages/Todos";
import { postRoute } from "./pages/Post";
import { userRoute } from "./pages/User";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        // Will show error message when there is an error at any of children
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/posts" /> },
          {
            path: "posts",
            children: [
              { index: true, ...postsRoute },
              { path: ":postId", ...postRoute },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, ...usersRoute },
              { path: ":userId", ...userRoute },
            ],
          },
          { path: "todos", ...todosRoute },
          { path: "*", element: <h1>404 - Page Not Found</h1> },
        ],
      },
    ],
  },
]);

function ErrorPage() {
  // Get error that cause erro to render
  const error = useRouteError();
  return (
    <>
      <h1>Something Went Wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
