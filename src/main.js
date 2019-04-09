import 'normalize.css';
import './assets/css/main.css';

import Vue from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from '@/stores';
import '@/plugins/element';
import '@/plugins/validate';
import '@/plugins/easytable';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
