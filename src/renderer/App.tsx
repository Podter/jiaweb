import { useEffect, useRef } from "react";
import {
  ArrowLeft20Filled,
  ArrowRight20Filled,
  LineHorizontal320Filled,
  Search20Filled,
} from "@fluentui/react-icons";

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
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="form-control mr-2">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
              />
              <button className="btn btn-square">
                <Search20Filled />
              </button>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => {
              webview.current.goBack();
              console.log(webview.current.canGoBack());
            }}
          >
            <ArrowLeft20Filled />
          </button>
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => {
              webview.current.goForward();
              console.log(webview.current.canGoForward());
            }}
          >
            <ArrowRight20Filled />
          </button>
          <button className="btn btn-ghost btn-circle">
            <LineHorizontal320Filled />
          </button>
        </div>
      </div>
      <webview ref={webview} className="h-webview"></webview>
    </div>
  );
}
