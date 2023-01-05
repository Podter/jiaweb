import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";

type ElectronWebViewElement = HTMLWebViewElement & {
  src: string;
  goBack: () => void;
  goForward: () => void;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
};

export default function App() {
  const webview = useRef<ElectronWebViewElement | null>(null);

  useEffect(() => {
    webview.current.src = "https://www.google.com";
  }, []);

  return (
    <div>
      <Navbar />
      <div className="h-12"></div>
      <webview ref={webview} className="h-webview"></webview>
    </div>
  );
}
