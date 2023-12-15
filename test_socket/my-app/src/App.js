import './App.css';
import socket from './socket';
import { useState } from "react";

function App() {
  const [roomID, setRoomID] = useState("657a70fa9f74723e8bd71958")

  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      console.log(err.message);
    }
  });

  socket.on("user", (user) => {
    console.log(user);
  });

  function send() {
    socket.emit("chat", {
      content: {
        message: "Em chao thay a",
        type: "text",
      },
      to: roomID,
    });
  }

  function changeRoom() {
    const room = roomID ===  "657a70fa9f74723e8bd71958" ? "657a719c9a940b6bdc930c9e": "657a70fa9f74723e8bd71958";
    socket.emit("join", room)
    setRoomID(room);
  }

  return (
    <div className="App">
      <p>{roomID}</p>
      <button
        onClick={() => { changeRoom() }}
      >
        Change room
      </button>

      <button
        onClick={() => { send() }}
      >
        Send
      </button>
    </div>
  );
}

export default App;
