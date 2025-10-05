import { createHashRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../components/Layout.tsx";
import Home from "../pages/Home.tsx";
import Widgets from "../pages/Widgets.tsx";
import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import Documentation from "@/pages/Documentation.tsx";
import { Toaster } from "sonner";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/widgets/*", element: <Widgets /> },
      { path: "/documentation/*", element: <Documentation /> },
    ]
  }
]);

export default function App() {
  return (
    <>
      <Toaster position="top-center" /> {/* of 'bottom-right', etc */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}