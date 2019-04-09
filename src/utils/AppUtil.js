const Util = {
  /**
   * 获取webapp的根目录
   * @return  {String} app根目录
   */
  getAppPath() {
    return window.location.pathname.substr(0, window.location.pathname.indexOf('/apps'));
  },
  /**
   * 获取App应用的根目录
   * @return  {String} App应用根目录
   */
  getBasePath() {
    return window.location.origin + window.location.pathname;
  },
  /**
   * 从url地址中获取拼接的参数值
   * @param   {String} paramName 参数名称
   * @return  {String} 参数值
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
   * 获取用户的浏览器信息
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
   * @param  {Array} browserList 浏览器列表（name/大版本）
   * @return {Boolean} 是否在指定的浏览器列表中
   */
  testBrowser(browserList) {
    let f = false;
    const ub = this.getBrowserName().split('/');

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

export default Util;
