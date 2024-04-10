```js
const express = require("express");
const http = require("http");
const cors = require("cors");
const WebSocket = require("ws");
const textGenerationAPI = require("./huggingfaceAPI/textGenerationAPI");

const app = express();
const server = http.createServer(app); // Create HTTP server from Express app

// Initialize WebSocket server with the HTTP server
const wss = new WebSocket.Server({ server });

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handle websocket connections
wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  ws.on("message", (message) => {
    console.log("received: %s", message);
  });

  ws.send(JSON.stringify({ message: "Connection established" }));
});

// Handle API requests
app.post("/textGeneration", async (req, res) => {
  try {
    const response = await textGenerationAPI(req.body);

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ path: "/textGeneration", data: response })
        ); // Ensure the response is properly formatted as JSON
      }
    });

    res.json({ message: "Request processed" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `An error occurred: ${error}` });
  }
});

// Add handlers for /text2speech and /text2image as needed

// Upgrade HTTP server to also accept WebSocket connections
server.listen(5500, () => {
  console.log("Server started on port 5500: http://localhost:5500");
});
```
