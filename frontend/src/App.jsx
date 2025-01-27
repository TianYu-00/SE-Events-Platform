import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LazyPageLoader from "./components/LazyPageLoader";
import { ClerkProvider } from "@clerk/clerk-react";
import PrivateRoute from "./components/ProtectedRoute";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import BackToTop from "./components/BackToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// https://react.dev/reference/react/lazy
const Header = lazy(() => import("./pages/Header"));
const Landing_Home = lazy(() => import("./pages/Landing_Home"));
const Landing_Events = lazy(() => import("./pages/Landing_Events"));
const Landing_Auth_SignIn = lazy(() => import("./pages/Landing_Auth_SignIn"));
const Landing_Auth_SignUp = lazy(() => import("./pages/Landing_Auth_SignUp"));
const Landing_Auth_Signup_Initialize = lazy(() => import("./pages/Landing_Auth_Signup_Initialize"));
const Landing_404 = lazy(() => import("./pages/Landing_404"));
const Landing_EventDetails = lazy(() => import("./pages/Landing_EventDetails"));

// Admin & Staff
const Landing_Playground = lazy(() => import("./pages/Landing_Playground"));
const Landing_CreateEvent = lazy(() => import("./pages/Landing_CreateEvent"));
const Landing_ManageEvents = lazy(() => import("./pages/Landing_ManageEvents"));

// Payment
const Landing_Payment = lazy(() => import("./pages/Landing_Payment"));
const Landing_PaymentCompletion = lazy(() => import("./pages/Landing_PaymentCompletion"));

const Landing_UserPurchases = lazy(() => import("./pages/Landing_UserPurchases"));

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const App = () => {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      signInUrl="/auth-signin"
      signUpUrl="/auth-signup"
      signUpForceRedirectUrl="/auth-signup/initialize"
    >
      <ThemeProvider>
        <BrowserRouter>
          <ThemedToastContainer />
          <div className="min-h-screen">
            <Header />
            <Suspense fallback={<LazyPageLoader delay={300} />}>
              <Routes>
                <Route path="*" element={<Landing_404 />} />
                <Route path="/" element={<Landing_Home />} />
                <Route path="/home" element={<Landing_Home />} />
                <Route path="/events" element={<Landing_Events />} />
                <Route path="/event/:eventId" element={<Landing_EventDetails />} />
                <Route path="/payment" element={<Landing_Payment />} />
                <Route path="/payment/completion" element={<Landing_PaymentCompletion />} />
                <Route path="/auth-signin" element={<Landing_Auth_SignIn />} />
                <Route path="/auth-signup" element={<Landing_Auth_SignUp />} />
                <Route path="/auth-signup/initialize" element={<Landing_Auth_Signup_Initialize />} />
                <Route path="/user/purchases" element={<Landing_UserPurchases />} />
                <Route path="/create-event" element={<PrivateRoute element={<Landing_CreateEvent />} />} />
                <Route path="/manage-events" element={<PrivateRoute element={<Landing_ManageEvents />} />} />
                <Route path="/playground" element={<PrivateRoute element={<Landing_Playground />} />} />
              </Routes>
            </Suspense>
            <div className="mt-10" />
            <BackToTop />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default App;

const ThemedToastContainer = () => {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3200}
      limit={3}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={true}
      theme={theme}
      transition:Bounce
    />
  );
};
