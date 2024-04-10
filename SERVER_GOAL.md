# Websocket Server Goal

This websocket template server should accept a request to make an API call and on a successful response, update the client. The client should be able to make an API request without waiting for the response. The client should have a server provider listening for changes which the server will push updates to. This allows asynchronous calls on the client side and should allow greater performance and state reliability than handling data objects for each API request individually.

## API Endpoints

The endpoints for this template will use Huggingface Inference Ai Models. Each prompt will include:

```js
const request = {
  prompt: "string",
  aiModelName: "string",
  aiModelType: "string",
  aiModelURL: "string",
};
```

The base URL for Huggingface is handled using:

```js
"https://api-inference.huggingface.co/models/" + request.aiModelURL;
```

A return from the Ai Model could be a text string or base64 for audio, video, or image. Base64 will be converted on the server side before returning to the client. This will allow the server to push the persisted data to Firebase or other databases if needed.
