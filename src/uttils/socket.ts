import { Server } from "socket.io";

import server from "src/server";

export const io = new Server(server, {
  cors: {
    origin: "http://localhsot:3000",
  },
});
