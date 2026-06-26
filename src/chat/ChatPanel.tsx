import { askSecondBrain } from "../ai/chatService";
import { generateAnswer } from "../ai/answer";
import { retrieveBookmarks } from "../ai/retrieve";
import { useState } from "react";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

import type { ChatMessageType } from "./types";
import type { Bookmark } from "../types/bookmark";

type Props = {
  bookmarks: Bookmark[];
};

export default function ChatPanel({ bookmarks }: Props) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  console.log(bookmarks);
async function handleSend(text: string){
    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    const answer = await askSecondBrain(
      text,
      bookmarks
    );

    const assistantMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: answer,
      timestamp: Date.now(),
    };
        setMessages((prev) => [
          ...prev,
          userMessage,
          assistantMessage,
        ]);
      }

  return (
    <div
      style={{
        marginTop: "20px",
        borderTop: "1px solid #333",
        paddingTop: "20px",
      }}
    >
      <h3>AI Assistant</h3>

      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
        />
      ))}

      <ChatInput onSend={handleSend} />
    </div>
  );
}