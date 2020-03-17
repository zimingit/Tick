'use strict'
export default class Tick {
  constructor (tick) {
    this.id = (tick || {}).id || new Date().getTime()
    this.created = (tick || {}).created || new Date()
    this.label = (tick || {}).label || ''
    this.color = (tick || {}).color || null
    this.todoList = (tick || {}).todoList || []
  }

  get shortTodoList () {
    return this.todoList.slice(0, 2)
  }

  get key () {
    return `tick_${this.id}`
  }
}
