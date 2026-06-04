import { useEffect, useState } from "react";
import type { Bookmark } from "./types/bookmark";
import {
  getBookmarks,
  saveBookmark,
  deleteBookmark,
} from "./storage/bookmarks";

export default function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  function loadBookmarks() {
    setBookmarks(getBookmarks());
  }

  useEffect(() => {
    loadBookmarks();
  }, []);

  function handleAddBookmark() {
    const bookmark: Bookmark = {
      id: crypto.randomUUID(),
      title: `Test Bookmark ${bookmarks.length + 1}`,
      url: "https://example.com",
      createdAt: Date.now(),
    };

    saveBookmark(bookmark);
    loadBookmarks();
  }

  function handleDelete(id: string) {
    deleteBookmark(id);
    loadBookmarks();
  }

  return (
    <div
      style={{
        width: "350px",
        minHeight: "500px",
        background: "#111",
        color: "#fff",
        padding: "16px",
      }}
    >
      <h1>Second Brain</h1>

      <button onClick={handleAddBookmark}>
        Add Test Bookmark
      </button>

      <input
        id="search"
        name="search"
        placeholder="Search bookmarks..."
        style={{
          width: "100%",
          marginTop: "12px",
          padding: "8px",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        {bookmarks.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              style={{
                border: "1px solid #333",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <strong>{bookmark.title}</strong>

              <div>{bookmark.url}</div>

              <button
                onClick={() =>
                  handleDelete(bookmark.id)
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}