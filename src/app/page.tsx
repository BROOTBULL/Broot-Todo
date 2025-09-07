"use client";
import { useEffect, useState } from "react";
import Loader from "./landing-components/loader";
import Homepage from "./landing-components/homepage";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the page is already fully loaded
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      // Wait for window load (all assets like images/fonts)
      const handleLoad = () => setLoading(false);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) return <Loader />;

  return <Homepage />;
}
