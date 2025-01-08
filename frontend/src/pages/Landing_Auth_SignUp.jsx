import React from "react";
import { SignUp } from "@clerk/clerk-react";

function Landing_Auth_SignUp() {
  return (
    <div className="h-[calc(100vh-5rem)] flex items-center justify-center">
      <SignUp />
    </div>
  );
}

export default Landing_Auth_SignUp;
