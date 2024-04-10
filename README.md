# Client / Server Websocket Template

This application is a basic template using the [WebSocket Object](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

## Set Up

```bash
# At time of development
NODE: v20.9.0

YARN: v1.22.19
```

After cloning the repository you can setup the server and client by running:

```bash
yarn setup
```

Test that the application is setup correctly using:

```bash
yarn dev
```

For a complete list of available scripts, see the [/root package.json](./package.json)

## PORTS

- Server is listening on: `ws://localhost:5500`
- Client is listening on: `http://localhost:5173`

## Websocket Benefits

The following outline is created by [Perplexity.ai](https://www.perplexity.ai/)

The key benefits of using a WebSocket connection for a client-server application like React and Node.js are:

1. **Real-time, Bidirectional Communication**: WebSockets enable true real-time, bidirectional communication between the client and server. This allows for instant updates and notifications to be pushed from the server to the client, without the client having to constantly poll the server.[1][2][3][4]

2. **Low Latency**: WebSocket connections have lower latency compared to traditional HTTP requests, as they use a persistent, long-lived connection rather than creating a new connection for each request.[1][2][3][4]

3. **Efficient Resource Usage**: WebSockets use a single, persistent TCP connection to exchange data, which is more efficient than the multiple HTTP requests and responses required for the same amount of data transfer.[1][2][3][4]

4. **Suitability for Real-time Applications**: WebSockets are well-suited for real-time applications like chat, online collaboration, multiplayer games, and real-time dashboards, where low-latency and instant updates are crucial.[1][2][3][4]

5. **Reduced Server Load**: By using a persistent connection, WebSockets reduce the server load compared to traditional HTTP requests, which require the server to handle many short-lived connections.[1][2][3][4]

6. **Compatibility with Modern Browsers**: WebSockets are supported by all major modern web browsers, making it easier to build real-time web applications that work across different platforms.[3][4]

In summary, WebSockets provide significant benefits over traditional HTTP communication, especially for real-time, bidirectional applications like the one built with React and Node.js. The persistent, low-latency connection and efficient resource usage make WebSockets a compelling choice for modern web development.[1][2][3][4]

Citations:
[1] https://www.mohammadfaisal.dev/blog/learn-websockets-with-nodejs-and-reactjs
[2] https://refine.dev/blog/react-websocket-tutorial-nodejs/
[3] https://ably.com/blog/choosing-the-right-websocket-library-for-react-project
[4] https://ably.com/blog/websockets-react-tutorial
[5] https://blog.logrocket.com/websocket-tutorial-real-time-node-react/
