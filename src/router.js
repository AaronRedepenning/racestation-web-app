import Vue from 'vue'
import Router from 'vue-router'

// Views
import Dashboard from './views/Dashboard'
import Run from './views/Run'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/run/:id',
      name: 'run',
      component: Run
    }
  ]
})
