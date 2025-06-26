export function randomQueryString() {
  return `_r=${Math.random().toString(36).substring(2, 10)}`;
}