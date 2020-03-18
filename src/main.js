import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ls from './plugins/LocalStorageMaster.js'
import modal from './plugins/ModalMaster.js'

Vue.config.productionTip = false
Vue.use(ls)
Vue.use(modal)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
