<template>
  <q-page padding>
    <OrderNewGlobal :seat="seat" v-bind="$attrs" :type="type" />
    <q-dialog :value="m_show" persistent><MenuSelect :style="popup_width" :type="type" /></q-dialog>
  </q-page>
</template>

<script>
import MenuSelect from "components/Menu/MenuSelect";
import OrderNewGlobal from "components/Order/OrderNewGlobal";
import {popup_width} from "assets/helpers";

export default {
  name: "PageOrderNew",
  components: { OrderNewGlobal, MenuSelect },
  props: ['seat','type'],
  computed: {
    type_menu(){ return _.snakeCase([(this.type || 'Dining'),'Menu'].join(' ')) },
    popup_width(){ return popup_width() },
    m_show(){ return !_.size(_.get(this.$store.state.public,this.type_menu)) },
  }
}
</script>
