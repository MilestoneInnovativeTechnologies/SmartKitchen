<template>
  <q-page padding>
    <WaiterMenuManage class="q-mx-auto" style="width: 90vw" />
  </q-page>
</template>

<script>
import WaiterMenuManage from "components/Menu/WaiterMenuManage";
export default {
  name: 'PageWaiterMenu',
  components: {WaiterMenuManage},
}
</script>
