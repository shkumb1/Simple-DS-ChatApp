import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      flushSync(() => {
        setMessageList((list) => [...list, data]);
      });
    });
  }, []);

  return (
    <div className="inline-block my-auto text-center bg-base-200 p-10 rounded-lg bg-opacity-90">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList
            .slice(Math.max(messageList.length - 5, 0))
            .map((messageContent, i) => {
              return (
                <div
                  className={`chat ${
                    username === messageContent.author
                      ? "chat-start"
                      : "chat-end"
                  }`}
                  key={`${messageContent.message}-${i}`}
                >
                  <div className="chat-header">
                    {messageContent.author}
                    <time className="text-xs opacity-50 ml-2 ">
                      {messageContent.time}
                    </time>
                  </div>
                  <div
                    className={`chat-bubble mt-2 text-base-300 ${
                      username === messageContent.author
                        ? "bg-primary"
                        : "bg-info"
                    }`}
                  >
                    {messageContent.message}
                  </div>
                </div>
              );
            })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          className="input input-bordered w-full max-w-xs input-primary mt-4"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
      </div>
    </div>
  );
}

export default Chat;
