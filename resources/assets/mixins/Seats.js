import {mapState} from "vuex";
import {TokenProgressSeatStatus} from "assets/assets";

export default {
  computed: mapState({
    seats({ seating: { data },tokens,prices: { list },users,customers }){ let seatTokens = _.keyBy(tokens.data,'seating'); return _.map(data,seat => {
      let sid = _.toInteger(seat.id), token = _.get(seatTokens,sid); if(!token) return Object.assign({},seat,{ status:'Vacant' });
      return this.seatToken(seat,token,list[token.price_list],_.get(users,['data',token.user]),_.get(customers,['data',token.customer]))
    }) },
  }),
  methods: {
    seatToken(seat, { id,date,progress },price,waiter,customer){
      progress = (progress === 'Billed' && _.get(this.bills,id) === 'Paid') ? 'Paid' : progress
      return Object.assign({},seat,_.zipObject(['token','price','user','waiter','customer_id','customer','phone','progress','date','status'],[id,price.name,_.get(waiter,'id'),_.get(waiter,'name'),_.get(customer,'id'),_.get(customer,'name'),_.get(customer,'phone'),progress,date,TokenProgressSeatStatus[progress]]));
    }
  }
}
