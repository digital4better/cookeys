import Clock from '../components/clock.vue'

export default {
  components: { Clock },
  methods: {
    startWatch () {
      setTimeout(() => {
        this.$refs.clock.start()
      }, 60)
    },
    stopWatch () {
      this.$refs.clock.stop()
    },
    resetWatch () {
      this.$refs.clock.reset()
    }
  }
}
