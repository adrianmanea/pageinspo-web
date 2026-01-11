"use client";
import { useEffect, useRef } from "react";

interface PreviewFrameProps {
  code: string;
  theme?: "light" | "dark";
}

export function PreviewFrame({ code, theme = "light" }: PreviewFrameProps) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    console.log("PreviewFrame mounted. Theme:", theme, "Has Code:", !!code);
    if (!iframe) return;

    // Allow iframe to load before sending messages
    const handleLoad = () => {
      console.log("PreviewFrame: iframe 'load' event fired");
      // Send theme
      iframe.contentWindow?.postMessage(
        { type: "THEME_CHANGE", payload: theme },
        "*"
      );
      // Send code
      console.log("PreviewFrame: sending RENDER_CODE");
      iframe.contentWindow?.postMessage(
        { type: "RENDER_CODE", payload: code },
        "*"
      );
    };

    iframe.addEventListener("load", handleLoad);

    // If already loaded (e.g. re-render), send immediately
    if (iframe.contentDocument?.readyState === "complete") {
      handleLoad();
    }

    return () => iframe.removeEventListener("load", handleLoad);
  }, [code, theme]);

  // Re-send code if it changes while iframe is already loaded
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument?.readyState === "complete") {
      iframe.contentWindow?.postMessage(
        { type: "RENDER_CODE", payload: code },
        "*"
      );
    }
  }, [code]);

  // Re-send theme if it changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument?.readyState === "complete") {
      iframe.contentWindow?.postMessage(
        { type: "THEME_CHANGE", payload: theme },
        "*"
      );
    }
  }, [theme]);

  return (
    <div className="w-full h-full bg-transparent rounded-lg shadow-sm overflow-hidden border border-gray-200/0">
      <iframe
        ref={iframeRef}
        src="/sandbox.html"
        className="w-full h-full border-0"
        title="Component Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
