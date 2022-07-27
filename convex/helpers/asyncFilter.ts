// https://stackoverflow.com/a/67780184
const asyncFilter = async <T>(
  list: T[],
  predicate: (t: T) => Promise<boolean>
) => {
  const resolvedPredicates = await Promise.all(list.map(predicate));
  return list.filter((item, idx) => resolvedPredicates[idx]);
};

export default asyncFilter;
