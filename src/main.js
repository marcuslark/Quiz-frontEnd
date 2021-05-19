import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyBpKD1tJ5iFPtwqJnJdgJa-oQNBqHJOHCY",
  authDomain: "vue-auth-yt-8fa7c.firebaseapp.com",
  projectId: "vue-auth-yt-8fa7c",
  storageBucket: "vue-auth-yt-8fa7c.appspot.com",
  messagingSenderId: "547564533065",
  appId: "1:547564533065:web:8d08747da121724ea61698"
};

firebase.initializeApp(firebaseConfig);



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
