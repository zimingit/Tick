export default class Tick {
  'use strict'
  constructor (tick) {
    this.id = tick.id || new Date().getTime()
    this.label = tick.label || 'Some label'
    this.color = tick.color || null
    this.todoList = tick.todoList || []
  }

  get shortTodoList () {
    return this.todoList.slice(0, 2)
  }

  get key () {
    return `tick_${this.id}`
  }
}
