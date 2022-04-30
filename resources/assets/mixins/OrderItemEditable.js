import {settings_boolean} from "assets/helpers";

export default {
  computed: {
    oie_processing_editable(){ return settings_boolean(settings('enable_processing_token_item_update')) === true },
    oie_completed_editable(){ return settings_boolean(settings('enable_completed_token_item_update')) === true },
    oie_served_editable(){ return settings_boolean(settings('enable_served_token_item_update')) === true },
  },
  methods: {
    oie_is(progress){ return ['Processing','Completed','Served'].includes(progress) && this[_.snakeCase(`oie ${progress} Editable`)]  }
  }
}
