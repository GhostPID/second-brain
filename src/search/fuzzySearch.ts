import Fuse from "fuse.js";
import type { Bookmark } from "../types/bookmark";

export function searchBookmarks(
  bookmarks: Bookmark[],
  query: string
) {
  if (!query.trim()) {
    return bookmarks;
  }

  const fuse = new Fuse(bookmarks, {
    keys: [
      "title",
      "url",
      "content"
    ],
    threshold: 0.4,
    includeScore: true,
  });

  return fuse.search(query).map(
    result => result.item
  );
}