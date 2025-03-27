import qs from 'qs';

export const parseUrl = (urlString) => {
  console.log("🚀 ~ file: url.js:4 ~ parseUrl ~ urlString:", urlString)
  const defaultParseUrl = {
    path: '/',
    query: {},
    hash: '',
  }
  if (!urlString) {
    return defaultParseUrl;
  }
  const url = new URL(urlString)
  

  const parsedURL = {
    path: url.pathname,
    query: url.search ? qs.parse(url.search.replace('?', '')) : {},
    hash: url.hash,
  }

  return parsedURL
}
