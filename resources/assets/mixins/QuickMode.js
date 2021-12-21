export default {
  computed: {
    quick: {
      get(){ return _.get(this.$store.state.public,'quick',settings('quick')) },
      set(quick){ this.$store.commit('public',{ quick }) },
    }
  }
}
