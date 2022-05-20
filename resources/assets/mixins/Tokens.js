import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters('tokens',['tokens']),
    tokens_remote(){ return _.filter(this.tokens,({ type,id }) => type === 'Remote' && !this.$store.getters['remote/is']('tokens',parseInt(id))) },
    tokens_own(){ return _.filter(this.tokens,({ type,id }) => type !== 'Remote' || !this.$store.getters['remote/is']('tokens',parseInt(id))) },
  },
}
