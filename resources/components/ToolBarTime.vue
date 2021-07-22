<template>
  <q-toolbar-title class="gt-xs text-center">
    <span class="text-white text-subtitle2">{{ time }}</span>
  </q-toolbar-title>
</template>

<script>
import {time} from "assets/helpers";

export default {
  name: 'ToolBarTime',
  props: ['sec'],
  data(){ return {
    time: now(this.sec)
  } },
  watch: {
    time: {
      immediate: true,
      handler(){ setTimeout(vm => vm.time = now(vm.sec),(60 - ((this.sec === undefined) ? new Date().getSeconds() : 59))*1000,this) }
    }
  }
}

function now(sec){ return time(new Date().getTime()+'','x',sec !== undefined) }
</script>
