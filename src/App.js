import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home/Home";
import About from "./pages/About/About";
// import Contact from "./pages/Contact/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy.js";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: Home,
  // },
  {
    path: "/about",
    element: <About />,
  },
  // {
  //   path: "/contact",
  //   element: Contact,
  // },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
