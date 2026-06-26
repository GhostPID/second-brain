import { openDB } from "idb";

export const dbPromise = openDB("second-brain", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("bookmarks")) {
      db.createObjectStore("bookmarks", {
        keyPath: "id",
      });
    }
  },
});

export async function getDB() {
  return dbPromise;
}