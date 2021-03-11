<template>
  <form id=form @submit.prevent>
    <div>
      <h1>Réglages</h1>
      <p>Vous pouvez régler la vitesse d'élocution, la hauteur et la langue de la voix dans l'application.</p>
      <p>Vous aurez un aperçu du rendu de la voix en appuyant sur le bouton Test.</p>
      </p>
      <label id="rate">Vitesse d'élocution</label><input type="range" min="0.5" max="2" value="1" step="0.1" v-model="rate" @focus="speakDelayed('Vitesse d\'élocution :' + rate)" id="rate">
      <div class="rate-value">{{ rate }}</div>
    </div>
    <div>
      <label id="pitch">Hauteur</label><input type="range" min="0" max="2" value="1" step="0.1" v-model="pitch" @focus="speakDelayed('Hauteur :' + pitch)" id="pitch">
      <div class="pitch-value">{{ pitch }}</div>
      <div class="clearfix"></div>
    </div>
    <select class="select" v-model="voiceSelect" @focus="speakDelayed('Choix de la langue')">
      <option v-for="option in options" :key="option.dataName">{{ option.dataName }}</option>
    </select>
    <div class="controls">
      <button id="play" @click="speak('Bienvenue dans : Apprenti clavier')">Test</button>
      <br>
      <b-button pill variant="primary" @click.prevent="saveAndLeave">Retour au menu principal</b-button>
    </div>
  </form>
</template>

<script>
import speakMixin from '../mixins/speakMixin'

var synth = window.speechSynthesis
var voices

export default {
  name: 'SpeechControls',
  mixins: [speakMixin],
  data () {
    return {
      pitch: '',
      rate: '',
      voice: null,
      voiceSelect: 'Google français',
      options: []
    }
  },
  mounted: function () {
    this.populateVoiceList()
    synth.addEventListener('voiceschanged', () => this.populateVoiceList())
    this.speak('Vous pouvez régler la vitesse d\'élocution, la hauteur et la langue de la voix dans l\'application. Vous aurez un aperçu du rendu de la voix en appuyant sur le bouton Test.')
  },
  watch: {
    $route (to, from){
      synth.cancel()
    }
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
      this.pitch = this.$store.state.pitch
      this.rate = this.$store.state.rate
    },
    speak (oral) {
      if (synth.speaking) {
        synth.cancel()
      }
      if (oral != ''){
        var utterThis = new SpeechSynthesisUtterance(oral)
        utterThis.onend = function (event) {
          console.log('SpeechSynthesisUtterance.onend')
        }
        utterThis.onerror = function (event) {
          console.error('SpeechSynthesisUtterance.onerror')
        }
        for (var i = 0; i < voices.length; i++) {
          if (voices[i].name === this.voiceSelect) {
            this.voice = voices[i]
            break
          }
        }
        this.store()
        utterThis.pitch = this.pitch
        utterThis.rate = this.rate
        utterThis.voice = this.voice
        synth.speak(utterThis)
      }
    },
    speakDelayed (oral) {
      setTimeout(() => this.speak(oral), 1500)
    },
    store () {
      this.$store.commit('updatePitch', this.pitch)
      this.$store.commit('updateRate', this.rate)
      this.$store.commit('updateVoice', this.voice)
    },
    saveAndLeave () {
      this.store()
      this.$router.push('/')
    }
  }
}

</script>

<style scoped>

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
  display: flex;
  align-items: center;
  flex-flow: wrap column;
  text-align: center;
  margin-top: 10px;
}

.controls button {
  padding: 10px;
}

.home-button{
  padding: 50px;
}
</style>
