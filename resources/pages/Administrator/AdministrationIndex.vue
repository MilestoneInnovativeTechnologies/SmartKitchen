<template>
  <q-page padding>
    <AdministratorDashboardMetricsMain />
    <div class="col-12 text-bold q-mt-md">Masters</div>
    <div class="row q-col-gutter-xs q-mt-xs">
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_customer' })" icon="groups" text="Customers" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_prop' })" icon="speaker_notes" text="Item Props" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_item' })" icon="category" text="Items" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_group' })" icon="attractions" text="Item Groups" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_kitchen' })" icon="countertops" text="Kitchens" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_kitchen_items' })" icon="lunch_dining" text="Kitchen Items" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_menu' })" icon="menu_book" text="Menu" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_price_list' })" icon="money" text="Price Lists" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_seating' })" icon="event_seat" text="Seating" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_tax' })" icon="legend_toggle" text="Tax" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="accent" style="text-align: center" @click.native="$router.push({ name:'master_settings' })" icon="settings_applications" text="Settings" /></div>
    </div>
    <div class="col-12 text-bold q-mt-md">Images</div>
    <div class="row q-col-gutter-xs q-mt-xs">
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="info" style="text-align: center" @click.native="$router.push({ name:'image_customer' })" icon="groups" text="Customers" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="info" style="text-align: center" @click.native="$router.push({ name:'image_item' })" icon="category" text="Items" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="info" style="text-align: center" @click.native="$router.push({ name:'image_kitchen' })" icon="countertops" text="Kitchens" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="info" style="text-align: center" @click.native="$router.push({ name:'image_seating' })" icon="event_seat" text="Seating" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="info" style="text-align: center" @click.native="$router.push({ name:'image_user' })" icon="supervised_user_circle" text="Users" /></div>
    </div>
    <div class="col-12 text-bold q-mt-md">Users</div>
    <div class="row q-col-gutter-xs q-mt-xs">
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="secondary" style="text-align: center" @click.native="$router.push({ name:'master_user',params:{ role:'Administrator' } })" icon="psychology" text="Administrators" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="secondary" style="text-align: center" @click.native="$router.push({ name:'master_user',params:{ role:'Receptionist' } })" icon="support_agent" text="Receptionist" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="secondary" style="text-align: center" @click.native="$router.push({ name:'master_user',params:{ role:'Waiter' } })" icon="supervised_user_circle" text="Waiters" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="secondary" style="text-align: center" @click.native="$router.push({ name:'master_user',params:{ role:'Chef' } })" icon="engineering" text="Chefs" /></div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"><Jumbotron :dark="true" color="secondary" style="text-align: center" @click.native="$router.push({ name:'master_user',params:{ role:'Delivery Boy' } })" icon="delivery_dining" text="Delivery Boy" /></div>
    </div>
  </q-page>
</template>

<script>
import AdministratorDashboardMetricsMain from "components/Administrator/AdministratorDashboardMetricsMain";
import Jumbotron from "components/Jumbotron";
export default {
  name: 'PageAdministratorIndex',
  components: {Jumbotron, AdministratorDashboardMetricsMain},
  created(){ this.$store.commit('public',{ mode:'administration' }) }
}
</script>
