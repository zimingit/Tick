'use strict'
import Todo from './Todo.js'
/** Class representing a Tick. */
class Tick {
  /**
   * Create a Tick
   * @param {Object} todo - The Tick value
   * @returns {Object} The Tick proxying value
   */
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

  /**
   * Откатывает версию Tick к следующей (если возможно).
   */
  static applyNextVersion () {
    if (this.$versions[this.$versionNumber + 1]) {
      this.$versionNumber += 1
    }
    this.applyVersion(this.$versionNumber)
  }

  /**
   * Откатывает версию Tick к предыдущей (если возможно).
   */
  static applyPreviousVersion () {
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

  /**
   * Применяет указанную версию к Tick
   * @param {Number} v - Индекс версии
   */
  static applyVersion (v = 0) {
    const to = this.getVersion(v)
    this.$silent = true
    Object.keys(to).forEach(k => {
      this[k] = to[k]
    })
    this.$silent = false
  }

  /**
   * Получаем указанную версию по индексу
   * @param {Number} v - Индекс версии
   * @returns {Object} Запрошенная версия или текущий Tick
   */
  static getVersion (v) {
    if (this.$versions[v]) {
      return this.$versions[v]
    }
    return this
  }

  /**
   * Создает версию Tick исходя из текущего состояния
   */
  static createVersion () {
    const clone = { ...this }
    Object.keys(clone)
      .filter(k => k.startsWith('$'))
      .forEach(k => {
        delete clone[k]
      })
    this.$versions.push(clone)
    this.$versionNumber = this.$versions.length
  }

  /**
   * Get Cостояние изменен/изменен
   * @type {Boolean}
   */
  get changed () {
    return !!this.$versions.length || this.todoList.filter(todo => todo.$changed).length
  }

  /**
   * Get Короткий список Todo до 4х элементов
   * @type {Array}
   */
  get shortTodoList () {
    return this.uncompleteToComplete.slice(0, 4)
  }

  /**
   * Get Список всех незавершенных Todo
   * @type {Array}
   */
  get uncomplete () {
    return this.todoList.filter(todo => !todo.checked)
  }

  /**
   * Get Список всех завершенных Todo
   * @type {Array}
   */
  get complete () {
    return this.todoList.filter(todo => todo.checked)
  }

  /**
   * Get Список всех Todo от незавршенных к завершенным
   * @type {Array}
   */
  get uncompleteToComplete () {
    return [...this.uncomplete, ...this.complete]
  }

  /**
   * Get Список всех Todo от завршенных к незавершенным
   * @type {Array}
   */
  get completeToUncomplete () {
    return this.uncompleteToComplete.reverse()
  }

  /**
   * Get Ключ для обращения к LocalStorage
   * @type {String}
   */
  get key () {
    return `tick_${this.id}`
  }
}

export default Tick
