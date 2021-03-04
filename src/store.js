import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    pitch: 1,
    rate: 1,
    voice: null
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
