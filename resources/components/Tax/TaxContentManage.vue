<template>
  <q-card>
    <q-card-section class="bg-grey-2 text-bold">{{ label || 'Add/Edit Tax Contents' }}</q-card-section>
    <q-card-section class="row q-col-gutter-xs">
        <div class="col-sm-4 col-md-3 col-lg-2 col-xl-1" :class="colXSCls" v-for="(content,idx) in contents" :key="'tcm-' + idx">
          <q-card>
            <q-card-section class="text-bold bg-grey-1">{{ content.name }}</q-card-section>
            <q-card-section class="text-caption text-center text-weight-bold">
              {{ content.nature || '-' }}<br />{{ content.percent }}%
            </q-card-section>
            <q-card-actions align="right">
              <q-btn size="xs" icon="delete" color="negative" @click="remove(idx)" />
              <q-btn size="xs" icon="edit" color="warning" @click="edit(idx)" />
            </q-card-actions>
          </q-card>
        </div>
    </q-card-section>
    <q-card-actions class="bg-grey-1 q-px-md">
      <div class="col-12 q-col-gutter-xs row">
        <div class="col-3"><q-input dense outlined v-model="fresh.name" label="Name" /></div>
        <div class="col-3"><q-input dense outlined v-model="fresh.nature" label="Nature" /></div>
        <div class="col-3"><q-input dense outlined v-model.number="fresh.percent" type="number" label="Percent" /></div>
        <div class="col-3"><q-btn dense icon="add" color="secondary" class="full-width full-height" @click="add" /></div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "TaxContentManage",
  props: ['value','label'],
  data(){ return {
    contents: [], fresh: { name:'',percent:'',nature:'' }
  } },
  computed: {
    colXSCls(){ return 'col-xs-' + [12,6,4][_.toInteger(this.$q.screen.width/220)] },
  },
  methods: {
    add(){ this.contents.push(_.clone(this.fresh)); _.forEach(this.fresh,(v,n) => this.fresh[n] = '') },
    remove(idx){ return this.contents.splice(idx,1) },
    edit(idx){ return _.forEach(this.remove(idx)[0],(v,n) => this.fresh[n] = v) },
  },
  watch: {
    contents: {
      deep: true, immediate: true,
      handler(contents){ return this.$emit('input',contents) }
    },
    value: {
      deep: true, immediate: true,
      handler(contents){ this.contents = contents || [] }
    }
  }
}
</script>
