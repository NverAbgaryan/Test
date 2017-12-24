import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, 'http://localhost:3000',store);


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
