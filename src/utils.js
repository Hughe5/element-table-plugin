const { toString } = Object.prototype

const isPlainObj = (val) => {
  return toString.call(val) === '[object Object]'
}

export { isPlainObj }
