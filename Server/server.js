import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
<<<<<<< HEAD
=======
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
>>>>>>> ae6b094 (Production ready deployment)

const app = express();
const server = http.createServer(app);

<<<<<<< HEAD
// ✅ CORS FIRST
app.use(cors({
  origin: "https://chat-app-89za.vercel.app/",
  methods: ["GET", "POST"],
}));
=======
// ✅ middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ serve frontend build
app.use(express.static(path.join(__dirname, "../client/dist")));
>>>>>>> ae6b094 (Production ready deployment)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ✅ socket.io
const io = new Server(server, {
  cors: {
<<<<<<< HEAD
    origin: "https://chat-app-89za.vercel.app/",
=======
    origin: "*", // production ke liye
>>>>>>> ae6b094 (Production ready deployment)
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

<<<<<<< HEAD
const PORT = process.env.PORT || 1000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
=======
// ✅ Render needs process.env.PORT
const PORT = process.env.PORT || 1000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> ae6b094 (Production ready deployment)
