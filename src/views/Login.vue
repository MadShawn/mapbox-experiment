<template>
  <div class="fm-stretch fm-center bgImage">
    <div class="loginDiv">
      <div class="fm-center">
        <img class="userIcon" src="../assets/images/login/login_usericon.png">
      </div>
      <div>
        <div class="loginTitle">
          <span>编辑平台-月基线</span>
        </div>
        <form class="loginForm" autocomplete="false" @submit.prevent="doLogin">
          <div class="inputDiv">
            <select class="login-select" v-model="accessType" required>
              <option v-for="item in typeList" v-bind:key="item.code">{{ item.text }}</option>
            </select>
          </div>
          <div class="inputDiv">
            <input
              class="loginInput user"
              type="text"
              name="user"
              required
              v-model="userName"
              placeholder="请输入用户名"
            >
          </div>
          <div class="inputDiv">
            <input
              class="loginInput password"
              type="password"
              v-model="password"
              name="userpassword"
              required
              maxlength="32"
              placeholder="请输入密码"
            >
          </div>
          <div class="inputDiv" style="text-align: right;">
            <input id="rememberMe" v-model="rememberMe" type="checkbox" class="loginInput">
            <label for="rememberMe">
              <span>记住我</span>
            </label>
          </div>
          <!--</div>-->
          <div class="loginFail" v-show="errorFlag">
            <img class="failImg" src="../assets/images/login/icon_login_fail.png">：登录失败啦！用户名或密码错误！
          </div>
          <button class="submitButton" type="submit">
            <div class="login-load-image" v-show="showLoading"></div>
            <span class="loading" v-show="!showLoading">登&nbsp;&nbsp;录</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DSManage from "../services/DSManage";

export default {
  name: "Login",
  props: {},
  data() {
    return {
      typeList: [{ code: "CN", text: "大 陆" }, { code: "HM", text: "港 澳" }],
      accessType: "CN",
      userName: null,
      password: null,
      rememberMe: false,
      errorFlag: false,
      showLoading: false
    };
  },
  methods: {
    clearCaches() {
      if (this.App.Temp.accessToken) {
        this.App.Util.removeSessionStorageObject();
        this.App.Util.clearAppTemp();
      }
    },
    toggleRememberMe() {
      this.rememberMe = !this.rememberMe;
    },
    doLogin() {
      if (this.showLoading) {
        return;
      }

      this.showLoading = true;
      const serviceConf = this.App.Util.getServiceConfig(this.accessType);
      const dsManage = new DSManage({
        services: serviceConf,
        accessType: this.accessType
      });
      dsManage
        .login(this.userName, this.password)
        .then(rest => {
          this.App.Temp.accessToken = rest.access_token;

          const userObj = {
            userId: rest.userId,
            userName: this.userName,
            userRealName: rest.userRealName,
            accessType: this.accessType
          };
          this.App.Temp.User = userObj;

          // 登录用户信息属于临时信息，记录在sessionStorage中
          this.App.Util.setSessionStorage("User", userObj);

          this.App.Temp.Settings =
            this.App.Util.getLocalStorage("Settings") || {};
          if (this.rememberMe) {
            // 是否记住用户属于配置信息，记录在localStorage中
            this.App.Util.setLocalStorage("RememberUser", {
              userName: this.userName,
              // todo: 此处很不安全，要进行加密
              userPwd: this.password
            });
          }

          alert('登录成功！');
          // this.loadConstant(this.App.Temp.accessType);
          // loadBaseData();

          // window.location.href = `#/workOrder?access_token=${rest.access_token}`;
        })
        .catch(e => {
          this.errorMsg = e.message;
          this.errorFlag = true;
        })
        .finally(() => {
          this.showLoading = false;
        });
    }
  },
  mounted() {
    this.clearCaches();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bgImage {
  background-image: url("../assets/images/login/page_bg_image.png");
}
.bgVideo {
  overflow: hidden;
  object-fit: fill;
}
.loginDiv {
  width: 480px;
  height: 500px;
  background: url("../assets/images/login/login_bg.png") center center no-repeat;
}
.loginTitle {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: #636ef5;
  font-weight: bold;
  font-family: "微软雅黑";
}
.userIcon {
  height: 120px;
  width: 120px;
  padding-top: 10px;
}
.inputDiv {
  padding-top: 30px;
}
.loginForm {
  display: inline-block;
  width: 360px;
}
.submitButton {
  width: 360px;
  height: 40px;
  margin-top: 10px;
  font-size: 18px;
  color: #ffffff;
  background-image: url("../assets/images/login/button_login_normal.png");
  text-align: center;
  border: 1px #636ef5;
  border-radius: 3px;
}
.submitButton:hover {
  background-image: url("../assets/images/login/button_login_hover.png");
  cursor: pointer;
}
.submitButton:active {
  background-image: url("../assets/images/login/button_login_loading.png");
}
.submitButton:disabled {
  background-image: url("../assets/images/login/button_login_gray.png");
}
.loginFail {
  font-size: 14px;
  color: #fa5883;
  height: 30px;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
}
.loginFailHidden {
  visibility: hidden;
}
.loginFailVisible {
  visibility: visible;
}
.failImg {
  width: 22px;
  height: 20px;
  display: inline-block;
  position: relative;
  top: -3px;
  object-fit: fill;
}
.loading {
  width: 20px;
  height: 20px;
}
.login-load-image {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  background-image: url(../assets/images/login/icon_loading.gif) no-repeat;
}
.login-title-bg {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 0 auto;
}
select.login-select {
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
select.login-select:focus {
  background: url("../assets/images/login/icon_user.png") 10px center no-repeat,
    url("../assets/images/login/select_open.png") calc(100% - 12px) center
      no-repeat;
  background-color: rgb(250, 255, 189);
}
select.login-select > option {
  background-color: #ffffff;
}
input.loginInput {
  border: #636ef5 1px solid;
  border-radius: 3px;
  font-size: 14px;
  color: #666666;
  width: 298px;
  height: 40px;
  padding: 0 20px 0 40px;
}
input.loginInput.user {
  background: url("../assets/images/login/icon_user.png") 10px center no-repeat;
  background-color: rgb(250, 255, 189);
}
input.loginInput.password {
  background: url("../assets/images/login/icon_secret.png") 10px center
    no-repeat;
  background-color: rgb(250, 255, 189);
}
input[type="checkbox"].loginInput {
  padding: 0px;
  margin: 5px;
  width: 14px;
  height: 14px;
  vertical-align: middle;
  content: url("../assets/images/login/checkbox_normal.png");
  cursor: pointer;
}
input[type="checkbox"].loginInput:checked {
  content: url("../assets/images/login/checkbox_active.png");
}
input[type="checkbox"].loginInput + label {
  padding: 5px;
  margin: 0px;
  vertical-align: middle;
  font-size: 14px;
  color: #182848;
  font-weight: normal;
  line-height: 20px;
  cursor: pointer;
}
</style>
