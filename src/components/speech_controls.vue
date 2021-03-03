<template>
  <form id=form>
    <div>
      <label id="rate">Rate</label><input type="range" min="0.5" max="2" value="1" step="0.1" v-model="rate" id="rate">
      <div class="rate-value">{{ rate }}</div>
      <div class="clearfix"></div>
    </div>
    <div>
      <label id="pitch">Pitch</label><input type="range" min="0" max="2" value="1" step="0.1" v-model="pitch" id="pitch">
      <div class="pitch-value">{{ pitch }}</div>
      <div class="clearfix"></div>
    </div>
    <select v-model="voiceSelect">

    </select>
    <div class="controls">
      <button id="play" type="submit">Test</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SpeechControls',
  data () {
    return {
      pitch: 1,
      rate: 1,
      voiceSelect: null
    }
  },
  methods: {
    populateVoiceList () {
      voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase()
        const bname = b.name.toUpperCase()
        if (aname < bname) return -1
        else if (aname === bname) return 0
        else return +1
      })
      var selectedIndex = this.voiceSelect.selectedIndex < 0 ? 0 : this.voiceSelect.selectedIndex
      this.voiceSelect.innerHTML = ''
      for (var i = 0; i < voices.length; i++) {
        var option = document.createElement('option')
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')'
        if (voices[i].default) {
          option.textContent += ' -- DEFAULT'
        }

        option.setAttribute('data-lang', voices[i].lang)
        option.setAttribute('data-name', voices[i].name)
        this.voiceSelect.appendChild(option)
      }
      this.voiceSelect.selectedIndex = selectedIndex
    }
  }
}

var synth = window.speechSynthesis

// var inputTxt = document.querySelector('.txt');
// var voiceSelect = document.querySelector('select');

// var pitch = document.querySelector('#pitch');
// var pitchValue = document.querySelector('.pitch-value');
// var rate = document.querySelector('#rate');
// var rateValue = document.querySelector('.rate-value');

var voices = []

/*
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
} */
/* function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
} */
/*

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

this.voiceSelect.onchange = function(){
  speak();
}
*/
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
