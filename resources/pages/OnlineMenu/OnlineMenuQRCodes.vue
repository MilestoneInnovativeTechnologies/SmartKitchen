<template>
  <q-page padding class="q-gutter-y-xs">
    <div class="row q-col-gutter-xs items-center">
      <div class="col-6"><q-input v-model.number="size" type="number" outlined label="QRCode Size" /></div>
      <div class="col-6"><DateTime outlined label="Valid Until (clear for unlimited validity)" v-model="validity" clearable /></div>
      <div class="col-xs-12 col-md-4"><MenuSelectDropDown v-model="menu" get="id" outlined /></div>
      <div class="col-xs-6 col-md-4"><PriceListSelectDropDown :readonly="enable_order && type === 'Dining'" label="Select Price List" v-model="price_list" get="id" outlined /></div>
      <div class="col-xs-6 col-md-4" v-if="GH75F === 'Yes'"><q-toggle size="lg" v-model="enable_order" checked-icon="check" unchecked-icon="clear" color="primary" label="Enable Ordering from online menu" /></div>
    </div>
    <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="row q-col-gutter-xs items-center q-mt-xs" v-if="enable_order">
        <div class="col-6"><OrderTypeSelectDropDown v-model="type" :skip="['Other','Remote']" outlined /></div>
        <div class="col-6" v-if="type === 'Home Delivery'"><OrderCustomer v-model="customer" get="id" outlined /></div>
        <template v-if="type === 'Dining'">
          <div class="col-6"><q-select v-model="all_tables" :options="['Yes','No']" label="For All Tables" outlined /></div>
          <div class="col-12"><SeatSelectDropDown :readonly="all_tables === 'Yes'" v-model="seating" get="id" outlined :name="({ name }) => name" /></div>
        </template>
      </div>
    </transition>
    <q-btn label="Generate" color="primary" padding="md lg" class="full-width" @click="generate" />
    <div class="row q-col-gutter-xs q-mt-xs" v-show="qr_codes.length">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" v-for="(qr_code,idx) in qr_codes" :key="'olm-qrcode-'+idx">
        <q-card>
          <q-bar class="bg-primary text-white text-caption q-py-lg">{{ qr_code[0] }}<q-space /><q-btn icon="get_app" flat round @click="download(idx)" /></q-bar>
          <q-card-section class="text-center"><QrcodeVue :value="qr_code[1]" :size="size" level="M" :ref="'QR'+idx" /></q-card-section>
          <q-card-section class="bg-grey-2 text-primary text-center text-caption"><q-btn type="a" :href="qr_code[1]" :label="qr_code[0]" dense flat size="sm" no-caps target="_blank" /></q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import MenuSelectDropDown from "components/Menu/MenuSelectDropDown";
import OrderTypeSelectDropDown from "components/Order/OrderTypeSelectDropDown";
import OrderCustomer from "components/Order/OrderCustomer";
import PriceListSelectDropDown from "components/Price/PriceListSelectDropDown";
import SeatSelectDropDown from "components/Seating/SeatSelectDropDown";
import DateTime from "components/DateTime";
import {next_month} from "assets/helpers";
import {mapState} from "vuex";
import { host } from 'assets/firebase_config'
import {BRANCH_CODE} from "boot/subscription";
const { GH75F,JI36A } = require('boot/subscription').FEATURES
export default {
  name: 'PageOnlineMenuQRCodes',
  components: { DateTime, SeatSelectDropDown, PriceListSelectDropDown, OrderCustomer, OrderTypeSelectDropDown, MenuSelectDropDown, QrcodeVue },
  data(){ return {
    GH75F,
    menu: null, type: null, customer: null, price_list: null, seating: null, size: 300,
    validity: next_month('YYYY-MM-DD HH:mm:ss'), enable_order: false, all_tables: 'Yes',
    qr_codes: [], url: [(JI36A ? host : _.trimEnd(LOGIN.replace('login','menu'),'/')),('#'),(JI36A || 'local'),""].join('/')
  } },
  computed: mapState({ seats: state => state.seating.data, customers: state => state.customers.data, menus: state => state.menus.data, pls: state => state.prices.list }),
  methods: {
    encode(data){ return this.url + encodeURI(btoa(JSON.stringify(Object.assign({},data,{ validity:this.validity,branch:BRANCH_CODE })))) },
    generate(){ this.qr_codes.splice(0,this.qr_codes.length)
      if(!this.enable_order || GH75F === 'No') this.qr_codes.push([_.get(this.menus,[this.menu,'name'],"").replaceAll('menu','') + ' Menu QR Code',this.encode({ menu:this.menu,price_list:this.price_list })])
      else {
        let params = [{ type:this.type,price_list:this.price_list,menu:this.menu }], titles = [_.get(this.pls,[this.price_list,'name']) + ' Price List ' + this.type + ' QR Code'];
        if(this.type === 'Home Delivery') { params[0]['customer'] = this.customer; titles[0] = titles[0] + ' for ' + _.get(this.customers,[this.customer,'name'])  }
        if(this.type === 'Dining') {
          delete params[0]['price_list'];
          if(this.all_tables === 'No') { params[0]['seating'] = this.seating; titles[0] = _.get(this.seats,[this.seating,'name']) + ' Dining QR Code' }
          if(this.all_tables === 'Yes'){
            let PureParams = _.clone(params[0]);
            _(this.seats).filter(['status','Active']).forEach(function(seat,idx){
              titles[idx] = seat.name + ' Dining QR Code';
              if(idx === 0) params[idx]['seating'] = seat.id;
              else params.push(_.set(_.clone(PureParams),'seating',seat.id))
            })
          }
        }
        _.forEach(params,(param,idx) => this.qr_codes.push([titles[idx],this.encode(param)]))
      }
    },
    download(idx){
      let canvas = this.$refs['QR' + idx][0].$el.children[0], link = document.createElement('a'), name = _.startCase(this.qr_codes[idx][0]).replace(/\s/g,'');
      link.setAttribute('download', `${name}.png`)
      link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"))
      link.click();
    }
  }
}

</script>
