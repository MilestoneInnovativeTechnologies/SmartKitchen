<template>
  <q-btn flat round dense icon="save_alt" class="" @click="openURL('/data/download_import_template')" />
</template>

<script>
import {openURL} from "quasar";

export default {
  name: "ReportControlDown",
  methods: {
    openURL,
  }
}
</script>
