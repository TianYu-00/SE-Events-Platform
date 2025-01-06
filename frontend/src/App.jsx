import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LazyPageLoader from "./components/PageLoader";

// https://react.dev/reference/react/lazy
const Header = lazy(() => import("./pages/Header"));
const Landing_Home = lazy(() => import("./pages/Landing_Home"));

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className={theme}>
        <div className="min-h-screen">
          <Header toggleTheme={toggleTheme} theme={theme} />
          <Suspense fallback={<LazyPageLoader delay={300} />}>
            <Routes>
              <Route path="/" element={<Landing_Home />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
