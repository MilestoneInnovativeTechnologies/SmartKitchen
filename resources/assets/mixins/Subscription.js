import { VALID_UPTO_REMAINS } from 'boot/subscription'

const DAYS_TO_EXPIRE = _.toInteger(Math.abs(VALID_UPTO_REMAINS)/86400)

export default {
  data(){ return {
    VALID_UPTO_REMAINS, EXPIRED: VALID_UPTO_REMAINS < 0,
    DAYS_TO_EXPIRE, NOTIFY_DURATION: 25,
    SUBSCRIBE_HIDE_LOGIN: (DAYS_TO_EXPIRE < 6),
    HIDE_ALTER_WAIT: 10000, interval: null
  } },
  computed: {
    SUBSCRIPTION_NOTIFY(){ return this.DAYS_TO_EXPIRE < this.NOTIFY_DURATION },
  },
  created() {
    if(this.SUBSCRIBE_HIDE_LOGIN) {
      this.HIDE_ALTER_WAIT = (DAYS_TO_EXPIRE > 3) ? 2500 : (2500+((4-DAYS_TO_EXPIRE)*1000))
      this.interval = setInterval(vm => {
        vm.HIDE_ALTER_WAIT -= 1000
        if(vm.HIDE_ALTER_WAIT <= 0){
          clearInterval(this.interval);
          vm.SUBSCRIBE_HIDE_LOGIN = false
        }
      },1000,this)
    }
  }
}
