import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "./context/authContext.jsx";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
