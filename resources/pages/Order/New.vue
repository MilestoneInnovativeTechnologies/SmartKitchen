<template>
  <q-page padding>
    <OrderNewGlobal type="Dining" :user="$route.meta.me.id" :seat="true" />
    <q-dialog v-model="m_show" persistent><MenuSelect style="width: 75vw; max-width: 330px" @selected="r_menu = false" /></q-dialog>
  </q-page>
</template>

<script>
import MenuSelect from "components/Menu/MenuSelect";
import OrderNewGlobal from "components/Order/OrderNewGlobal";

export default {
  name: "PageOrderNew",
  components: { OrderNewGlobal, MenuSelect },
  data() { return {
    r_menu: false,
  } },
  computed: {
    m_show: {
      get(){ return !this.$store.state.menus.s_items.length || this.r_menu },
      set(s){ this.r_menu = !!s }
    }
  },
  created() { this.r_menu = this.m_show; }
}
</script>
