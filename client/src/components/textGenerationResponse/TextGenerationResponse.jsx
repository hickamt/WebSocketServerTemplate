/* eslint-disable react/prop-types */
import "./styles.css"

function TextGenerationResponse({ data }) {
  return (
    <div className="response-item">
      <pre>Date: {data.timestamp}</pre>
      <pre>UID: {data.uid}</pre>
      <pre>Model Name: {data.aiModelName}</pre>
      <pre>Model URL: {data.aiModelURL}</pre>
      <pre>Model Type: {data.type}</pre>
      <pre className="prompt">Prompt: {data.prompt}</pre>
      <pre className="response">Response: {data.response}</pre>
    </div>
  );
}

export default TextGenerationResponse;