import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

// ✅ CORS FIRST
app.use(cors({
  origin: "https://chat-app-89za.vercel.app/",
  methods: ["GET", "POST"],
}));

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-89za.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 1000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
