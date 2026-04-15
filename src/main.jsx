import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import CreateTrip from "./Create-Trip/index.jsx";
import Header from "./components/custom/Header.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Header />
      <Toaster position="bottom-right" richColors />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
);
