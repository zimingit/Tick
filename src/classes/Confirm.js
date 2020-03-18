'use strict'
export default class Confirm {
  constructor (data) {
    this.label = (data || {}).label || 'Default label'
    this.description = (data || {}).description || 'Default description'
    this.action = {
      ...{ ok: function () {}, cancel: function () {} },
      ...((data || {}).action || {})
    }
  }
}
