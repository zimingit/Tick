'use strict'
export default class Confirm {
  constructor (data) {
    this.label = (data || {}).label || 'Default label'
    this.description = (data || {}).description || 'Default description'
    this.action = {
      ...((data || {}).actions || {}),
      ok: { ...{ name: 'ok', do: function () {}, title: 'Confirm', icon: 'confirm', order: 10 }, ...((data || {}).actions || {}).ok || {} },
      cancel: { ...{ name: 'cancel', do: function () {}, title: 'Cancel', icon: 'undo', order: 20 }, ...((data || {}).actions || {}).cancel || {} }
    }
  }
}
