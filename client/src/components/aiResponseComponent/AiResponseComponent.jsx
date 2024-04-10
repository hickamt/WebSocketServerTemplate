/**
 * AIResponseComponent: This component will display the response from the AI model.
 * It will need to make a request to your websocket server,
 * which will then communicate with the AI model.
 */
import { useContext, useState } from "react";
import { WebSocketContext } from "../socketDataProvider/SocketDataProvider";

function AiResponseComponent() {
  const { sendTextGenerationRequest, textGenerationData } =
    useContext(WebSocketContext);
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    const newRequest = {
      type: "textGeneration",
      prompt: inputText,
      aiModelName: "Mixtral",
      aiModelURL: "URL_path_for_mixtral",
    }
    // Send a text generation request when the button is clicked
    sendTextGenerationRequest(newRequest);
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div>
        <button onClick={handleSubmit}>Generate Text</button>
      </div>

      {textGenerationData && (
        <div>
          <h2>Generated Text:</h2>
          <p>{textGenerationData.generatedText}</p>
        </div>
      )}
    </div>
  );
}

export default AiResponseComponent;
