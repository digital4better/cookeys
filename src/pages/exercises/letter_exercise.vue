<template>
  <exercise name="Exercice 2" :words="words"/>
</template>

<script>
import Exercise from './components/Exercise.vue'

export default {
  components: {
    Exercise
  },
  data () {
    const data = this.$store.state.data
    return {
      words: [...data.letters]
    }
  }
}
</script>

<style scoped>
</style>
