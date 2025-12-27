import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Chat } from "./Chat";
import music from "./mixkit-tile-game-reveal-960.wav";

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  // ✅ Keep socket instance stable
  const socketRef = useRef(null);

  // ✅ Keep audio instance stable
  const notificationRef = useRef(new Audio(music));

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const joinChat = () => {
    if (!username || !room) return;

    socketRef.current.emit("join_room", room);
    setShowChat(true);

    // play sound safely
    notificationRef.current.currentTime = 0;
    notificationRef.current.play().catch(() => {});
  };

  return (
    <>
      {!showChat ? (
        <div className="join_room">
          <h1>Join Chat</h1>

          <input
            type="text"
            placeholder="Enter Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Chat Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />

          <button onClick={joinChat}>Join</button>
        </div>
      ) : (
        <Chat
          socket={socketRef.current}
          username={username}
          room={room}
        />
      )}
    </>
  );
};

export default App;
