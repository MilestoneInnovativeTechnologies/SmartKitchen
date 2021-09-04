<template>
  <q-page padding>
    <OrderNewGlobal :seat="seat" v-bind="$attrs" />
    <q-dialog v-model="m_show" persistent><MenuSelect :style="popup_width" /></q-dialog>
  </q-page>
</template>

<script>
import MenuSelect from "components/Menu/MenuSelect";
import OrderNewGlobal from "components/Order/OrderNewGlobal";
import {popup_width} from "assets/helpers";

export default {
  name: "PageOrderNew",
  components: { OrderNewGlobal, MenuSelect },
  props: ['seat'],
  computed: {
    popup_width(){ return popup_width() },
    m_show: {
      get() { return !this.$store.state.menus.s_items.length },
      set() { },
    }
  }
}
</script>
