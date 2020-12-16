import Vue from "vue";

export function sync (state,timeOut) {
  clearInterval(state.timeOut);
  Vue.set(state,'timeOut',timeOut)
}
