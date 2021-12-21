<template>
  <div class="row justify-around">
    <div class="col-3 q-gutter-xs column">
      <NumericKey label="1" class="col" @click="keypress" />
      <NumericKey label="4" class="col" @click="keypress" />
      <NumericKey label="7" class="col" @click="keypress" />
      <NumericKey :label="keys[0]" class="col" @click="keypress" />
    </div>
    <div class="col-3 q-gutter-xs column">
      <NumericKey label="2" class="col" @click="keypress" />
      <NumericKey label="5" class="col" @click="keypress" />
      <NumericKey label="8" class="col" @click="keypress" />
      <NumericKey label="0" class="col" @click="keypress" />
    </div>
    <div class="col-3 q-gutter-xs column">
      <NumericKey label="3" class="col" @click="keypress" />
      <NumericKey label="6" class="col" @click="keypress" />
      <NumericKey label="9" class="col" @click="keypress" />
      <NumericKey :icon="keys[1]" class="col" @click="keypress" />
    </div>
    <div class="col-3 q-gutter-xs column">
      <NumericKey :icon="keys[2]" class="col-3" @click="keypress" />
      <NumericKey :icon="keys[3]" class="col" @click="keypress" :disabled="disabled || !value" />
    </div>
  </div>
</template>

<script>
import NumericKey from "components/NumericKey";
export default {
  name: "NumericKeypad",
  components: {NumericKey},
  props: ['value','disabled'],
  data(){ return {
    keys: ['C','backspace','forward','subdirectory_arrow_left']
  } },
  computed: {
    number: {
      get(){ return this.value },
      set(n){ this.$emit('input',_.toNumber(n)||0) },
    }
  },
  methods: {
    keypress(n){
      if(n === this.keys[0]) return this.clear();
      if(n === this.keys[1]) return this.number = _.toString(this.number).substr(0,_.size(_.toString(this.number))-1)
      if(n === this.keys[2]) return this.$emit('done',this.number)
      if(n === this.keys[3]) return this.$emit('enter',this.number)
      this.number = _.toString(this.number) + _.toString(n)
    },
    clear(){ this.number = '' },
    docListen(e){
      if([0,1,2,3,4,5,6,7,8,9,'0','1','2','3','4','5','6','7','8','9'].includes(e.key)) return this.keypress(_.toInteger(e.key))
      if(['Enter','+','=','Tab'].includes(e.key) && !e.ctrlKey) return this.keypress(this.keys[3])
      if(['Enter','\n'].includes(e.key) && e.ctrlKey) return this.keypress(this.keys[2])
      if(['b','B','Backspace'].includes(e.key)) return this.keypress(this.keys[1])
      if(['c','C','Delete','Escape'].includes(e.key)) return this.keypress(this.keys[0])
    },
    docListenKeyup(e){ if(['Backspace','Delete','Escape','Tab'].includes(e.key)) this.docListen(e) },
    eventManage(eFn){
      if(!this.$q.platform.is.desktop) return;
      eFn('keypress',this.docListen); eFn('keyup',this.docListenKeyup)
    }
  },
  created() { this.eventManage(document.addEventListener) },
  beforeDestroy() { this.eventManage(document.removeEventListener) },
}
</script>
