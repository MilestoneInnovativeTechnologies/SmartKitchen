<template>
  <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer">
    <Jumbotron :dark="true" :color="color" style="text-align: center" @click.native="$router.push(route)" :icon="icon" :text="text" />
  </div>
</template>

<script>
import Jumbotron from "components/Jumbotron";
export default {
  name: "AdministratorMenuItem",
  components: {Jumbotron},
  props: ['color','route','icon','text']
}
</script>
