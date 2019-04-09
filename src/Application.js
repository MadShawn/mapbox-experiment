/**
 * 定义web app全局命名空间，并在此空间下定义属性和函数，以便全局使用
 *
 * @copyright: @Navinfo, all rights reserved.
 */

/**
 * App全局命名空间
 * @type {Object}
 */
const App = {};

/**
 * 全局配置信息
 * @type {Object}
 */
App.Config = {
  appName: window.Config.appName,
  appTitle: window.Config.appTitle,

  services: {
    ...window.Config.services,
    subdomains: `${window.Config.services.editor}/dataview`,
    subdomainsConvex: `${window.Config.services.editor}/editor`,
  }
};

/**
 * 会话级全局变量，在程序中初始化
 * @type {Object}
 */
App.Session = {
  accessToken: null, // 记录登陆token，登录后初始化
  accessType: null, // 记录登陆模式，登录后初始化
  WorkOrder: null, // 工单对象:workOrderId workOrderName sceneName sceneId
  User: null, // 登录用户信息:userId  userName
  Settings: {}, // 配置信息
  Constants: {}, // 常量对象
};

export default App;
