<template>
  <div class="fm-layout">
    <div class="fm-container left" :class="{folded: folded}">
      <div class="fm-layout col" v-show="!folded">
        <div class="fm-container top">
          <div class="menubar-header">
            <div class="menubar-title">室内编辑平台</div>
            <div class="icon-btn fold-left" @click="folded=true"></div>
          </div>
        </div>
        <div class="fm-container middle">
          <ul class="menu-list">
            <li v-for="item in menuList" :key="item.id">
              <div class="menu-item" :class="{'active': !!item.selected}" @click="selectMenu(item)">
                <div class="title">{{ item.name }}</div>
                <div class="desc">{{ item.desc }}</div>
                <div
                  v-if="item.submenuList"
                  class="icon-btn"
                  :class="{'arrow-left': !item.open, 'arrow-down': item.open}"
                ></div>
              </div>
              <ul v-if="item.submenuList" class="submenu-list" v-show="item.open">
                <li v-for="subitem in item.submenuList" :key="subitem.id">
                  <div
                    class="submenu-item"
                    :class="{'active': !!subitem.selected}"
                    @click="selectMenu(subitem)"
                  >
                    <div class="title">{{ subitem.name }}</div>
                    <div class="desc">{{ subitem.desc }}</div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="fm-container bottom">
          <div class="menubar-footer">
            <button class="menu-btn blue">账户设置</button>
            <button class="menu-btn red" @click="logout">退出</button>
          </div>
        </div>
      </div>
      <div class="fm-layout col menubar-folded" v-show="folded">
        <div class="fm-container top fm-center">
          <div class="icon-btn fold-right" @click="folded=false"></div>
        </div>
        <div
          class="fm-container bottom fm-center"
          style="height: 100px;flex-direction: column;justify-content: space-around;"
        >
          <div class="icon-btn settings"></div>
          <div class="icon-btn quit" @click="logout"></div>
        </div>
      </div>
    </div>
    <div class="fm-container col right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import DSManage from '../services/DSManage';

export default {
  name: 'WorkOrder',
  props: {},
  data() {
    return {
      folded: false,
      menuList: [
        {
          id: 'daily',
          name: '日编',
          open: false,
          selected: false,
          submenuList: [
            {
              id: 'point',
              name: '点要素',
              desc: 20,
              open: false,
              selected: false
            },
            {
              id: 'road',
              name: '道路要素',
              desc: 30,
              open: false,
              selected: false
            }
          ]
        },
        {
          id: 'history',
          name: '历史工单',
          route: '/list',
          open: false,
          selected: false
        }
      ],
      selectedMenu: null
    };
  },
  methods: {
    selectMenu(menu) {
      if (menu.submenuList) {
        menu.open = !menu.open;
      } else {
        if (this.selectedMenu) {
          this.selectedMenu.selected = false;
        }
        menu.selected = true;
        this.selectedMenu = menu;
        if (menu.route) {
          this.$router.push(menu.route);
        }
      }
    },
    logout() {
      this.$router.push('login');
    }
  },
  watch: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fm-container.left {
  width: 240px;
  height: 100%;
  background: url('../assets/images/workOrder/background-left.png') no-repeat;
  background-size: cover;
  transition: cubic-bezier(0, 0.96, 0.57, 0.95) 0.3s;
}
.fm-container.left.folded {
  width: 30px;
}
.fm-container.right {
  flex: 1;
  background: url('../assets/images/layout/background-big.png') no-repeat;
  background-size: cover;
}
.fm-container.top {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.fm-container.middle {
  flex: 1;
}
.fm-container.bottom {
  width: 100%;
  height: 50px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}
.menubar-header,
.menubar-footer {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
}
.menubar-title {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
.menubar-folded {
  display: flex;
  justify-content: space-between;
}
.icon-btn {
  height: 20px;
  width: 20px;
  cursor: pointer;
}
.icon-btn.fold-left {
  background: url('../assets/images/workOrder/icon_left_fold.png') center center
    no-repeat;
}
.icon-btn.fold-right {
  background: url('../assets/images/workOrder/icon_right_fold.png') center
    center no-repeat;
}
.icon-btn.settings {
  background: url('../assets/images/workOrder/icon_list.png') center center
    no-repeat;
}
.icon-btn.quit {
  background: url('../assets/images/workOrder/icon_close.png') center center
    no-repeat;
}
.icon-btn.arrow-left {
  background: url('../assets/images/workOrder/icon_up.png') center center
    no-repeat;
}
.icon-btn.arrow-down {
  background: url('../assets/images/workOrder/icon_down.png') center center
    no-repeat;
}
button.menu-btn {
  font-size: 14px;
  color: #fff;
  border: none;
  width: 100px;
  height: 24px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
}
button.menu-btn:focus {
  outline: auto;
}
button.menu-btn.blue {
  background-color: #3399ff;
}
button.menu-btn.red {
  background-color: #ff6699;
}
ul.menu-list {
  width: 100%;
  padding: 0px;
  margin: 0px;
}
ul.submenu-list {
  width: 100%;
  padding: 0px;
  margin: 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
ul.menu-list > li,
ul.submenu-list > li {
  list-style: none;
}
div.menu-item {
  height: 50px;
  line-height: 30px;
  padding: 10px;
  display: flex;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
}
div.submenu-item {
  height: 40px;
  line-height: 20px;
  padding: 5px 10px 5px 35px;
  display: flex;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0);
  border-bottom: 1px solid rgba(255, 255, 255, 0);
  cursor: pointer;
}
div.menu-item > div.title,
div.submenu-item > div.title {
  flex: 1;
}
div.menu-item > div.desc,
div.submenu-item > div.desc {
  padding: 0px 10px;
}
div.menu-item:hover,
div.submenu-item:hover,
div.menu-item.active,
div.submenu-item.active {
  background-color: #636ef5;
}
</style>
