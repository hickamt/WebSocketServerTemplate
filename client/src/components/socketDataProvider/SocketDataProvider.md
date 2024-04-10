```js
/* eslint-disable react/prop-types */
/**
 * SocketDataProvider: This component will manage the WebSocket connection to your Express server.
 * It will send the user's text to the server and receive the AI model's response.
 */

import { createContext, useEffect, useState, useRef } from "react";

// Create a context for the WebSocket connection that includes the connection and state
export const WebSocketContext = createContext({
  sendTextGenerationRequest: () => {},
  textGenerationData: null,
});

const SocketDataProvider = ({ children }) => {
  const [textGenerationData, setTextGenerationData] = useState(null);
  const socket = useRef(null); // Use useRef to persist the WebSocket connection

  useEffect(() => {
    // Initialize the WebSocket connection
    socket.current = new WebSocket("ws://localhost:5500");

    socket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Check if the message is a text generation response
        if (data.type === "textGeneration") {
          console.log("Client Received: ", data);
          setTextGenerationData(data);
        }
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    };

    socket.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.current.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.current.close();
    };
  }, []);

  // Function to allow children to send a text generation request
  const sendTextGenerationRequest = (requestData) => {
    if (socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(requestData));
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };

  // Return the context provider
  return (
    <WebSocketContext.Provider
      value={{ textGenerationData, sendTextGenerationRequest }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default SocketDataProvider;
```
