import type { Bookmark } from "../types/bookmark";

export function generateAnswer(results: Bookmark[]): string {
  if (results.length === 0) {
    return "I couldn't find any relevant bookmarks.";
  }

  let answer = `I found ${results.length} relevant bookmark`;

  if (results.length > 1) {
    answer += "s";
  }

  answer += ":\n\n";

  results.forEach((bookmark, index) => {
    answer += `${index + 1}. ${bookmark.title}\n`;
    answer += `${bookmark.url}\n\n`;
  });

  return answer;
}