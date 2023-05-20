
const getCache = (key) => {
 return window.localStorage.getItem(key)
}

function setCache (key, value) {
 window.localStorage.setItem(key, value)
}

function removeCache (key) {
 window.localStorage.removeItem(key)
}

export { getCache, setCache, removeCache }