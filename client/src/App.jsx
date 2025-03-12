import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import logo from "./assets/seeu.png";

const socket = io.connect("http://localhost:8001");

function App() {
  console.log({ logo });
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);

      socket.on("disconnect", () => {
        socket.connect();
        socket.emit("join_room", room);
      });
    }
  };

  return (
    <div
      className="App flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {!showChat ? (
        <div className="inline-block my-auto text-center bg-base-200 p-10 rounded-lg bg-opacity-90">
          <h3 className="font-semibold">SEEU Chat</h3>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What is your name?</span>
            </label>
            <input
              type="text"
              placeholder="Name here..."
              className="input input-bordered w-full max-w-xs"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Room ID</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 123"
              className="input input-bordered w-full max-w-xs "
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-primary mt-4 w-full" onClick={joinRoom}>
            Join
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
