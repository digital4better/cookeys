import Clock from '../components/clock.vue'

export default {
  components: { Clock },
  methods: {
    startWatch () {
      this.$refs.clock.start()
    },
    stopWatch () {
      this.$refs.clock.stop()
    },
    resetWatch () {
      this.$refs.clock.reset()
    }
  }
}
