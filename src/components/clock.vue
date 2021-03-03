<template>
  <div class="clock" v-if="done">
  <span class="time">{{ time }}</span>
  </div>
</template>

<script>

var timeBegan = null
var timeStopped = null
var stoppedDuration = 0
var started = null
var running = false

export default {
  name: 'Clock',
  data () {
    return {
      time: '00:00:00.000',
      done: false
    }
  },
  methods: {
    start () {
      if (running) return
      if (timeBegan === null) {
        this.reset()
        timeBegan = new Date()
      }
      if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped)
      }
      started = setInterval(this.clockRunning, 10)
      running = true
    },
    stop () {
      running = false
      timeStopped = new Date()
      clearInterval(started)
      this.done = true
    },
    reset () {
      running = false
      clearInterval(started)
      stoppedDuration = 0
      timeBegan = null
      timeStopped = null
      this.time = '00:00:00.000'
    },
    clockRunning () {
      var currentTime = new Date()
      var timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)
      var hour = timeElapsed.getUTCHours()
      var min = timeElapsed.getUTCMinutes()
      var sec = timeElapsed.getUTCSeconds()
      var ms = timeElapsed.getUTCMilliseconds()

      this.time =
        this.zeroPrefix(hour, 2) + ':' +
        this.zeroPrefix(min, 2) + ':' +
        this.zeroPrefix(sec, 2) + '.' +
        this.zeroPrefix(ms, 3)
    },
    zeroPrefix (num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  }
}

</script>
