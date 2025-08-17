import { getDetails } from "@/postfeed";
import React from "react";

function ServerComponent() {
  const detail = getDetails();
  return detail;
}

export default ServerComponent;
