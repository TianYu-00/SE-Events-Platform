import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LazyPageLoader from "./components/LazyPageLoader";
import { ClerkProvider } from "@clerk/clerk-react";
import PrivateRoute from "./components/ProtectedRoute";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// https://react.dev/reference/react/lazy
const Header = lazy(() => import("./pages/Header"));
const Landing_Home = lazy(() => import("./pages/Landing_Home"));
const Landing_Events = lazy(() => import("./pages/Landing_Events"));
const Landing_Auth_SignIn = lazy(() => import("./pages/Landing_Auth_SignIn"));
const Landing_Auth_SignUp = lazy(() => import("./pages/Landing_Auth_SignUp"));
const Landing_Auth_Signup_Initialize = lazy(() => import("./pages/Landing_Auth_Signup_Initialize"));
const Landing_404 = lazy(() => import("./pages/Landing_404"));

// Admin & Staff
const Landing_CreateEvent = lazy(() => import("./pages/Landing_CreateEvent"));

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      signInUrl="/auth-signin"
      signUpUrl="/auth-signup"
      signUpForceRedirectUrl="/auth-signup/initialize"
    >
      <BrowserRouter>
        <div className={theme}>
          <div className="min-h-screen">
            <Header toggleTheme={toggleTheme} theme={theme} />
            <Suspense fallback={<LazyPageLoader delay={300} />}>
              <Routes>
                <Route path="*" element={<Landing_404 />} />
                <Route path="/" element={<Landing_Home />} />
                <Route path="/home" element={<Landing_Home />} />
                <Route path="/events" element={<Landing_Events />} />
                <Route path="/auth-signin" element={<Landing_Auth_SignIn />} />
                <Route path="/auth-signup" element={<Landing_Auth_SignUp />} />
                <Route path="/auth-signup/initialize" element={<Landing_Auth_Signup_Initialize />} />
                <Route path="/create-event" element={<PrivateRoute element={<Landing_CreateEvent />} />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
};

export default App;
