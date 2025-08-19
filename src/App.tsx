import { useEffect, useRef, useState } from "react";
import Message from "./components/Message";
import MessageBox from "./components/MessageBox";
import { type ServerEvent } from "./api/events/server";
import type { ClientChatMessageEvent } from "./api/events/client";

type MessageData = {
  text: string,
}

export default function App() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const con = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("/api/chat");

    ws.addEventListener("message", (msg) => {
      const event = JSON.parse(msg.data) as ServerEvent;

      if (event.type == "chat-message") {
        addMessage({ text: event.text });
      }
    });

    con.current = ws;
    return () => { 
      ws.close();
      con.current = null;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const cb = () => scrollToBottom();
    messagesContainerRef.current?.addEventListener("resize", cb);
    return () => messagesContainerRef.current?.removeEventListener("resize", cb);
  }, []);

  function scrollToBottom() {
    if (messagesContainerRef.current != null)
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }

  function addMessage(msg: MessageData) {
    setMessages(m => [...m, msg]);
  }

  function handleSendMessage(msg: string) {
    msg = msg.trim();
    if (msg == "")
      return;

    con.current?.send(JSON.stringify({
      type: "chat-message",
      text: msg,
    } satisfies ClientChatMessageEvent));
  }

  function handleMessageBoxFocus() {
    scrollToBottom();
  }

  return (
    <main className="flex justify-center h-svh">
      <div className="max-w-200 flex-1 flex flex-col p-2">
        <div ref={messagesContainerRef} className="flex-1 overflow-auto flex flex-col gap-2 p-2">
          {messages.map((m, i) => <Message key={i}>{ m.text }</Message>)}
        </div>
        <MessageBox onSend={handleSendMessage} onFocus={handleMessageBoxFocus} />
      </div>
    </main>
  );
}