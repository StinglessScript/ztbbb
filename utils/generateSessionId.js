export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const generateSessionId = (storeChannel) => {
  const name = storeChannel
  const time = new Date().getTime()
  const numberRd = randomIntFromInterval(100, 999)
  return `${name}-${time}-${numberRd}`
}
