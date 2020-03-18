import Tick from '../classes/Tick'
import Todo from '../classes/Todo'
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
  },
  generateDefaultData () {
    const data = [
      {
        id: new Date().getTime(),
        label: 'Edit Tick',
        color: '#98c400',
        todoList: [
          new Todo({ description: 'Click on Tick' }),
          new Todo({ description: 'Toggle first goal' })
        ]
      },
      {
        id: new Date().getTime() + 1,
        label: 'Create Tick',
        color: '#009688',
        todoList: [
          new Todo({ description: 'Click on "add" button' }),
          new Todo({ description: 'Fill in the fields and create task' })
        ]
      },
      {
        id: new Date().getTime() + 2,
        label: 'Pick a Color',
        color: '#2196f3',
        todoList: [
          new Todo({ description: 'Click on "add" button or edit Tick' }),
          new Todo({ description: 'Pick a color from left side' })
        ]
      }
    ]
    data.forEach(tick => this.set(new Tick(tick)))
  }
}

export default {
  install (Vue) {
    Vue.prototype.$ls = ls
  }
}
