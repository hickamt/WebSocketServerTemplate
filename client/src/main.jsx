import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Providers
import SocketDataProvider from "./components/socketDataProvider/SocketDataProvider.jsx";

// Global Styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketDataProvider>
      <App />
    </SocketDataProvider>
  </React.StrictMode>
);
