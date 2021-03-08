<template>
  <form id=form @submit.prevent>
    <div>
      <h1>Réglages</h1>
      <label id="rate">Vitesse d'élocution</label><input type="range" min="0.5" max="2" value="1" step="0.1" v-model="rate" id="rate">
      <div class="rate-value">{{ rate }}</div>
    </div>
    <div>
      <label id="pitch">Hauteur</label><input type="range" min="0" max="2" value="1" step="0.1" v-model="pitch" id="pitch">
      <div class="pitch-value">{{ pitch }}</div>
      <div class="clearfix"></div>
    </div>
    <select class="select" v-model="voiceSelect">
      <option v-for="option in options" :key="option.dataName">{{ option.dataName }}</option>
    </select>
    <div class="controls">
      <button id="play" @click="speak">Test</button>
    </div>
  </form>
</template>

<script>
var synth = window.speechSynthesis
var voices
export default {
  name: 'SpeechControls',
  data () {
    return {
      pitch: 1,
      rate: 1,
      voiceSelect: 'Google français',
      voiceTest: 'Bienvenue dans : Apprenti clavier',
      options: []
    }
  },
  mounted: function () {
    this.populateVoiceList()
    synth.addEventListener('voiceschanged', () => this.populateVoiceList())
  },
  methods: {
    populateVoiceList () {
      voices = synth.getVoices()
        .sort(function (a, b) {
          const aname = a.name.toUpperCase()
          const bname = b.name.toUpperCase()
          if (aname < bname) return -1
          else if (aname === bname) return 0
          else return +1
        })
      this.options = voices.map(voice => ({
        textContent: `${voice.name} (${voice.lang})`,
        dataName: voice.name
      }))
    },
    speak () {
      if (synth.speaking) {
        synth.cancel()
      }
      var utterThis = new SpeechSynthesisUtterance(this.voiceTest)
      utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend')
      }
      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror')
      }
      utterThis.voice = voices[0]
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].name === voiceselect) {
          utterThis.voice = voices[i]
          break
        }
      }
      this.$store.commit('updatePitch', this.pitch)
      this.$store.commit('updateRate', this.rate)
      this.$store.commit('updateVoice', utterThis.voice)
      utterThis.pitch = this.pitch
      utterThis.rate = this.rate
      synth.speak(utterThis)
    }
  }
}

</script>

<style scoped>
body, html {
  margin: 0;
}

html {
  height: 100%;
}

body {
  height: 90%;
  max-width: 800px;
  margin: 0 auto;
}

h1, p {
  font-family: sans-serif;
  text-align: center;
  padding: 20px;
}

.txt, select, form > div {
  display: block;
  margin: 0 auto;
  font-family: sans-serif;
  font-size: 16px;
  padding: 5px;
}

.txt {
  width: 80%;
}

select {
  width: 83%;
}

form > div {
  width: 81%;
}

.txt, form > div {
  margin-bottom: 10px;
  overflow: auto;
}

.clearfix {
  clear: both;
}

label {
  float: left;
  width: 10%;
  line-height: 1.5;
}

.rate-value, .pitch-value {
  float: right;
  width: 5%;
  line-height: 1.5;
}

#rate, #pitch {
  float: right;
  width: 81%;
}

.controls {
  text-align: center;
  margin-top: 10px;
}

.controls button {
  padding: 10px;
}
</style>
