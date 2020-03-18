'use strict'
export default class Confirm {
  constructor (data) {
    this.label = (data || {}).label || 'Default label'
    this.text = (data || {}).text || 'Default description'
    this.ok = (data || {}).ok || function () {}
    this.cancel = (data || {}).cancel || function () {}
  }
}
