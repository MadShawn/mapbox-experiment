import 'normalize.css';
import './assets/css/main.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';
import './plugins/validate';
import './plugins/easytable';

import Global from './Application';

Vue.config.productionTip = false;

// 混入全局变量App
Vue.mixin({
  data() {
    return {
      App: Global
    };
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
