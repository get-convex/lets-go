// A custom typeguard that can be used to filter null values out of an array.
function notNull<T>(val: T | null): val is T {
  return val !== null;
}

export default notNull;
