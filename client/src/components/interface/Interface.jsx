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
import FactResponse from "../factResponse/FactResponse";
import JokeResponse from "../jokeResponse/JokeResponse";
import ButtonSelection from "../buttonSelection/ButtonSelection";

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
      userName: "UserName",
      prompt: inputText,
      type: "Surprise Me",
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
            {responseData.map((data) => {
              switch (data.response.type) {
                case "joke":
                  return <JokeResponse key={data.uid} data={data} />;
                case "fact":
                  return <FactResponse key={data.uid} data={data} />;
                default:
                  return;
              }
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
        <ButtonSelection
          handleSubmit={handleSubmit}
          handleClear={handleClear}
        />
      </div>
    )
  );
}

export default AiResponseComponent;
