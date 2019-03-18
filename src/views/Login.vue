<template>
  <div class="fm-stretch fm-center bg-image">
    <div class="login-panel">
      <div class="login-header">
        <img class="login-icon" src="../assets/images/login/login_usericon.png">
      </div>
      <div class="login-title">
        <span>{{ App.Config.appTitle }}</span>
      </div>
      <form class="login-form" @submit.prevent="doLogin">
        <div class="input-item">
          <select class="login-control" v-model="accessType" required>
            <option v-for="item in typeList" :key="item.code" :label="item.text" :value="item.code"></option>
          </select>
        </div>
        <div class="input-item">
          <input
            class="login-control user"
            type="text"
            name="userName"
            v-validate="'required|alpha_dash'"
            data-vv-as="用户名"
            v-model="userName"
            placeholder="请输入用户名"
            autocomplete="off"
          >
          <span class="error-msg">{{ errors.first('userName') }}</span>
        </div>
        <div class="input-item">
          <input
            class="login-control password"
            type="password"
            v-model="password"
            name="password"
            v-validate="'required|alpha_dash'"
            data-vv-as="密码"
            maxlength="32"
            placeholder="请输入密码"
          >
          <span class="error-msg">{{ errors.first('password') }}</span>
        </div>
        <div class="input-item" style="text-align: right;margin-top: -20px;">
          <input id="rememberMe" v-model="rememberMe" type="checkbox" class="login-control">
          <label for="rememberMe">
            <span>记住我</span>
          </label>
        </div>
        <div class="input-item" style="margin-top: -20px;">
          <button class="btn-submit" type="submit">
            <div class="loading-gif" v-show="showLoading"></div>
            <span class="text" v-show="!showLoading">登&nbsp;&nbsp;录</span>
          </button>
          <div class="error-msg fm-center" v-show="failFlag">
            <img class="fail-img" src="../assets/images/login/icon_login_fail.png">
            <span>：登录失败啦！用户名或密码错误！</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { get } from '@/services/Service';
import auth from '@/utils/auth';
import url from '@/api';

export default {
  name: 'Login',
  props: {},
  data() {
    return {
      typeList: [{ code: 'CN', text: '大 陆' }, { code: 'HM', text: '港 澳' }],
      accessType: 'CN',
      userName: null,
      password: null,
      rememberMe: false,
      failFlag: false,
      showLoading: false
    };
  },
  methods: {
    clearCaches() {
      auth.removeSessionStorageObject();
      this.App.Util.clearAppTemp();
    },
    doLogin() {
      if (this.showLoading) {
        return;
      }

      this.$validator.validate().then((result) => {
        if (result) {
          this.showLoading = true;
          const param = {
            userNickName: this.userName,
            userPassword: this.password
          };
          get(url.login, param)
            .then((rest) => {
              auth.setSessionStorage('ADMIN_TOKEN', rest.access_token);

              const userObj = {
                userId: rest.userId,
                userName: this.userName,
                userRealName: rest.userRealName,
                accessType: this.accessType
              };
              this.App.Temp.User = userObj;

              // 登录用户信息属于临时信息，记录在sessionStorage中
              auth.setSessionStorage('User', userObj);

              this.App.Temp.Settings = auth.getLocalStorage('Settings') || {};
              if (this.rememberMe) {
                // 是否记住用户属于配置信息，记录在localStorage中
                auth.setLocalStorage('RememberUser', {
                  userName: this.userName,
                  // todo: 此处很不安全，要进行加密
                  userPwd: this.password
                });
              }
              this.$router.push('/workOrder');
            })
            .catch((e) => {
              this.failMsg = e.message;
              this.failFlag = true;
            })
            .finally(() => {
              this.showLoading = false;
            });
        }
      });
    }
  },
  watch: {
    accessType() {
      this.failFlag = false;
    },
    userName() {
      this.failFlag = false;
    },
    password() {
      this.failFlag = false;
    }
  },
  mounted() {
    this.clearCaches();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-image {
  background-image: url("../assets/images/login/page_bg_image.png");
}
.bg-video {
  overflow: hidden;
  object-fit: fill;
}
.login-panel {
  width: 480px;
  height: 500px;
  text-align: center;
  background: url("../assets/images/login/login_bg.png") center center no-repeat;
}
.login-header {
  font-size: 0px;
}
.login-title {
  text-align: center;
  font-size: 18px;
  margin: 20px 0px;
  color: #636ef5;
  font-weight: bold;
}
.login-icon {
  height: 120px;
  width: 120px;
  padding-top: 10px;
}
.login-form {
  display: inline-block;
  width: 360px;
}
.input-item {
  margin-bottom: 30px;
  text-align: center;
}
button.btn-submit {
  width: 360px;
  height: 40px;
  background-image: url("../assets/images/login/button_login_normal.png");
  text-align: center;
  border: 1px #636ef5;
  border-radius: 3px;
}
button.btn-submit:hover {
  background-image: url("../assets/images/login/button_login_hover.png");
  cursor: pointer;
}
button.btn-submit:active {
  background-image: url("../assets/images/login/button_login_loading.png");
}
button.btn-submit:disabled {
  background-image: url("../assets/images/login/button_login_gray.png");
}
button.btn-submit > span.text {
  width: 20px;
  height: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}
button.btn-submit > div.loading-gif {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  background-image: url("../assets/images/login/icon_loading.gif");
}
select.login-control {
  border: #636ef5 1px solid;
  border-radius: 3px;
  font-size: 14px;
  color: #666666;
  width: 360px;
  height: 40px;
  padding: 0 20px 0 40px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("../assets/images/login/icon_user.png") 10px center no-repeat,
    url("../assets/images/login/select_close.png") calc(100% - 12px) center
      no-repeat;
  background-color: rgb(250, 255, 189);
}
select.login-control:focus {
  background: url("../assets/images/login/icon_user.png") 10px center no-repeat,
    url("../assets/images/login/select_open.png") calc(100% - 12px) center
      no-repeat;
  background-color: rgb(250, 255, 189);
}
select.login-control > option {
  background-color: #ffffff;
}
input.login-control {
  border: #636ef5 1px solid;
  border-radius: 3px;
  font-size: 14px;
  color: #666666;
  width: 360px;
  height: 40px;
  padding: 0 20px 0 40px;
}
input.login-control.user {
  background: url("../assets/images/login/icon_user.png") 10px center no-repeat;
  background-color: rgb(250, 255, 189);
}
input.login-control.password {
  background: url("../assets/images/login/icon_secret.png") 10px center
    no-repeat;
  background-color: rgb(250, 255, 189);
}
input[type="checkbox"].login-control {
  padding: 0px;
  margin: 5px;
  width: 14px;
  height: 14px;
  vertical-align: middle;
  content: url("../assets/images/login/checkbox_normal.png");
  cursor: pointer;
}
input[type="checkbox"].login-control:checked {
  content: url("../assets/images/login/checkbox_active.png");
}
input[type="checkbox"].login-control + label {
  padding: 5px;
  margin: 0px;
  vertical-align: middle;
  font-size: 14px;
  color: #182848;
  font-weight: normal;
  line-height: 20px;
  cursor: pointer;
}
.error-msg {
  float: left;
  padding: 5px;
  font-size: 14px;
  color: #fa5883;
}
.fail-img {
  width: 22px;
  height: 20px;
  /* margin-top: -6px;ßß */
}
</style>
