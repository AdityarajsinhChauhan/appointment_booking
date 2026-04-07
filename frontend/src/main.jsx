import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <AppointmentProvider>
            <App />
          </AppointmentProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
    </ErrorBoundary>
    
  </StrictMode>,
);
