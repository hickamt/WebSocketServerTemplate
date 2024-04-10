const WebSocket = require("ws");
const { textGenerationAPI } = require("./huggingfaceAPI/textGenerationAPI");

const wss = new WebSocket.Server({ port: 5500 });

// Function to send a ping message to the client
function heartbeat() {
  this.isAlive = true;
  this.ping();
}

wss.on("connection", (ws) => {
  console.log(
    "WebSocket connection established. Listening on http://localhost:5500"
  );

  // Set up ping-pong mechanism
  ws.isAlive = true;
  ws.on("pong", heartbeat);

  // Set up heartbeat interval (send ping messages)
  const interval = setInterval(() => {
    if (ws.isAlive === false) {
      clearInterval(interval);
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping();
  }, 30000); // Adjust interval as needed (e.g., every 30 seconds)

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

  // Set up initial heartbeat
  ws.on("close", () => clearInterval(interval));
  heartbeat.call(ws);
});

/**
 * LISTEN FOR 'SIGINT' OR 'SIGTERM'
 * TO SHUTDOWN THE SERVER
 */
function shutdown() {
  console.log('Shutting down...');

  // Close all WebSocket connections
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.close();
    }
  });

  // Close the WebSocket server
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
}

// Listen for shutdown signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);