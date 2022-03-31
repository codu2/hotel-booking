import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addNewUser = (name, socketId) => {
  !users.some((user) => user.name === name) && users.push({ name, socketId });
};

const findUser = (name) => {
  return users.find((user) => user.name === name);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (name) => {
    addNewUser(name, socket.id);
  });

  socket.on("sendChat", ({ name, receiver, chat }) => {
    const receiveUser = findUser(receiver);
    io.to(receiveUser.socketId).emit("notification", {
      name,
      chat,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(5000);
