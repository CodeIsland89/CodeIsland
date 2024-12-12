export default function findKeyByValue(dict, value) {
  const keys = Object.keys(dict);
  const result = keys.filter((key) => dict[key] === value);
  return result.length ? result[0] : null;
}
