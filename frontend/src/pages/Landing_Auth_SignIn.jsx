import React from "react";
import { SignIn } from "@clerk/clerk-react";

function Landing_Auth_SignIn() {
  return (
    <div className="h-[calc(100vh-5rem)] flex items-center justify-center">
      <SignIn />
    </div>
  );
}

export default Landing_Auth_SignIn;
