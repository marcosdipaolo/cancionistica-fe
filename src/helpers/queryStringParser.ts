export const parseQS = (queryString: string) => {
  let qs:{[key: string]: string}  = {};
  const query = new URLSearchParams(queryString);
  for (let [ key, value ] of query) {
    qs[key] = value;
  }
  return qs;
}