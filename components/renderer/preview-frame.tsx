"use client";
import { useEffect, useRef, useState } from "react";
import { incrementViewCount } from "@/utils/actions";

interface PreviewFrameProps {
  code?: string;
  theme?: "light" | "dark";
  previewUrl?: string | null;
  componentId?: number;
}

export function PreviewFrame({
  code,
  theme = "light",
  previewUrl,
  componentId,
}: PreviewFrameProps) {
  const iframeRef = useRef(null);
  const hasTrackedView = useRef(false);

  // Skeleton loading state
  const [isLoading, setIsLoading] = useState(true);

  // Fallback to runtime sandbox logic (only runs if no previewUrl)
  useEffect(() => {
    if (previewUrl) return; // Skip if we are in URL mode

    const iframe = iframeRef.current;
    if (!iframe) return;

    // Allow iframe to load before sending messages
    const handleLoad = () => {
      setIsLoading(false);
      // Send theme
      iframe.contentWindow?.postMessage(
        { type: "THEME_CHANGE", payload: theme },
        "*",
      );
      // Send code
      iframe.contentWindow?.postMessage(
        { type: "RENDER_CODE", payload: code },
        "*",
      );
    };

    iframe.addEventListener("load", handleLoad);
    if (iframe.contentDocument?.readyState === "complete") {
      handleLoad();
    }
    return () => iframe.removeEventListener("load", handleLoad);
  }, [code, theme, previewUrl]);

  // Re-send code if it changes
  useEffect(() => {
    if (previewUrl) return;
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument?.readyState === "complete") {
      iframe.contentWindow?.postMessage(
        { type: "RENDER_CODE", payload: code },
        "*",
      );
    }
  }, [code, previewUrl]);

  // Re-send theme if it changes
  useEffect(() => {
    if (previewUrl) return;
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument?.readyState === "complete") {
      iframe.contentWindow?.postMessage(
        { type: "THEME_CHANGE", payload: theme },
        "*",
      );
    }
  }, [theme, previewUrl]);

  // If a static preview URL is provided, just use that.
  if (previewUrl) {
    const handleIframeLoad = () => {
      setIsLoading(false);
      if (componentId && !hasTrackedView.current) {
        hasTrackedView.current = true;
        incrementViewCount(componentId).catch(console.error);
      }
    };

    // Append theme to URL. Check if URL already has params.
    const separator = previewUrl.includes("?") ? "&" : "?";
    const urlWithTheme = `${previewUrl}${separator}theme=${theme}`;

    return (
      <div className="w-full h-full bg-transparent overflow-hidden border relative">
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center z-10">
            <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        <iframe
          src={urlWithTheme}
          className="w-full h-full border-0"
          title="Component Preview"
          sandbox="allow-scripts allow-same-origin"
          onLoad={handleIframeLoad}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-transparent overflow-hidden border relative">
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center z-10">
          <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
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
