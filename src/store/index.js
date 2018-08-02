import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    servo: [
      [0, 20],
      [0, 20],
      [0, 20]
    ],
    slider: {
      armstep: 0.1,
      tankspeed: 0.4
    }
  },
  mutations: {
    armstep(state, val) {
      state.slider.armstep = val
    },
    tankspeed(state, val) {
      state.slider.tankspeed = val;
    },
    init(state, setting) {
      Object.keys(setting).forEach(key => {
        state[key] = setting[key]
      });
    }
  }
})
