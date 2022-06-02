import {id_keyed} from "assets/helpers";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  state.data = Object.assign({},state.data,id_keyed(records))
}
