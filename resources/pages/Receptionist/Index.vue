<template>
  <q-page padding class="flex flex-center">
    <a :href="'http://sk/logout?token=' + token">Logout</a>
  </q-page>
</template>

<script>
export default {
  name: "PageChefIndex",
  data(){ return { token: new URLSearchParams(document.location.search.substring(1)).get('token') } },
  created(){
    this.$store.commit('title','Receptionist')
  }
}
</script>
