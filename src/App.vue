<template>
<div>
  <router-view/>
</div>
</template>

<script>
import Accueil from './components/accueil.vue'
import KeyExercise from './components/key_exercise.vue'
import LetterExercise from './components/letter_exercise.vue'
import WordExercise from './components/word_exercise.vue'
import Clock from './components/clock.vue'

export default {
  components: {
    Accueil,
    KeyExercise,
    LetterExercise,
    WordExercise,
    Clock
  }
}
</script>
