<template>
  <div id="app" class="fm-stretch">
    <router-view/>
  </div>
</template>
<script>
import App from '@/Application';
import storage from '@/utils/storage';
import AppUtil from '@/utils/AppUtil';

export default {
  name: 'app',
  methods: {
    loadConstants(accessType) {
      const reqs = [];
      // 默认中国大陆
      reqs.push(this.axios.get('./constant/locale/default/main.json'));
      if (accessType !== 'CN') {
        // 除中国大陆外的其他国家/地区
        reqs.push(this.axios.get(`./constant/locale/${accessType}/main.json`));
      }

      Promise.all(reqs).then((res) => {
        const cons = {};
        res.forEach((it) => {
          Object.assign(cons, it.data);
        });

        this.$store.commit('loadConstants', cons);
      });
    }
  },
  created() {
    // 非Chrome浏览器警告
    if (!AppUtil.testBrowser(['Chrome/57'])) {
      alert('请使用谷歌浏览器！');
      return;
    }

    storage.setLocalKey(App.Config.appName);

    // 页面刷新时，从sessionStorage中读取用户信息
    const accessToken = AppUtil.getUrlParam('access_token');
    if (accessToken) {
      storage.setSessionKey(accessToken);

      const user = storage.getSessionStorage('User');
      if (user) {
        const accessType = storage.getSessionStorage('Access-Type');
        const payload = {
          accessToken,
          accessType,
          user
        };
        this.$store.commit('login', payload);

        this.loadConstants(accessType);
      }

      const workOrder = storage.getSessionStorage('Work-Order');
      if (workOrder) {
        this.$store.commit('loadWorkOrder', workOrder);
      }

      const settings = storage.getLocalStorage('Settings') || {};
      this.$store.commit('loadSettings', settings);
    }
  }
};
</script>
<style>
@import './assets/css/layout.css';
@import './assets/css/form.css';
@import './assets/css/component.css';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
