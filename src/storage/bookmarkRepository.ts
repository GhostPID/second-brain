import { getDB } from "./database";
import type { Bookmark } from "../types/bookmark";

export async function getAllBookmarks() {
  const db = await getDB();

  return db.getAll("bookmarks");
}

export async function saveBookmark(bookmark: Bookmark) {
  const db = await getDB();

  const all = await db.getAll("bookmarks");

  const exists = all.some(
    b => b.url === bookmark.url
  );

  if (exists) return;

  await db.put("bookmarks", bookmark);
}

export async function deleteBookmark(id: string) {
  const db = await getDB();

  await db.delete("bookmarks", id);
}