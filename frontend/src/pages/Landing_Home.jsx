import React, { useEffect, useState } from "react";
import { testApi } from "../api";

function Landing_Home() {
  const [text, setText] = useState("");
  useEffect(() => {
    const runTestApi = async () => {
      const response = await testApi();
      setText(response.msg);
    };

    runTestApi();
  }, []);

  return (
    <div className="text-copy-primary">
      Home Page <div>{text}</div>
    </div>
  );
}

export default Landing_Home;
