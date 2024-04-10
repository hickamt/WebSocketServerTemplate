# Basic Client Application

This client application will display a menu bar, response generated text area, and input field with submit and clear buttons. While the client interface is bland it serves as the method of testing the server Websocket connection.

## Set Up

You can set up the entire application (server & client) using `yarn setup` in the /root directory which will handle the client and server dependencies and configuration necessary to run the application. Then, you can run `yarn dev` to spin up the server and then client which will listen on `http://localhost:5173`. The server will listen on `ws://localhost:5500`.

If you would like to install dependencies for just the client then you can run `yarn` followed by `yarn dev` to spin up the client on the localhost:5173.
