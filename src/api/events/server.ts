export type ServerChatMessageEvent = {
  type: "chat-message",
  text: string,
}

export type ServerEvent = ServerChatMessageEvent;