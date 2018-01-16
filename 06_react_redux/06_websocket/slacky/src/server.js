const express = require("express");
const WebSocket = require("ws");
const server = require("http").createServer();
const path = require("path");

// Express will only serve static file
const app = express();

const port = process.env.PORT || 4000;

server.listen(port, function () {
  console.log("Server listening on port:" + port);
});

// We open a websocket connection
const wss = new WebSocket.Server({server});
wss.on("connection", (ws, req) => {
  ws.on("message", (data) => {
    if (data === "CLOSE") {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    } else {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      })
    }
  });
});
