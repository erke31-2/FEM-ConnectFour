import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import GamePage from "./pages/GamePage";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/create-room",
        element: <CreateRoom />,
      },
      {
        path: "/join-room",
        element: <JoinRoom />,
      },
      {
        path: "/play",
        element: <GamePage />,
      },
    ] 
  },
 
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
