<template>
  <div id="app" class="fm-stretch">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
  methods: {
    loadConstant(accessType) {
      const reqs = [];
      // 默认中国大陆
      reqs.push(this.axios.get('./constant/locale/default/main.json'));
      if (accessType !== 'CN') {
        // 除中国大陆外的其他国家/地区
        reqs.push(this.axios.get(`./constant/locale/${accessType}/main.json`));
      }

      Promise.all(reqs).then((res) => {
        this.App.Constant = this.App.Constant || {};
        res.forEach((it) => {
          Object.assign(this.App.Constant, it.data);
        });
      });
    }
  },
  created() {
    // 非Chrome浏览器警告
    if (!this.App.Util.testBrowser(['Chrome/57'])) {
      alert('请使用谷歌浏览器！');
      return;
    }

    // 页面刷新时，从sessionStorage中读取用户信息
    const accessToken = this.App.Util.getUrlParam('access_token');
    if (accessToken) {
      this.App.Temp.accessToken = accessToken;
      if (!this.App.Temp.User) {
        const userCookie = this.App.Util.getSessionStorage('User');
        if (userCookie) {
          this.App.Temp.accessType = userCookie.accessType;
          this.App.Temp.User = userCookie;

          this.loadConstant(this.App.Temp.accessType);
        }
      }

      // 从sessionStorage中读取工单信息
      if (!this.App.Temp.WorkOrder) {
        const workOrderCookie = this.App.Util.getSessionStorage('WorkOrder');
        if (workOrderCookie) {
          this.App.Temp.WorkOrder = workOrderCookie;
        }
      }

      this.App.Temp.Settings = this.App.Util.getLocalStorage('Settings') || {};
    }
  }
};

</script>
<style>
@import "./assets/css/layout.css";
@import "./assets/css/form.css";
@import "./assets/css/component.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
