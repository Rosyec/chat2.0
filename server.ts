import next from "next";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from "./app/interfaces";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = createServer((req, res) => handle(req, res));
  const io = new Server<ServerToClientEvents, ClientToServerEvents>(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("Socket conectado: ", socket.id);
    socket.on("message", (msg: Message) => {
      io.emit("sendMessage", msg);
    });
  });

  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
