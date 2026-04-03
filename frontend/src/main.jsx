import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import AuthContextProvider from "./context/authContext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <AppRoutes />
      <Toaster />
    </AuthContextProvider>
  </QueryClientProvider>,
);
