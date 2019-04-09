/**
 * 缓存操作类
 */
class Storage {
  /**
   * 设置本地缓存键值
   * @param {String} key 键值
   */
  setLocalKey(key = 'WebApp') {
    this.lkey = key;
  }

  /**
   * 设置会话缓存键值
   * @param {String} key 键值
   */
  setSessionKey(key = 'XXX') {
    this.skey = `${this.lkey}-${key}`;
  }

  /**
   * 获取存储在session storage中对象的特定键值
   * @param  {String} key 缓存的键
   * @return {Object} 换成的值
   */
  getSessionStorage(key) {
    const jsonStr = sessionStorage.getItem(this.skey);
    if (jsonStr) {
      const obj = JSON.parse(jsonStr);
      return obj[key];
    }
    return null;
  }

  /**
   * 设置缓存键值对
   * @param {String} key   键
   * @param {Any}    value 值
   */
  setSessionStorage(key, value) {
    const jsonStr = sessionStorage.getItem(this.skey);
    const obj = jsonStr ? JSON.parse(jsonStr) : {};
    obj[key] = value;
    sessionStorage.setItem(this.skey, JSON.stringify(obj));
  }

  /**
   * 删除缓存键值对
   * @param {String} key 键
   */
  removeSessionStorage(key) {
    const jsonStr = sessionStorage.getItem(this.skey);
    if (jsonStr) {
      const obj = JSON.parse(jsonStr);
      delete obj[key];
      sessionStorage.setItem(this.skey, JSON.stringify(obj));
    }
  }

  /**
   * 删除存储在session storage中的对象
   * @return {Undefined} 无
   */
  clearSessionStorage() {
    sessionStorage.removeItem(this.skey);
  }

  /**
   * 获取存储在session storage中对象的特定键值
   * @param  {String} key 缓存的键
   * @return {Object} 换成的值
   */
  getLocalStorage(key) {
    const jsonStr = localStorage.getItem(this.lkey);
    if (jsonStr) {
      const obj = JSON.parse(jsonStr);
      return obj[key];
    }
    return null;
  }

  /**
   * 设置缓存键值对
   * @param {String} key   键
   * @param {Any}    value 值
   */
  setLocalStorage(key, value) {
    const jsonStr = localStorage.getItem(this.lkey);
    const obj = jsonStr ? JSON.parse(jsonStr) : {};
    obj[key] = value;
    localStorage.setItem(this.lkey, JSON.stringify(obj));
  }

  /**
   * 删除缓存键值对
   * @param {String} key 键
   */
  removeLocalStorage(key) {
    const jsonStr = localStorage.getItem(this.lkey);
    if (jsonStr) {
      const obj = JSON.parse(jsonStr);
      delete obj[key];
      localStorage.setItem(this.lkey, JSON.stringify(obj));
    }
  }

  /**
   * 删除存储在Local storage中的对象
   * @return {Undefined} 无
   */
  clearLocalStorage() {
    localStorage.removeItem(this.lkey);
  }
}

export default new Storage();
