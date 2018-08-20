// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import mavlink from "./classes/mavplugin"
import gamepad from "./classes/gamePadplugin"
import store from "./store"

Vue.use(VueSocketio, store.getters.commandStream);
Vue.use(mavlink, {
  // logger: console,
  url: store.getters.mavlinkStream
});
Vue.use(gamepad);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
