'use strict'
export default class Todo {
  constructor (todo) {
    this.checked = (todo || {}).checked || false
    this.description = (todo || {}).description || ''
    this.key = (todo || {}).description || 'new'
  }
}
