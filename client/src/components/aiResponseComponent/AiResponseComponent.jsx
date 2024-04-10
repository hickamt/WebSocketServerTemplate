/**
 * AIResponseComponent: This component will display the response from the AI model.
 * It will need to make a request to your websocket server,
 * which will then communicate with the AI model.
 */
import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../socketDataProvider/SocketDataProvider";

import "./styles.css";

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

  const handleSubmit = () => {
    if (connectionState === "CLOSED") {
      console.error(
        "Unable to submit the request. WebSocket connection is closed"
      );
    }
    const newRequest = {
      type: "textGeneration",
      prompt: inputText,
      aiModelName: "Mixtral",
      aiModelURL: "URL_path_for_mixtral",
    };

    // Send a text generation request when the button is clicked
    sendTextGenerationRequest(newRequest);
    console.log("AiResponseComponent Data: ", textGenerationData);
  };

  return (
    connectionState === "OPEN" && (
      <div className="ai-response-component">
        <div className="menu-bar">
          <p>LoadAnimation</p>
          <p>MENU TITLE</p>
          <p>Settings Icon</p>
        </div>

        {responseData.length > 0 ? (
          <div className="response-container">
            {responseData.map((data, index) => {
              return (
                <div key={index} className="response-item">
                  <pre className="prompt">Prompt: {data.prompt}</pre>
                  <pre className="response">Response: {data.response}</pre>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="response-container">Nothing to display</div>
        )}

        <textarea
          className="user-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div>
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>
    )
  );
}

export default AiResponseComponent;
