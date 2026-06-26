import type { Bookmark } from "../types/bookmark";

import { retrieveBookmarks } from "./retrieve";
import { generateAnswer } from "./answer";

export async function askSecondBrain(
  question: string,
  bookmarks: Bookmark[]
) {
  const results = retrieveBookmarks(
    question,
    bookmarks
  );

  return generateAnswer(results);
}