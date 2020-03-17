'use strict'
export default class Tick {
  constructor (tick) {
    this.id = (tick || {}).id || new Date().getTime()
    this.created = (tick || {}).created || new Date()
    this.label = (tick || {}).label || ''
    this.color = (tick || {}).color || null
    this.todoList = (tick || {}).todoList || []
  }

  // Короткий список todo для вывода в карточку
  get shortTodoList () {
    return this.uncompleteToComplete.slice(0, 4)
  }

  // Список незавершенных
  get uncomplete () {
    return this.todoList.filter(todo => !todo.checked)
  }

  // Список завершенных
  get complete () {
    return this.todoList.filter(todo => todo.checked)
  }

  // Список от незавршенных к завершенным
  get uncompleteToComplete () {
    return [...this.uncomplete, ...this.complete]
  }

  // Список от завершенных к незавершенным
  get completeToUncomplete () {
    return this.uncompleteToComplete.reverse()
  }

  // Ключ для обращения к LocalStorage
  get key () {
    return `tick_${this.id}`
  }
}
