import {mapState} from "vuex";
import {TokenProgressSeatStatus} from "assets/assets";
import Tokens from "assets/mixins/Tokens";
import {now} from "assets/helpers";

export default {
  mixins: [Tokens],
  computed: mapState('seating',{
    seats(state){
      let seatTokens = _.groupBy(this.tokens,'seating.id')
      return _(state.data).filter(['status','Active']).map(seat => Object.assign({},seat,{ tokens:this.activeTokens(_.get(seatTokens,seat.id,[])) },{ status:this.seatStatus(_.get(seatTokens,seat.id,[])) })).map(seat => Object.assign({},seat,{ slug:this.slug(seat) })).value()
    },
  }),
  methods: {
    activeTokens(tokens){
      return _.filter(tokens,({ progress,progress_timing }) => progress !== 'Paid' || _.toInteger(_.get(_.last(progress_timing),'time')) > (now() - 180))
    },
    seatStatus(tokens){
      if(_.isEmpty(tokens)) return 'Vacant';
      return TokenProgressSeatStatus[this.leastStatus(tokens)]
    },
    leastStatus(tokens){
      let statuses = ['Cancelled','Paid','Billed','Completed','Processing','New']
      return statuses[_.reduce(tokens,function (a,{ progress }){ let sIdx = statuses.indexOf(progress); return (sIdx > a) ? sIdx : a },0)]
    },
    slug(seat){
      let slug = []; slug.push(seat.name,seat.status);
      _.forEach(seat.tokens,token => {
        slug.push(token.progress,token.id);
        if(token.customer) slug.push(token.customer.name,token.customer.phone)
        if(token.waiter) slug.push(token.waiter.name)
      })
      return slug.join(' ').toLowerCase();
    }
  }
}
