import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

function PageLoader({ isLoading, delay = 100, timer = 300, message = "", children }) {
  const [shouldDisplayLoader, setShouldDisplayLoader] = useState(false);

  useEffect(() => {
    let delayTimeout;
    let hideTimeout;

    if (isLoading) {
      delayTimeout = setTimeout(() => {
        setShouldDisplayLoader(true);
      }, delay);
    } else {
      hideTimeout = setTimeout(() => {
        setShouldDisplayLoader(false);
      }, timer);
    }

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(hideTimeout);
    };
  }, [isLoading, delay, timer]);

  if (shouldDisplayLoader) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen z-50 flex items-center justify-center bg-background overflow-hidden flex flex-col">
        <HashLoader color="#1764FF" />
        <p className="text-copy-secondary pt-4 animate-pulse">{message}</p>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}

export default PageLoader;
