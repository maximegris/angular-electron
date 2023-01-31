export function normalizeIndex(value: number, arrayLength: number) {
  if (value >= arrayLength) {
    value = value % arrayLength;
  } else if (value < 0) {
    value = arrayLength - 1;
  }

  return value;
}
