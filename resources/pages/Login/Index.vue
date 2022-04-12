<template>
  <q-page padding class="flex-center flex column">
    <q-card flat>
      <q-card-section v-show="errorShow && errorMsg" class="text-red-10 text-center text-uppercase text-bold">{{ errorMsg }}, Please try again</q-card-section>
      <q-card-section class="q-pa-none" v-show="!SUBSCRIBE_HIDE_LOGIN">
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <component :is="components[login]" :style="styles[login]" />
        </transition>
      </q-card-section>
      <q-card-section class="q-pb-none q-pt-xs text-caption text-center text-grey-4">Milestone Smart Kitchen - v{{ version }}</q-card-section>
    </q-card>
    <SubscriptionExpiring />
    <div v-if="SUBSCRIBE_HIDE_LOGIN" style="font-size: 5rem" class="text-weight-bolder text-red">{{ parseInt(HIDE_ALTER_WAIT/1000) }}</div>
  </q-page>
</template>

<script>
import LoginPassword from "components/Login/LoginPassword";
import LoginPin from "components/Login/LoginPin";
import DisplayBoards from "components/Login/DisplayBoards";
import SubscriptionExpiring from "components/Login/SubscriptionExpiring";
import Subscription from "assets/mixins/Subscription";
import { version } from 'assets/constants'
export default {
  name: "PageLoginIndex",
  components: {SubscriptionExpiring, DisplayBoards, LoginPin, LoginPassword},
  mixins: [Subscription],
  data(){ return {
    styles: { pin:{ maxWidth:'330px',width:'90vw' },password:{ maxWidth:'330px',width:'90vw' },display:{ width:'680px' } },
    components: { pin:'LoginPin',password:'LoginPassword',display:'DisplayBoards' },
    errorShow: true, version,
  } },
  computed: {
    login(){ return this.$store.state.public.login || 'pin' },
    errorMsg(){ return (location.search && location.search.substr(0,5) === '?msg=') ? decodeURI(location.search.substr(5)) : '' },
  },
  created() {
    if(this.errorMsg) setTimeout(vm => vm.errorShow = false,7000,this)
  },
}
</script>
