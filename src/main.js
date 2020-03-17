import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ls from './plugins/LocalStorageMaster.js'

Vue.config.productionTip = false
Vue.use(ls)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
