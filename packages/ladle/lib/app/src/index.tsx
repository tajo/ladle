//@ts-ignore
import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import { render } from "react-dom";
import App from "./app";

const container = document.getElementById("ladle-root") as HTMLElement;
if (ReactDOMClient && ReactDOMClient.createRoot) {
  // React 18+
  const root = ReactDOMClient.createRoot(container);
  root.render(<App />);
} else {
  // React <18
  render(<App />, container);
}
