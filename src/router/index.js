import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tick from '../views/Tick.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // Допустимы query sort=asc/desc
    props: route => ({ ...route.query, ...route.params }),
    component: Home
  },
  {
    path: '/Tick/:id',
    props: true,
    name: 'Tick',
    component: Tick
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
