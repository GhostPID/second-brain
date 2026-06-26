import { useEffect, useState } from "react";
import type { Bookmark } from "../types/bookmark";
import {
  getAllBookmarks,
  saveBookmark,
  deleteBookmark,
} from "../storage/bookmarkRepository";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  async function refresh() {
    setBookmarks(await getAllBookmarks());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function add(bookmark: Bookmark) {
    await saveBookmark(bookmark);
    await refresh();
  }

  async function remove(id: string) {
    await deleteBookmark(id);
    await refresh();
  }

  return {
    bookmarks,
    add,
    remove,
    refresh,
  };
}