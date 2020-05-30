const http = require("https");

const socketManager = (socket) => {
  socket.on("COUNTER_UPDATE", (info) => {
    socket.broadcast.emit("COUNTER_UPDATE", info);
  });
};

const socket = (app) => {
  const server = http.createServer(app);
  const io = require("socket.io")(server);
  io.on("connection", socketManager);
  return server;
};

module.exports = socket;
