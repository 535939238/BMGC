import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        servo: [
            [20,100],
            [0,100],
            [0,100]
        ]
    }
})