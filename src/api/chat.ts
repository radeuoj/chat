import { WebSocket, type Server } from "ws";
import { type ClientChatMessageEvent, type ClientEvent } from "./events/client";
import { type ServerChatMessageEvent, type ServerEvent } from "./events/server";

export function handleChat(ws: WebSocket, req: Express.Request, wss: Server) {
  ws.on('message', (msg) => {
    const event = JSON.parse(msg.toString()) as ClientEvent;

    if (event.type == "chat-message") {
      handleChatMessage(event, wss);
    }
  });
}

function handleChatMessage(event: ClientChatMessageEvent, wss: Server) {
  for (const client of wss.clients) {
    client.send(JSON.stringify({
      ...event
    } satisfies ServerChatMessageEvent));
  }
}