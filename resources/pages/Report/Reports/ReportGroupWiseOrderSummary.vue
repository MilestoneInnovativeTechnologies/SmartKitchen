<template>
  <q-page padding>
    <ReportCard title="Group Wise Order Summary" :head="head" :table="table" :foot="foot" :center="['Items','Orders','Items Order','Quantities']" right="Amount" />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_between, range, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";
import {mapState} from "vuex";

export default {
  name: "PageReportGroupWiseOrderSummary",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    ...mapState({ groups:state => state.groups.data }),
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Start Date', 'End Date', 'Total Orders'],[to_format('DD/MM/YYYY hh:mm A',this.range.from),to_format('DD/MM/YYYY hh:mm A',this.range.to),this.range_tokens.length]) },
    item_groups(){ let igs = {}; _.forEach(this.groups,({ id:group,items }) => _.forEach(items,item => {
      if(!_.has(igs,item)) igs[item] = []; if(!igs[item].includes(group)) igs[item].push(group);
    })); return igs; },
    range_tokens(){ return _.filter(this.tokens_own,token => is_between(token.date,this.range.from,this.range.to)) },
    group_orders(){ let gos = {}; _.forEach(this.range_tokens,token => {
      let ogs = []; _.forEach(token.items,tis => {
      let i_id = _.get(tis,['item','id']), i_gp = _.get(this.item_groups,i_id,[]);
      _.forEach(i_gp,gp => {
        if(!_.has(gos,gp)) gos[gp] = [0,0,0,0]; if(!_.includes(ogs,gp)) { ogs.push(gp); gos[gp][0]++ }
        gos[gp][1]++; gos[gp][2] += tis.quantity; gos[gp][3] += (tis.quantity * tis.price);
      })
    })}); return gos; },
    table(){ return _(this.groups).map(group => _.zipObject(['Name','Items','Orders','Items Order','Quantities','Amount'],
      [group.name,group.items.length,_.get(this.group_orders,[group.id,0],0),_.get(this.group_orders,[group.id,1],0),_.get(this.group_orders,[group.id,2],0),_.get(this.group_orders,[group.id,3],0)]
    )).value() },
    foot(){ return {  } }
  },
  methods: {
  }
}
</script>
