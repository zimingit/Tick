const ls = {
  getAllTicks () {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('tick_'))
      .map(key => this.get(key))
  },
  set (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },
  get (key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : data
  },
  remove (key) {
    localStorage.removeItem(key)
  }
}

export default {
  install (Vue) {
    Vue.prototype.$ls = ls
  }
}
