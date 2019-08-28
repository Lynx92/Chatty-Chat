const express = require("express");
const app = express();
const path = require("path");

//settings
app.set("port", process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, "public")));

//start the server
const server = app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

//SocketIO
const SocketIO = require("socket.io");
const io = SocketIO(server);

//websockets

io.on("connection", socket => {
  console.log("new connection", socket.id);

  socket.on("message", data => {
    io.sockets.emit("message", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("userlist", data => {
    io.sockets.emit("userlist", data);
    console.log(data);
  });
});


