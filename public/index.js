/**
 * 全局配置
 */
window.Config = {
  appName: 'Navi-DataView',
  appTitle: '数据浏览平台',
  // 服务地址配置信息
  services: {
    // 编辑服务
    editor: 'http://fs-road.navinfo.com/dev/month/service',
    // adas服务
    adas: 'http://172.28.14.23:9999',
    // 海量库的服务
    massive: 'http://172.28.14.21:9977',
    // 本地轨迹照片查看服务
    localTrack: 'http://localhost:5000/trackView',
    // 在线轨迹照片查看服务
    onlineTrack: 'http://172.28.14.24:12321',
  }
};

document.title = window.Config.appTitle;
