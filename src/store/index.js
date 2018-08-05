import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    servo: [{
      range: [0, 20],
      middle: 43
    }, {
      range: [0, 20],
      middle: 19
    }, {
      range: [7, 9],
      middle: 0
    }],
    slider: {
      armstep: 0.03,
    },
    stream: {
      video: "${PROTOCOL}//${SERVER}:8080/?action=stream",
      // mavlink: "ws://${SERVER}:5001",
      mavlink: "ws://192.168.0.76:5001",
      command: "${PROTOCOL}//${SERVER}:${PORT}"
    },
    WindowSize: {
      width: 0,
      height: 0
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
    },
    windowSize(state, width, height) {
      state.WindowSize.width = width;
      state.WindowSize.height = height;
    }
  },
  getters: {
    videoStream(state) {
      return GenerateLocation(state.stream.video, "${PROTOCOL}//${SERVER}:8080?action=stream");
    },
    mavlinkStream(state) {
      return GenerateLocation(state.stream.mavlink, "ws://${SERVER}:5001");
    },
    commandStream(state) {
      return GenerateLocation(state.stream.command, "${PROTOCOL}//${SERVER}:${PORT}");
    }
  }
});

function GenerateLocation(url, defau) {
  if (!url) return GenerateLocation(defau);
  let result = url;
  let ReplaceKeys = {
    "${PROTOCOL}": window.location.protocol,
    "${SERVER}": window.location.hostname,
    "${PORT}": window.location.port
  };
  Object.keys(ReplaceKeys).forEach(key => {
    result = result.replace(key, ReplaceKeys[key])
  });
  return result;
}

const app = document.getElementById("app");
window.addEventListener("resize", () => {
  store.commit("windowSize", app.clientWidth, app.clientHeight);
})

export default store;
