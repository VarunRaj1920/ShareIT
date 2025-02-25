import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, { path: "/api/socket" });

    io.on("connection", (socket) => {
      socket.on("updateCode", ({ id, content }) => {
        socket.broadcast.emit(`codeUpdate-${id}`, content);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}