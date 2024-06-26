/* eslint-disable react/prop-types */
import "./styles.css"

function FactResponse({ data }) {
  return (
    <div className="response-item">
      {/* Original Prompt */}
      <pre className="prompt">Date: {data.timestamp}</pre>
      <pre className="prompt">Type: {data.type}</pre>
      <pre className="prompt">UID: {data.uid}</pre>
      <pre className="prompt">Prompt: {data.prompt}</pre>

      {/* Response to Prompt */}
      <pre className="response">Type: {data.response.type}</pre>
      <pre className="response">Source: {data.response.source}</pre>
      {data.response.url ? (
        <a
          className="response"
          href={data.response.url}
          target="_blank"
          rel="noopener noreferrer">
          {data.response.source} URL
        </a>
      ) : (
        <pre className="response">No URL Provided</pre>
      )}
      <pre className="response">Fact: {data.response.fact}</pre>
    </div>
  );
}

export default FactResponse;
