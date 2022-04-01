import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  //각 문자열의 공백을 없애고 소문자로 만들어줌

  const user = { id, name, room };

  users.push(user);

  return user;
};

const removeUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    const user = addUser({ id: socket.id, name, room });

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    socket.emit("message", {
      user: "admin",
      text: `what kind of help do you?`,
    });

    /*
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });
    */
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
    }
  });
});

io.listen(5000);
