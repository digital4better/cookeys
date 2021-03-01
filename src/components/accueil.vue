<template>
  <div>
    <section class="landing-page">
      <header class="header">
        <h1>Accueil</h1>
      </header>
      <router-link to="/exercise" tag="b-button">Commencer autrement</router-link>
      <b-button pill variant="primary" @click.prevent="$router.push('exercise')">Commencer !</b-button>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      text: ''
    }
  },
  methods: {
  },

  computed: {
  }
}
</script>
