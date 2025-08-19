export type ClientChatMessageEvent = {
  type: "chat-message",
  text: string,
}

export type ClientEvent = ClientChatMessageEvent;