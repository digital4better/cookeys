export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      },
    },
  },
  beforeRouteLeave (to, from , next) {
    this.resetWatch()
    next()
  }
}