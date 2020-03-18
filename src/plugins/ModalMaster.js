import Vue from 'vue'
import Modal from '../Modal/Modal.vue'

const modal = {
  create (data) {
    const container = createDivInBody()
    new Vue({
      ...Modal,
      props: {
        data: {
          type: Object,
          default: () => data
        }
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
