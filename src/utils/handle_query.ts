export function updateQueryStringManually(query: string, key: string, value?: string): string {

  // console.log("query updateQueryStringManually>>> ", query)
  // console.log("key updateQueryStringManually>>> ", key)
  // console.log("value updateQueryStringManually>>> ", value)

  const pairs = query.split('&').filter(Boolean); // loại bỏ phần tử rỗng
  let updated = false;

  const newPairs = pairs.map(pair => {
    const [k, v] = pair.split('=');
    if (k === key) {
      updated = true;
      return value ? `${key}=${value}` : ''; // nếu value rỗng thì xóa
    }
    if (k === 'page') {
      return 'page=1'; // reset lại page
    }
    return pair;
  }).filter(Boolean); // loại bỏ phần tử rỗng

  if (!updated && value) {
    newPairs.push(`${key}=${value}`);
  }

  // đảm bảo page=1 có tồn tại
  const hasPage = newPairs.some(pair => pair.startsWith('page='));
  if (!hasPage) {
    newPairs.unshift('page=1');
  }

  return newPairs.join('&');
}
