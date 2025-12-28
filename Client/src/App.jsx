<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Chat } from "./Chat";
import music from "./mixkit-tile-game-reveal-960.wav";
=======
import React, { useState } from 'react'
import io from 'socket.io-client'
import { Chat } from './Chat'
import music from './mixkit-tile-game-reveal-960.wav';


const socket = io();

>>>>>>> ae6b094 (Production ready deployment)

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

<<<<<<< HEAD
  const socketRef = useRef(null);
  const notificationRef = useRef(new Audio(music));

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["polling", "websocket"], // ✅ REQUIRED for Render
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
=======
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false)

  const notification = new Audio(music)

  const joinChat = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
      notification.play();
    }
  };
>>>>>>> ae6b094 (Production ready deployment)

  const joinChat = () => {
    if (!username || !room) return;

    socketRef.current.emit("join_room", room);
    setShowChat(true);

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
        <Chat socket={socketRef.current} username={username} room={room} />
      )}
<<<<<<< HEAD
=======
      {
        showChat &&
        (
          <Chat socket={socket} username={username} room={room} />

        )
      }
>>>>>>> ae6b094 (Production ready deployment)
    </>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App
>>>>>>> ae6b094 (Production ready deployment)
