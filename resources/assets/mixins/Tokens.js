import {mapState} from "vuex";

export default {
  computed: mapState({
    tokens({ tokens:{ data,items },seating,prices:{ list },users,customers }){
      return _(data).map(token => Object.assign({},token,{
        items: _.map(_.get(items,token.id),this.tokenItemMap),
        seating: _.get(seating['data'],token.seating),
        price_list: _.get(list,token.seating),
        waiter: _.get(users['data'],token.user),
        customer: _.get(customers['data'],token.customer),
        progress: this.tokenProgress(token)
      })).value()
    },
    tokens_remote(){ return _.filter(this.tokens,({ type,id }) => type === 'Remote' && !this.$store.getters['remote/is']('tokens',parseInt(id))) },
    tokens_own(){ return _.filter(this.tokens,({ type,id }) => type !== 'Remote' || !this.$store.getters['remote/is']('tokens',parseInt(id))) },
  }),
  methods: {
    tokenItemMap(item){ return Object.assign({},item,{
      item: _.get(this.$store.state.items,['data',item.item]),
      user: _.get(this.$store.state.users,['data',item.user]),
      kitchen: _.get(this.$store.state.kitchens,['data',item.kitchen]),
    })},
    tokenProgress({ id,progress }){
      if(progress !== 'Billed') return progress;
      let bill = _.find(this.$store.state.bills.data,({ token,progress }) => progress !== 'Cancelled' && token === id);
      if(!bill) return progress;
      return bill.progress;
    }
  }
}
