import Vue from 'vue';

import 'vue-easytable/libs/themes-base/index.css';
import {
  VTable,
  VPagination
} from 'vue-easytable';

// Register to global
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);
