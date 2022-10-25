// A custom typeguard that can be used to filter null values out of an array.
export default function notNull<T>(val: T | null): val is T {
  return val !== null;
}
