/* eslint-disable react/prop-types */
function JokeResponse({ data }) {
  return (
        <div className="response-item">
      {/* Original Prompt */}
      <pre className="prompt">UserName: {data.userName}</pre>
      <pre className="prompt">Type: {data.type}</pre>
      <pre className="prompt">Date: {data.timestamp}</pre>
      <pre className="prompt">UID: {data.uid}</pre>
      <pre className="prompt">Prompt: {data.prompt}</pre>

      {/* Response to Prompt */}
      <pre>Type: {data.response.type}</pre>
      <pre className="response">Source: {data.response.source}</pre>
      <pre className="response">Joke: {data.response.joke}</pre>
    </div>
  );
}

export default JokeResponse;
