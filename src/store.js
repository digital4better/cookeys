import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    pitch: 1,
    rate: 1,
    voice: null,
    oralPreview: '',
    data: {}
  },
  mutations: {
    loadData (state) {
      // we shuffle the data arrays in the store
      state.data = require('@/data/exercises_content.json')
      for (const d in state.data) {
        state.data[d] = state.data[d].sort(() => Math.random() - 0.5)
      }
    },
    updateOralPreview (state, o) {
      state.oralPreview = o
    },
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
