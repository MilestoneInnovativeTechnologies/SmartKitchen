<template>
  <q-page padding>
    <AdministratorDashboardMetricsMain />
    <div class="col-12 text-bold q-mt-md">Masters</div>
    <div class="row q-col-gutter-xs q-mt-xs">
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_customer' }" icon="groups" text="Customers" />
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_prop' }" icon="speaker_notes" text="Item Props" />
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_item' }" icon="category" text="Items" />
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_group' }" icon="attractions" text="Item Groups" />
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_kitchen' }" icon="countertops" text="Kitchens" />
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_kitchen_items' }" icon="lunch_dining" text="Kitchen Items" />
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_menu' }" icon="menu_book" text="Menu" />
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_price_list' }" icon="money" text="Price Lists" />
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_seating' }" icon="event_seat" text="Seating" />
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_tax' }" icon="legend_toggle" text="Tax" />
      <AdministratorMenuItem :color="color[0]" :route="{ name:'master_settings' }" icon="settings_applications" text="Settings" />
    </div>
    <div class="col-12 text-bold q-mt-md">Images</div>
    <div class="row q-col-gutter-xs q-mt-xs">
      <AdministratorMenuItem :color="color[1]" :route="{ name:'image_customer' }" icon="groups" text="Customers" />
      <AdministratorMenuItem :color="color[1]" :route="{ name:'image_item' }" icon="category" text="Items" />
      <AdministratorMenuItem :color="color[1]" :route="{ name:'image_kitchen' }" icon="countertops" text="Kitchens" />
      <AdministratorMenuItem :color="color[1]" :route="{ name:'image_seating' }" icon="event_seat" text="Seating" />
      <AdministratorMenuItem :color="color[1]" :route="{ name:'image_user' }" icon="supervised_user_circle" text="Users" />
    </div>
    <div class="col-12 text-bold q-mt-md">Users</div>
    <div class="row q-col-gutter-xs q-mt-xs">
      <AdministratorMenuItem :color="color[2]" :route="{ name:'master_user',params:{ role:'Administrator' } }" icon="psychology" text="Administrators" />
      <AdministratorMenuItem :color="color[2]" :route="{ name:'master_user',params:{ role:'Receptionist' } }" icon="support_agent" text="Receptionist" />
      <AdministratorMenuItem :color="color[2]" :route="{ name:'master_user',params:{ role:'Waiter' } }" icon="supervised_user_circle" text="Waiters" />
      <AdministratorMenuItem :color="color[2]" :route="{ name:'master_user',params:{ role:'Chef' } }" icon="engineering" text="Chefs" />
      <AdministratorMenuItem :color="color[2]" :route="{ name:'master_user',params:{ role:'Delivery Boy' } }" icon="delivery_dining" text="Delivery Boy" />
    </div>
    <div class="col-12 text-bold q-mt-md">Data</div>
    <div class="row q-col-gutter-xs q-mt-xs">
      <AdministratorMenuItem :color="color[3]" :route="{ name:'data_import' }" icon="source" text="Import" />
    </div>
    <template v-if="GH56E === 'Yes'">
      <div class="col-12 text-bold q-mt-md">Online Menu</div>
      <div class="row q-col-gutter-xs q-mt-xs">
        <AdministratorMenuItem :color="color[4]" :route="{ name:'menu_qr_codes' }" icon="qr_code" text="Label" />
        <AdministratorMenuItem :color="color[4]" :route="{ name:'menu_sync_data' }" icon="sync" text="Sync Data" v-if="JI36A" />

      </div>
    </template>
  </q-page>
</template>

<script>
import AdministratorDashboardMetricsMain from "components/Administrator/AdministratorDashboardMetricsMain";
import Jumbotron from "components/Jumbotron";
import AdministratorMenuItem from "components/Administrator/AdministratorMenuItem";
const { GH56E,JI36A } = require('boot/subscription').FEATURES
export default {
  name: 'PageAdministratorIndex',
  components: {AdministratorMenuItem, Jumbotron, AdministratorDashboardMetricsMain},
  data(){ return {
    color: ['accent','info','secondary','brown','deep-orange'],
    GH56E,JI36A
  } },
  created(){ this.$store.commit('public',{ mode:'administration' }) }
}
</script>
