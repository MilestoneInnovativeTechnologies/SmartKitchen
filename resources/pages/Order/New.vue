<template>
  <q-page padding>
    <OrderNewGlobal :seat="seat" v-bind="$attrs" />
    <q-dialog :value="m_show" persistent><MenuSelect :style="popup_width" /></q-dialog>
  </q-page>
</template>

<script>
import MenuSelect from "components/Menu/MenuSelect";
import OrderNewGlobal from "components/Order/OrderNewGlobal";
import {popup_width} from "assets/helpers";
import {mapState} from "vuex";

export default {
  name: "PageOrderNew",
  components: { OrderNewGlobal, MenuSelect },
  props: ['seat'],
  computed: {
    popup_width(){ return popup_width() },
    ...mapState('menus',{ m_show:state => !state.s_items.length })
  }
}
</script>
