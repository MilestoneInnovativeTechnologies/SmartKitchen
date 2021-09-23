export default {
  methods: {
    pl_name({ price_list }){ return _.get(this.$store.state.prices.list,[price_list,'name']) },
    st_name({ seating }){ return _.get(this.$store.state.seating.data,[seating,'name']) },
    ct_name({ customer }){ return _.get(this.$store.state.customers.data,[customer,'name']) },
    it_total({ items }){ return _.sumBy(items,({ rate,quantity }) => _.toNumber(rate)*_.toNumber(quantity)) },
  }
}
