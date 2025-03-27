export const sleep = (ms, defaultTime = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms || defaultTime));
}