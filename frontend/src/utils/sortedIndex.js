export function sortedIndex(a, item, low, high) {
  if (high <= low) return item > a[low] ? low + 1 : low;

  let mid = Math.floor((low + high) / 2);

  if (item == a[mid]) return mid + 1;

  if (item > a[mid]) return sortedIndex(a, item, mid + 1, high);

  return sortedIndex(a, item, low, mid - 1);
}
