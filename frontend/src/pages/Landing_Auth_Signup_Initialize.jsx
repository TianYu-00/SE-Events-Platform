import React, { useEffect, useState } from "react";
import { initializeUser } from "../api";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { toast } from "react-toastify";
import useErrorChecker from "../hooks/useErrorChecker";

function Landing_Auth_Signup_Initialize() {
  const checkError = useErrorChecker();

  const [isInitializing, setIsInitializing] = useState(true);
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const runInitializeUser = async () => {
      try {
        setIsInitializing(true);
        await initializeUser(user.id, user.publicMetadata);
      } catch (error) {
        checkError(error);
      } finally {
        setIsInitializing(false);
      }
    };

    if (isLoaded) {
      if (isSignedIn) {
        if (user && Object.keys(user.publicMetadata).length === 0) {
          runInitializeUser();
        } else {
          navigate("/", { replace: true });
        }
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  useEffect(() => {
    if (!isInitializing) {
      navigate("/", { replace: true });
    }
  }, [isInitializing]);

  return <PageLoader isLoading={isInitializing} message="Initializing User" />;
}

export default Landing_Auth_Signup_Initialize;
