import type { Bookmark } from "../types/bookmark";
import { searchBookmarks } from "../search/fuzzySearch";

export function retrieveBookmarks(
  query: string,
  bookmarks: Bookmark[]
) {
  return searchBookmarks(bookmarks, query).slice(0, 5);
}