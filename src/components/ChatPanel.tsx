export default function ChatPanel() {
  return (
    <div
      style={{
        marginTop: "20px",
        borderTop: "1px solid #333",
        paddingTop: "15px",
      }}
    >
      <h3>AI Assistant</h3>

      <p
        style={{
          opacity: 0.6,
          fontSize: "14px",
        }}
      >
        Ask anything about your saved knowledge.
      </p>

      <input
        placeholder="Ask your Second Brain..."
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
      />

      <button
        style={{
          marginTop: "10px",
          width: "100%",
        }}
      >
        Send
      </button>
    </div>
  );
}