/**
 * AIResponseComponent: This component will display the response from the AI model.
 * It will need to make a request to your websocket server,
 * which will then communicate with the AI model.
 */
import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../socketDataProvider/SocketDataProvider";
import { v4 as uuid } from "uuid";

// Components
import MenuBar from "../menuBar/MenuBar";

// Styles
import "./styles.css";

const formattedTimestamp = () => {
  const date = new Date();
  const options = { timeZone: "America/Los_Angeles", hour12: false };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const timestamp = formatter.format(date);
  return timestamp;
};

function AiResponseComponent() {
  const { connectionState, textGenerationData, sendTextGenerationRequest } =
    useContext(WebSocketContext);
  const [inputText, setInputText] = useState("");
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (textGenerationData) {
      console.log("inside useEffect(): ", textGenerationData);
      setResponseData((prev) => [...prev, textGenerationData]);
    }
  }, [textGenerationData]);

  const handleClear = () => {
    setInputText("");
    setResponseData([]);
  };

  const handleSubmit = () => {
    if (connectionState === "CLOSED") {
      console.error(
        "Unable to submit the request. WebSocket connection is closed"
      );
    }
    const newRequest = {
      aiModelName: "Mixtral",
      aiModelURL: "URL_path_for_mixtral",
      prompt: inputText,
      type: "textGeneration",
      uid: uuid(),
      timestamp: formattedTimestamp(),
    };

    // Send a text generation request when the button is clicked
    sendTextGenerationRequest(newRequest);
    setInputText("");
  };

  return (
    connectionState === "OPEN" && (
      <div className="ai-response-component">
        <MenuBar />

        {responseData.length > 0 ? (
          <div className="response-container">
            {responseData.map((data, index) => {
              return (
                <div key={index} className="response-item">
                  <pre>Date: {data.timestamp}</pre>
                  <pre>UID: {data.uid}</pre>
                  <pre>Model Name: {data.aiModelName}</pre>
                  <pre>Model URL: {data.aiModelURL}</pre>
                  <pre>Model Type: {data.type}</pre>
                  <pre className="prompt">Prompt: {data.prompt}</pre>
                  <pre className="response">Response: {data.response}</pre>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="response-container">Type and send a message</div>
        )}

        <textarea
          className="user-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="button-container">
          <button onClick={handleSubmit}>SUBMIT</button>
          <button onClick={handleClear}>CLEAR</button>
        </div>
      </div>
    )
  );
}

export default AiResponseComponent;
