<template>
  <form id=form @submit.prevent>
    <div>
      <h1>Réglages</h1>
      <p>Réglez la vitesse d'élocution et la hauteur de la voix dans l'application. Déplacez le curseur avec les flèches pour augmenter ou diminuer ces paramètres.
      <p>Pour changer la langue, positionnez vous sur la liste déroulante, tapez Entrée, naviguez avec les flèches puis sélectionnez la langue souhaitée avec la touche Entrée.</p>
      <p>Vous avez un aperçu du rendu de la voix en appuyant sur le bouton Test.</p>
      </p>
      <label id="rate">Vitesse d'élocution</label><input type="range" min="0.5" max="2" value="1" step="0.1" v-model="rate" @focus="speak('Vitesse d\'élocution :' + rate)" id="rate">
      <div class="rate-value">{{ rate }}</div>
    </div>
    <div>
      <label id="pitch">Hauteur</label><input type="range" min="0" max="2" value="1" step="0.1" v-model="pitch" @focus="speak('Hauteur :' + pitch)" id="pitch">
      <div class="pitch-value">{{ pitch }}</div>
      <div class="clearfix"></div>
    </div>
    <select class="select" v-model="voiceSelect" @focus="speak('Choix de la langue')">
      <option v-for="option in options" :key="option.dataName">{{ option.dataName }}</option>
    </select>
    <div class="controls">
      <button id="play" @click="speak('Bienvenue dans : Apprenti clavier')">Test</button>
      <br>
      <b-button pill variant="primary" @click.prevent="$router.push('/')">Retour au menu principal</b-button>
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
    speak (oral) {
      if (synth.speaking) {
        synth.cancel()
      }
      var utterThis = new SpeechSynthesisUtterance(oral)
      utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend')
      }
      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror')
      }
      utterThis.voice = voices[0]
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].name === this.voiceSelect) {
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
