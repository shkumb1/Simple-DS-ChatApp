const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

// health check route
app.get("/", (req,res) => {
  res.sendStatus(200)
})

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    allowedHeaders: ["*"],
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "*"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const port = +process.argv[2]; 

server.listen(port, () => {
  console.log("running on port", port);
});

