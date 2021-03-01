<template>
<div>
  <router-view/>
</div>
</template>

<script>
import Accueil from './components/accueil.vue'
import Exercise from './components/exercise.vue'
import Speech from './components/speech.vue'

export default {
  components: {
    Accueil,
    Exercise,
    Speech
  }
}
</script>
