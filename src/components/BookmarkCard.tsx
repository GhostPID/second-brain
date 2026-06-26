import type { Bookmark } from "../types/bookmark";

type BookmarkCardProps = {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
  onSelectTag: (tag: string) => void;
};

export default function BookmarkCard({
  bookmark,
  onDelete,
  onSelectTag,
}: BookmarkCardProps) {
  return (
    <div
      style={{
        border: "1px solid #333",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <strong>{bookmark.title}</strong>

      <br />

      <a
        href={bookmark.url}
        target="_blank"
        rel="noreferrer"
      >
        {bookmark.url}
      </a>

      <div
        style={{
          fontSize: "12px",
          opacity: 0.7,
          marginTop: "6px",
        }}
      >
        {bookmark.content
          ? bookmark.content.slice(0, 120)
          : "No content extracted"}
        ...
      </div>

      <div
        style={{
          marginTop: "8px",
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        {(bookmark.tags ?? []).map((tag) => (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              padding: "4px 8px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <button
        style={{
          marginTop: "10px",
        }}
        onClick={() => onDelete(bookmark.id)}
      >
        Delete
      </button>
    </div>
  );
}