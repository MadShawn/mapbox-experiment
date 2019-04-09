import storage from '@/utils/storage';
import App from '@/Application';

const store = {
  state: {
    accessToken: null, // 记录登陆token，登录后初始化
    accessType: null, // 记录登陆模式，登录后初始化
    User: null, // 登录用户信息:userId  userName
    WorkOrder: null, // 工单对象:workOrderId workOrderName sceneName sceneId
    Settings: {}, // 全局临时配置
    Constants: {}, // 全局常量
  },
  getters: {
    testLogin(state) {
      if (!state.User) {
        return false;
      }

      return true;
    },
    testWorkOrder(state) {
      if (!state.WorkOrder) {
        return false;
      }

      return true;
    }
  },
  mutations: {
    login(state, payload) {
      state.accessToken = payload.accessToken;
      state.accessType = payload.accessType;
      state.User = payload.user;
      App.Session.accessToken = state.accessToken;
      App.Session.accessType = state.accessType;
      App.Session.User = state.User;
      storage.setSessionKey(state.accessToken);
      storage.setSessionStorage('Access-Token', state.accessToken);
      storage.setSessionStorage('Access-Type', state.accessType);
      storage.setSessionStorage('User', state.User);
    },
    loadConstants(state, payload) {
      state.Constants = {
        ...payload,
        ...state.Constants
      };
      storage.setLocalStorage('Constants', state.Constants);
    },
    loadWorkOrder(state, workOrder) {
      state.WorkOrder = workOrder;
      App.Session.Settings = state.WorkOrder;
      storage.setSessionStorage('Work-Order', state.WorkOrder);
    },
    loadSettings(state, settings) {
      state.Settings = {
        ...settings,
        ...state.Settings,
      };
      App.Session.Settings = state.Settings;
      storage.setLocalStorage('Settings', state.Settings);
    },
    clearSession(state) {
      state.accessToken = null;
      state.accessType = null;
      state.User = null;
      state.WorkOrder = null;
      App.Session.accessToken = null;
      App.Session.accessType = null;
      App.Session.User = null;
      App.Session.WorkOrder = null;
      storage.clearSessionStorage();
    }
  },
  actions: {

  }
};

export default store;
