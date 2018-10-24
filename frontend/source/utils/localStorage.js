export const ls = Object.freeze({
  set(key, value) {
    const jsonValue = JSON.stringify(value)
    window.localStorage.setItem(key, jsonValue)
  },

  get(key) {
    const jsonValue = window.localStorage.getItem(key)
    try {
      return JSON.parse(jsonValue)
    }
    catch (error) {
      return error
    }

  },

  remove(key) {
    window.localStorage.removeItem(key)
  },

  clear() {
    window.localStorage.clear()
  }
})