import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    pitch: 0,
    rate: 0,
    voice: ''
  },
  mutations: {
    updatePitch (state, p) {
      state.pitch = p
    },
    updateRate (state, r) {
      state.rate = r
    },
    updateVoice (state, v) {
      state.voice = v
    }
  }
})
