import App from '../Application';

class Auth {
  /**
   * 获取session storage的键值
   * @method getSessionStorageKey
   * @author ChenXiao
   * @date   2017-9-13
   * @return {String} appName-token
   */
  getSessionStorageKey() {
    return `${App.Config.appName}-${App.Temp.accessToken || 'XXX'}`;
  }

  getSessionStorage(key) {
    const skey = this.getSessionStorageKey();
    const obj = JSON.parse(sessionStorage.getItem(skey));
    if (obj) {
      return obj[key];
    }
    return null;
  }

  setSessionStorage(key, value) {
    const skey = this.getSessionStorageKey();
    const obj = JSON.parse(sessionStorage.getItem(skey)) || {};
    obj[key] = value;
    sessionStorage.setItem(skey, JSON.stringify(obj));
  }

  removeSessionStorage(key) {
    const skey = this.getSessionStorageKey();
    const obj = JSON.parse(sessionStorage.getItem(skey));
    if (obj) {
      delete obj[key];
      sessionStorage.setItem(skey, JSON.stringify(obj));
    }
  }

  /**
   * 删除存储在session storage中的对象
   * @method removeSessionStorageObject
   * @author ChenXiao
   * @date   2017-9-13
   * @return {Undefined} 无返回值
   */
  removeSessionStorageObject() {
    const skey = this.getSessionStorageKey();
    sessionStorage.removeItem(skey);
  }

  /**
   * 获取local storage的键值
   * @method getLocalStorageKey
   * @author ChenXiao
   * @date   2017-9-13
   * @return {String}  appName-userId
   */
  getLocalStorageKey() {
    return App.Config.appName;
  }

  /**
   * 获取存储在local storage中的对象
   * @method getLocalStorageObject
   * @author ChenXiao
   * @date   2017-9-13
   * @return {Object}  存储对象
   */
  getLocalStorageObject() {
    const lkey = this.getLocalStorageKey();
    return JSON.parse(localStorage.getItem(lkey));
  }

  /**
   * 删除存储在local storage中的对象
   * @method removeLocalStorageObject
   * @author ChenXiao
   * @date   2017-9-13
   * @return {Undefined} 无返回值
   */
  removeLocalStorageObject() {
    const lkey = this.getLocalStorageKey();
    localStorage.removeItem(lkey);
  }

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
    const lkey = this.getLocalStorageKey();
    const obj = JSON.parse(localStorage.getItem(lkey)) || {};
    obj[key] = value;
    localStorage.setItem(lkey, JSON.stringify(obj));
  }

  /**
   * 从存储在local storage中的对象中获取一个键对应的值
   * @method getLocalStorage
   * @author ChenXiao
   * @date   2017-9-13
   * @param  {String} key 键
   * @return {Any}        值
   */
  getLocalStorage(key) {
    const obj = this.getLocalStorageObject();

    if (obj) {
      return obj[key];
    }
    return null;
  }

  /**
   * 从存储在local storage中的对象中删除一个键值对
   * @method removeLocalStorage
   * @author ChenXiao
   * @date   2017-9-13
   * @param  {String} key 键
   * @return {Undefined} 无返回值
   */
  removeLocalStorage(key) {
    const lkey = this.getLocalStorageKey();
    const obj = JSON.parse(localStorage.getItem(lkey));
    if (obj) {
      delete obj[key];
      localStorage.setItem(lkey, JSON.stringify(obj));
    }
  }
}
export default new Auth();
