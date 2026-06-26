import type { ChatMessageType } from "./types";

type Props = {
  message: ChatMessageType;
};

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          background: isUser ? "#2563eb" : "#222",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "80%",
        }}
      >
        {message.content}
      </div>
    </div>
  );
}