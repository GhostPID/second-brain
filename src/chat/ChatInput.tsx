import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  }

  return (
    <>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask your Second Brain..."
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
      />

      <button
        style={{
          width: "100%",
          marginTop: "10px",
        }}
        onClick={send}
      >
        Send
      </button>
    </>
  );
}