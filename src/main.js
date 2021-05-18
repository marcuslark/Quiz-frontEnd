import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase'
import store from './store'
//import './assets/scss/app.scss'

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})