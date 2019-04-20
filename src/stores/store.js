import App from '@/Application';
import storage from '@/utils/storage';

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
    isAuthurized(state) {
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
    },
    loadConstants(state, payload) {
      state.Constants = {
        ...payload,
        ...state.Constants
      };
    },
    resetWorkOrder(state, workOrder) {
      state.WorkOrder = workOrder;
      App.Session.WorkOrder = state.WorkOrder;
    },
    resetSettings(state, settings) {
      state.Settings = {
        ...settings,
        ...state.Settings,
      };
      App.Session.Settings = state.Settings;
      storage.setLocalStorage('App-Settings', storage);
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

/**
 * 以缓存初始化状态（state）
 * 用于页面刷新时的状态保持
 */
function initialize() {
  const stateObj = store.state;
  const stateCache = storage.getSessionStorage('App-State');
  if (stateCache) {
    Object.assign(stateObj, stateCache);
    Object.assign(App.Session, stateCache);
  } else {
    const settings = storage.getLocalStorage('App-Settings');
    Object.assign(stateObj.Settings, settings);
    Object.assign(App.Session.Settings, settings);
  }
}

initialize();

export default store;
