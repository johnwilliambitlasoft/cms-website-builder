"use client";

import { useEffect } from "react";
import { disableZoom } from "@/lib/disableZoom";

export default function DisableZoomWrapper({ children }) {
  useEffect(() => {
    // Call the disableZoom function when the component mounts
    disableZoom();

    // Add additional styling to the document to prevent zooming
    document.documentElement.style.WebkitTextSizeAdjust = "100%";
    document.documentElement.style.MsTextSizeAdjust = "100%";
    document.documentElement.style.textSizeAdjust = "100%";

    console.log("Zoom disabled for the application");
  }, []);

  return <>{children}</>;
}
