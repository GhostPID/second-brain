const KEYWORDS = [
  "react",
  "javascript",
  "typescript",
  "frontend",
  "backend",
  "linux",
  "python",
  "ai",
  "machine learning",
  "database",
  "medicine",
  "psychology",
  "flutter",
  "dart",
  "github",
];

export function extractTags(
  title: string,
  content: string
): string[] {
  const text =
    `${title} ${content}`.toLowerCase();

  return KEYWORDS.filter(keyword =>
    text.includes(keyword.toLowerCase())
  );
}