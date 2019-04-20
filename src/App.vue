<template>
  <div id="app" class="fm-stretch">
    <router-view/>
  </div>
</template>
<script>
import storage from '@/utils/storage';
import AppUtil from '@/utils/AppUtil';

export default {
  name: 'app',
  methods: {},
  created() {
    // 非Chrome浏览器警告
    if (!AppUtil.testBrowser(['Chrome/57'])) {
      this.$message({
        message: '请使用谷歌浏览器以获取流畅体验！',
        type: 'warning',
        duration: 0
      });
    }

    // 离开页面时，将state放入会话缓存，以便页面刷新后功能可用
    window.addEventListener('beforeunload', () => {
      if (this.$store.state.accessToken) {
        storage.setSessionStorage('App-State', this.$store.state);
      }
    });
  },
  beforeDestroy() { // 目前不清楚页面刷新时为什么这里不能触发
    if (this.$store.state.accessToken) {
      storage.setSessionStorage('App-State', this.$store.state);
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
