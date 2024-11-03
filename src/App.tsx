import { HomePage } from "./containers/HomePage/HomePage.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams,
} from "react-router-dom";
import { PostPage } from "./containers/PostPage/PostPage.tsx";
import { SubredditPage } from "./containers/SubredditPage/SubredditPage.tsx";
import { Layout } from "./components/Layout/Layout.tsx";
import { ErrorPage } from "./containers/ErrorPage/ErrorPage.tsx";

const RedirectToSub = () => {
  const { subreddit } = useParams();
  return <Navigate to={`/sub/${subreddit}`} replace />;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/r/:subreddit",
        element: <RedirectToSub />,
      },
      {
        path: "/sub/:subreddit",
        element: <SubredditPage />,
      },
      {
        path: "/sub/:subreddit/post/:id",
        element: <PostPage />,
      },
      {
        path: "*",
        element: <ErrorPage message={"404 - Page not found"} />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
