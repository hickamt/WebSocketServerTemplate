const WebSocket = require("ws");
const { textGenerationAPI } = require("./huggingfaceAPI/textGenerationAPI");

const wss = new WebSocket.Server({ port: 5500 });

wss.on("connection", (ws) => {
  console.log(
    "WebSocket connection established. Listening on http://localhost:5500"
  );

  ws.on("message", async (message) => {
    try {
      // Assuming messages are JSON with a type property
      const request = JSON.parse(message);

      if (request.type === "textGeneration") {
        const response = await textGenerationAPI(request); // Process the request
        ws.send(JSON.stringify(response));
      }

      // Add more request types as needed
    } catch (error) {
      console.error("Error processing message:", error);
      ws.send(JSON.stringify({ type: "error", message: error.toString() }));
    }
  });
});
