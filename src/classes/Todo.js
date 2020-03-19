'use strict'
export default class Todo {
  constructor (todo) {
    this.checked = (todo || {}).checked || false
    this.description = (todo || {}).description || ''
    this.key = (todo || {}).description || 'new'
    this.$changed = false
    return new Proxy(this, {
      set (target, name, value) {
        target.$changed = true
        target[name] = value
        return true
      }
    })
  }
}
