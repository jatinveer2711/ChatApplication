import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import messageRoutes from "./routes/message.route.js";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";   
import dns from 'dns';
dns.setServers(['8.8.8.8','1.1.1.1']);


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ CREATE HTTP SERVER
const server = http.createServer(app);

// ✅ ATTACH SOCKET TO HTTP SERVER
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("new message", (newMessage) => {
    socket.to(newMessage.chat._id).emit("message received", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully ");

    // ❌ REMOVE app.listen
    // ✅ USE server.listen
    server.listen(PORT, () => {
      console.log("Server running ");
    });

  } catch (err) {
    console.error("DB connection failed ", err);
    process.exit(1);
  }
};

startServer();