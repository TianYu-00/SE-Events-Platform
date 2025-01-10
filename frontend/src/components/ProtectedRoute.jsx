import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const PrivateRoute = ({ element }) => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  if (!loading) {
    return user.publicMetadata.role === "admin" ? element : <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
