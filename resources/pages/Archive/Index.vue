<template>
  <q-page padding>
    <div class="row q-col-gutter-xs">
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer" v-for="archive in archives" :key="'archive-index-' + archive">
        <Jumbotron :dark="true" color="primary" style="text-align: center" @click.native="$router.push({ name:'archive_' + archive.toLowerCase() })" :text="archive" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { Archives as archives } from "assets/assets";
import Jumbotron from "components/Jumbotron";

export default {
  name: 'PageArchiveIndex',
  components: {Jumbotron},
  data(){ return {
    archives
  } },
}
</script>
