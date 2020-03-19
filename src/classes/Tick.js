'use strict'
import Todo from './Todo.js'
export default class Tick {
  constructor (tick) {
    this.id = (tick || {}).id || new Date().getTime()
    this.created = (tick || {}).created || new Date()
    this.label = (tick || {}).label || ''
    this.color = (tick || {}).color || null
    this.todoList = ((tick || {}).todoList || []).map(data => new Todo(data))
    this.$versions = []
    this.$versionNumber = 0
    this.$silent = false
    return new Proxy(this, {
      set (target, name, value) {
        if (!target.$silent && !name.startsWith('$')) {
          target.createVersion()
        }
        target[name] = value
        return true
      }
    })
  }

  // Откатывает к следующей версии
  applyNextVersion () {
    if (this.$versions[this.$versionNumber + 1]) {
      this.$versionNumber += 1
    }
    this.applyVersion(this.$versionNumber)
  }

  // Откатывает к предыдущей версии
  applyPreviousVersion () {
    // Создаем версию, если происходит первый откат
    if (this.$versionNumber === this.$versions.length && this.$versions.length) {
      this.createVersion()
      this.$versionNumber -= 1
    }
    if (this.$versions[this.$versionNumber - 1]) {
      this.$versionNumber -= 1
    }
    this.applyVersion(this.$versionNumber)
  }

  // Применяем состояние указанной версии к текущему Tick
  applyVersion (v = 0) {
    const to = this.getVersion(v)
    this.$silent = true
    Object.keys(to).forEach(k => {
      this[k] = to[k]
    })
    this.$silent = false
  }

  // Получаем указанную версию по индексу
  getVersion (v) {
    if (this.$versions[v]) {
      return this.$versions[v]
    }
    return this
  }

  // Создаем версию
  createVersion () {
    const clone = { ...this }
    Object.keys(clone)
      .filter(k => k.startsWith('$'))
      .forEach(k => {
        delete clone[k]
      })
    this.$versions.push(clone)
    this.$versionNumber = this.$versions.length
  }

  get changed () {
    return !!this.$versions.length
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
