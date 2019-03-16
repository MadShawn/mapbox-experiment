import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/stores/store';
import workOrder from '@/stores/modules/workOrder';
import mapEditor from '@/stores/modules/mapEditor';

Vue.use(Vuex);

export default new Vuex.Store({
  ...store,
  modules: {
    workOrder,
    mapEditor
  }
});
