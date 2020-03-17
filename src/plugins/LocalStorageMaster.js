import Tick from '../classes/Tick'
const ls = {
  getAllTicks () {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('tick_'))
      .map(key => this.get(key))
  },
  set (data) {
    localStorage.setItem(data.key, JSON.stringify(data))
  },
  get (key) {
    const data = localStorage.getItem(key)
    return data ? new Tick(JSON.parse(data)) : data
  },
  remove (data) {
    localStorage.removeItem(data.key)
  }
}

export default {
  install (Vue) {
    Vue.prototype.$ls = ls
  }
}
