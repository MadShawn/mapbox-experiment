/**
 * 定义web app全局命名空间，并在此空间下定义属性和函数，以便全局使用
 * @file       Application.js
 * @author     ChenXiao
 * @date       2017-08-03 11:57:21
 *
 * @copyright: @Navinfo, all rights reserved.
 */

/**
 * App全局命名空间
 * @type {Object}
 */
const App = {};

/**
 * 全局配置信息，用于区分港澳和大陆的服务地址
 * @type {Object}
 */
App.serviceConfig = {
  CN: {
    /* trunk服务 */
    editor: 'http://fs-road.navinfo.com/dev/month/service',
    /* trunk地图服务 */
    subdomains: 'http://fs-road.navinfo.com/dev/month/service/dataview',
    /* 凸包地图服务 */
    subdomainsConvex: 'http://fs-road.navinfo.com/dev/month/service/editor'
  },
  HM: {
    /* 港澳服务 */
    editor: 'http://fs-road.navinfo.com/dev/month/service',
    /* 港澳地图服务 */
    subdomains: 'http://fs-road.navinfo.com/dev/month/service/dataview',
    /* 凸包地图服务 */
    subdomainsConvex: 'http://fs-road.navinfo.com/dev/month/service/editor'
  }
};

App.Config = {
  appName: 'FM-WebEditor',

  services: {
    // adas服务
    adas: 'http://172.28.14.23:9999',
    // 海量库的服务
    massive: 'http://172.28.14.21:9977',
    // 本地轨迹照片查看服务
    localTrack: 'http://localhost:5000/trackView',
    // 在线轨迹照片查看服务
    onlineTrack: 'http://172.28.14.24:12321',
  },

  /**
   * 地图图层相关的配置
   * @type {Object}
   */
  map: {
    layerZoom: {
      minEditZoom: 15
    },
    tipEditZoom: 17
  }
};

/**
 * 全局常量，在程序中初始化
 * @type {Object}
 */
App.Constant = {};

/**
 * 临时全局变量，在程序中初始化
 * @type {Object}
 */
App.Temp = {
  accessToken: null,
  accessType: null, // 记录登陆模式，loginCtrl里初始化
  WorkOrder: null, // 工单对象:workOrderId workOrderName sceneName sceneId
  User: null, // 登录用户信息:userId  userName
  Settings: {} // 全局临时配置
};

/**
 * 公用函数命名空间
 * @type {Object}
 */
App.Util = {
  /**
   * 获取webapp的根目录
   * @author  ChenXiao
   * @date    2017-09-13
   * @return  {String} app根目录
   */
  getAppPath() {
    return window.location.pathname.substr(0, window.location.pathname.indexOf('/apps'));
  },
  /**
   * 获取App应用的根目录
   * @author  ChenXiao
   * @date    2017-09-13
   * @return  {String} App应用根目录
   */
  getBasePath() {
    return window.location.origin + window.location.pathname;
  },
  getServiceConfig(accessType) {
    return {
      ...App.Config.services,
      ...App.serviceConfig[accessType]
    };
  },
  /**
   * 从url地址中获取拼接的参数值
   * @method  getUrlParam
   * @author  ChenXiao
   * @date    2017-09-13
   * @param   {String}    paramName 参数名称
   * @return  {String}    参数值
   */
  getUrlParam(paramName) {
    const reg = new RegExp(`(^|&)${paramName}=([^&]*)(&|$)`);
    let str = window.location.search;
    let ret;
    if (!str) {
      str = window.location.hash;
    }
    if (str) {
      ret = str.substr(str.indexOf('?') + 1).match(reg);
    }
    if (ret) {
      return unescape(ret[2]);
    }
    return null;
  },
  /**
   * 退出系统
   * @method logout
   * @author ChenXiao
   * @date   2017-9-13
   * @return {Undefined} 无返回值
   */
  logout() {
    window.location.href = '#/login';
  },
  /**
   * 清理全局临时变量
   * @method clearAppTemp
   * @author ChenXiao
   * @date   2017-9-13
   * @return {Undefined} 无返回值
   */
  clearAppTemp() {
    App.Temp.accessToken = null;
    App.Temp.accessType = null;
    App.Temp.User = null;
    App.Temp.WorkOrder = null;
  },
  /**
   * 获取session storage的键值
   * @method getSessionStorageKey
   * @author ChenXiao
   * @date   2017-9-13
   * @return {String} appName-token
   */
  getSessionStorageKey() {
    return `${App.Config.appName}-${App.Temp.accessToken || 'XXX'}`;
  },
  /**
   * 获取存储在session storage中的对象
   * @method getSessionStorageObject
   * @author ChenXiao
   * @date   2017-9-13
   * @return {Object} 存储在session storage中的对象
   */
  getSessionStorageObject() {
    const skey = App.Util.getSessionStorageKey();

    return JSON.parse(sessionStorage.getItem(skey));
  },
  /**
   * 删除存储在session storage中的对象
   * @method removeSessionStorageObject
   * @author ChenXiao
   * @date   2017-9-13
   * @return {Undefined} 无返回值
   */
  removeSessionStorageObject() {
    const skey = App.Util.getSessionStorageKey();
    sessionStorage.removeItem(skey);
  },
  /**
   * 设置存储在session storage中的对象的键值对
   * @method setSessionStorage
   * @author ChenXiao
   * @date   2017-9-13
   * @param  {String} key   键
   * @param  {Any}    value 值
   * @return {Undefined} 无返回值
   */
  setSessionStorage(key, value) {
    const skey = App.Util.getSessionStorageKey();
    const obj = JSON.parse(sessionStorage.getItem(skey)) || {};
    obj[key] = value;
    sessionStorage.setItem(skey, JSON.stringify(obj));
  },
  /**
   * 获取存储在session storage中的对象的键值
   * @method getSessionStorage
   * @author ChenXiao
   * @date   2017-9-13
   * @param  {String} key 键
   * @return {Any}        值
   */
  getSessionStorage(key) {
    const obj = App.Util.getSessionStorageObject();

    if (obj) {
      return obj[key];
    }
    return null;
  },
  /**
   * 从存储在session storage中的对象中删除一个键值对
   * @method removeSessionStorage
   * @author ChenXiao
   * @date   2017-9-13
   * @param  {String} key 键
   * @return {Undefined}  无返回值
   */
  removeSessionStorage(key) {
    const skey = App.Util.getSessionStorageKey();
    const obj = JSON.parse(sessionStorage.getItem(skey));
    if (obj) {
      delete obj[key];
      sessionStorage.setItem(skey, JSON.stringify(obj));
    }
  },
  /**
   * 获取local storage的键值
   * @method getLocalStorageKey
   * @author ChenXiao
   * @date   2017-9-13
   * @return {String}  appName-userId
   */
  getLocalStorageKey() {
    return App.Config.appName;
  },
  /**
   * 获取存储在local storage中的对象
   * @method getLocalStorageObject
   * @author ChenXiao
   * @date   2017-9-13
   * @return {Object}  存储对象
   */
  getLocalStorageObject() {
    const lkey = App.Util.getLocalStorageKey();
    return JSON.parse(localStorage.getItem(lkey));
  },
  /**
   * 删除存储在local storage中的对象
   * @method removeLocalStorageObject
   * @author ChenXiao
   * @date   2017-9-13
   * @return {Undefined} 无返回值
   */
  removeLocalStorageObject() {
    const lkey = App.Util.getLocalStorageKey();
    localStorage.removeItem(lkey);
  },
  /**
   * 设置存储在local storage中的对象的键值
   * @method setLocalStorage
   * @author ChenXiao
   * @date   2017-9-13
   * @param  {String} key   键
   * @param  {Any}    value 值
   * @return {Undefined} 无返回值
   */
  setLocalStorage(key, value) {
    const lkey = App.Util.getLocalStorageKey();
    const obj = JSON.parse(localStorage.getItem(lkey)) || {};
    obj[key] = value;
    localStorage.setItem(lkey, JSON.stringify(obj));
  },
  /**
   * 从存储在local storage中的对象中获取一个键对应的值
   * @method getLocalStorage
   * @author ChenXiao
   * @date   2017-9-13
   * @param  {String} key 键
   * @return {Any}        值
   */
  getLocalStorage(key) {
    const obj = App.Util.getLocalStorageObject();

    if (obj) {
      return obj[key];
    }
    return null;
  },
  /**
   * 从存储在local storage中的对象中删除一个键值对
   * @method removeLocalStorage
   * @author ChenXiao
   * @date   2017-9-13
   * @param  {String} key 键
   * @return {Undefined} 无返回值
   */
  removeLocalStorage(key) {
    const lkey = App.Util.getLocalStorageKey();
    const obj = JSON.parse(localStorage.getItem(lkey));
    if (obj) {
      delete obj[key];
      localStorage.setItem(lkey, JSON.stringify(obj));
    }
  },
  /**
   * 获取用户的浏览器信息
   * @method myBrowser
   * @author ChenXiao
   * @date   2017-9-13
   * @return {String} 浏览器名称/大版本号
   */
  getBrowserName() {
    const {
      userAgent
    } = navigator;
    const isOpera = userAgent.indexOf('Opera') >= 0;
    if (isOpera) {
      return userAgent.match(/Opera\/\d+/)[0];
    }
    if (userAgent.indexOf('Firefox') >= 0) {
      return userAgent.match(/Firefox\/\d+/)[0];
    }
    if (userAgent.indexOf('Chrome') >= 0) {
      return userAgent.match(/Chrome\/\d+/)[0];
    }
    if (userAgent.indexOf('Safari') >= 0) {
      return userAgent.match(/Safari\/\d+/)[0];
    }
    if (userAgent.indexOf('compatible') >= 0 && userAgent.indexOf('MSIE') >= 0 && !isOpera) {
      return userAgent.match(/MSIE\/\d+/)[0];
    }
    return 'Unknown';
  },
  /**
   * 检测用户使用的浏览器客户端是否在指定的浏览器列表中
   * @method testBrowser
   * @author ChenXiao
   * @date   2017-9-13
   * @param  {Array} browserList 浏览器列表（name/大版本）
   * @return {Boolean} 是否在指定的浏览器列表中
   */
  testBrowser(browserList) {
    let f = false;
    const ub = App.Util.getBrowserName().split('/');

    let cb;
    for (let i = 0; i < browserList.length; i++) {
      cb = browserList[i].split('/');
      if (cb[0] === ub[0]) {
        if (cb.length > 1) {
          if (parseInt(ub[1], 10) >= parseInt(cb[1], 10)) {
            f = true;
          }
        } else {
          f = true;
        }
        break;
      }
    }

    return f;
  }
};

export default App;
