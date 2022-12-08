var synth = window.speechSynthesis;

export default {
  methods: {
    mapspecialChar(value) {
      switch (value) {
        case ",":
          return "Virgule";
        case ".":
          return "Point";
        case "!":
          return "Point d'exclamation";
        case "?":
          return "Point d'interrogation";
        case "'":
          return "Apostrophe";
        case " ":
          return "Espace";
        case ":":
          return "Deux points";
        case ";":
          return "Point virgule";
        case "-":
          return "Trait d'union";
        default:
          return value;
      }
    },
    speak(oral) {
      if (synth.speaking) {
        synth.cancel();
      }
      if (oral !== "") {
        const utterThis = new SpeechSynthesisUtterance(
          this.mapspecialChar(oral)
        );
        utterThis.onend = function(event) {
          console.log("SpeechSynthesisUtterance.onend");
        };
        utterThis.onerror = function(event) {
          console.error("SpeechSynthesisUtterance.onerror");
        };
        utterThis.voice = this.$store.state.voice;
        utterThis.pitch = this.$store.state.pitch;
        utterThis.rate = this.$store.state.rate;
        synth.speak(utterThis);
      }
    },
    stopSpeech() {
      synth.cancel();
    },
    speakDelayed(oral) {
      setTimeout(() => this.speak(oral), 1100);
    }
  }
};
