export default {
  mounted: function() {
    this.initContent();
    this.speak(this.consigne);
    this.initKey();
    this.startWatch();
  },
  computed: {
    hasMadeErrors() {
      return this.keyErrors > 1;
    },
    hasMadeOneError() {
      return this.keyErrors === 1;
    },
    isEnd() {
      return this.keys.length === 0 && this.success === true;
    }
  },
  methods: {
    checkKey(e) {
      // TODO: Fix Alt Gr evaluation
      const modifierCodes = [18, 27, 21];
      // we cancel the default action of the pressed key to not loose the focus
      if (modifierCodes.includes(e.keyCode)) {
        e.preventDefault();
      }
      console.log(e);
      this.attempts++;
      if (e.code !== this.key.code) {
        this.errorFeedBack();
        this.error = true;
        e.target.value = "";
        this.keyErrors++;
        this.totalErrors++;
      } else {
        this.error = false;
        this.success = true;
        if (this.keys.length !== 0) {
          this.changeKey(e);
        } else {
          this.congrat();
          this.stopWatch();
        }
      }
      this.value = e.target.value;
      this.score = (
        ((this.attempts - this.totalErrors) / this.attempts) *
        100
      ).toFixed(0);
    },
    initKey() {
      this.success = false;
      this.error = false;
      if (this.keys.length > 0) {
        this.key = this.keys.shift();
      }
      setTimeout(() => this.speak(this.key.name), 4000);
    },
    changeKey(e) {
      this.keyErrors = 0;
      e.target.value = "";
      this.value = "";
      if (this.keys.length > 0) {
        this.key = this.keys.shift();
        setTimeout(() => this.speak(this.key.name), 600);
      }
      this.success = false;
      this.error = false;
    }
  }
};
