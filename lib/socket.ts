import { ClientToServerEvents, ServerToClientEvents } from "@/app/interfaces";
import { io, Socket } from "socket.io-client";

const URL = `http://localhost:3000`;

export const socket: Socket<ClientToServerEvents, ServerToClientEvents> = io(
  URL,
  { path: "/socket.io" }
);
