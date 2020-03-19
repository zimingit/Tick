import Vue from 'vue'
import Modal from '../Modal/Modal.vue'
import Confirm from '../classes/Confirm.js'

const modal = {
  create (data) {
    const container = createDivInBody()
    new Vue({
      ...Modal,
      data: {
        data: new Confirm(data)
      }
    }).$mount(container)
  }
}

const createDivInBody = () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  return div
}

export default {
  install (Vue) {
    Vue.prototype.$modal = modal
  }
}
