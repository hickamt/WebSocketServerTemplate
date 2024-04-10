/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useRef } from "react";

// CONTEXT STATE
const CONNECTION_STATES = {
  CONNECTING: "CONNECTING",
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  ERROR: "ERROR",
};

// CONTEXT
export const WebSocketContext = createContext({
  connectionState: CONNECTION_STATES.CLOSED,
  sendTextGenerationRequest: () => {},
  textGenerationData: null,
});

const SocketDataProvider = ({ children }) => {
  const [textGenerationData, setTextGenerationData] = useState(null);
  const [connectionState, setConnectionState] = useState(
    CONNECTION_STATES.CLOSED
  );
  const socket = useRef(null);

  useEffect(() => {
    setConnectionState(CONNECTION_STATES.CONNECTING);

    // Set websocket connection for backend server listening on 5500
    socket.current = new WebSocket("ws://localhost:5500");

    socket.current.onopen = () => {
      setConnectionState(CONNECTION_STATES.OPEN);
      console.log("WebSocket connection established");
    };

    socket.current.onclose = () => {
      setConnectionState(CONNECTION_STATES.CLOSED);
      console.log("WebSocket connection closed");
    };

    socket.current.onerror = (event) => {
      setConnectionState(CONNECTION_STATES.ERROR);
      console.error("WebSocket error:", event);
    };

    // Update state as changes occur on context objects
    socket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // if (data.type === "textGeneration") {
        setTextGenerationData(data);
        // }
      } catch (error) {
        console.error("Error parsing message:", error);
        setConnectionState(CONNECTION_STATES.ERROR);
      }
    };

    return () => {
      socket.current.close();
    };
  }, []);

  const sendTextGenerationRequest = (requestData) => {
    if (connectionState === CONNECTION_STATES.OPEN) {
      socket.current.send(JSON.stringify(requestData));
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        connectionState,
        textGenerationData,
        sendTextGenerationRequest,
      }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default SocketDataProvider;
