"use client";

import { useEffect, useState } from "react";
import io from "Socket.io-client";
let socket;

const Home = () => {
  const [input, setInput] = useState<string>("");
  const [receivedMsg, setReceivedMsg] = useState<string[]>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    // listening for incoming msg
    socket.on("update-input", (msg) => {
      setReceivedMsg((prevMsg) => [...prevMsg, msg]);
    });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const handleMessage = () => {
    socket.emit("input-change", input);
    setInput("");
  };

  return (
    <>
      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />

      <button onClick={handleMessage}>submit</button>

      {receivedMsg &&
        receivedMsg?.map((msg, i) => (
          <p key={i} className="bg-red-300 m-8">
            {msg}
          </p>
        ))}
    </>
  );
};

export default Home;
