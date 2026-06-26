import { extractTags } from "./utils/extractTags"; 
import { searchBookmarks } from "./search/fuzzySearch"; //Fuse.js
import { useState } from "react";
import type { Bookmark } from "./types/bookmark";
import { useBookmarks } from "./hooks/useBookmarks";
import BookmarkCard from "./components/BookmarkCard";
import ChatPanel from "./chat/ChatPanel";


export default function App() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] =
  useState<string | null>(null);

  const {
    bookmarks,
    add,
    remove,
} = useBookmarks();
  
 async function handleAddBookmark() {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const currentTab = tabs[0];
  if (
  !currentTab?.url ||
  currentTab.url.startsWith("chrome://")
) {
  alert("This page cannot be saved.");
  return;
}
  const [{ result }] = await chrome.scripting.executeScript({
  target: { tabId: currentTab.id! },
  func: () => document.body.innerText,
  });

  const content = result ?? "";

  if (!currentTab?.url) {
    return;
  }
   const tags = extractTags(
  currentTab.title || "",
  content
  );
  const bookmark: Bookmark = {
    id: crypto.randomUUID(),
    title: currentTab.title || "Untitled",
    url: currentTab.url,
    favicon: currentTab.favIconUrl,
    content,
    tags,
    createdAt: Date.now(),
  };

  await add(bookmark);
 }
  async function handleDelete(id: string) {
    await remove(id);
  }

  const filteredBookmarks = searchBookmarks(
    bookmarks,
    search
  ).filter(bookmark =>
    !selectedTag ||
    (bookmark.tags ?? []).includes(selectedTag)
  );

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
        Save Page
      </button>

      <input
        id="search"
        name="search"
        placeholder="Search bookmarks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          marginTop: "12px",
          padding: "8px",
        }}
      />

      {selectedTag && (
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          Filtering by:

          <button
            onClick={() => setSelectedTag(null)}
            style={{
              marginLeft: "8px",
            }}
          >
            {selectedTag} ✕
          </button>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        {filteredBookmarks.length === 0 ? (
          <p>No bookmarks found.</p>
        ) : (
          filteredBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={handleDelete}
              onSelectTag={setSelectedTag}
            />
            
          ))
        )}
        <hr
          style={{
            margin: "20px 0",
            borderColor: "#333",
          }}
        />

        <ChatPanel bookmarks={bookmarks} />
      </div>
    </div>
  );
}