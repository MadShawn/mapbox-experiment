/**
 * 缓存操作类
 */
class Storage {
  /**
   * 设置缓存键值对
   * @param {String} key   键
   * @param {Any}    value 值
   */
  setSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 获取存储在session storage中对象的特定键值
   * @param  {String} key 缓存的键
   * @return {Object} 换成的值
   */
  getSessionStorage(key) {
    const jsonStr = sessionStorage.getItem(key);
    if (jsonStr) {
      return JSON.parse(jsonStr);
    }
    return null;
  }

  /**
   * 删除缓存键值对
   * @param {String} key 键
   */
  removeSessionStorage(key) {
    sessionStorage.removeItem(key);
  }

  /**
   * 删除存储在session storage中的对象
   * @return {Undefined} 无
   */
  clearSessionStorage() {
    sessionStorage.clear();
  }

  /**
   * 设置缓存键值对
   * @param {String} key   键
   * @param {Any}    value 值
   */
  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 获取存储在session storage中对象的特定键值
   * @param  {String} key 缓存的键
   * @return {Object} 换成的值
   */
  getLocalStorage(key) {
    const jsonStr = localStorage.getItem(key);
    if (jsonStr) {
      return JSON.parse(jsonStr);
    }
    return null;
  }

  /**
   * 删除缓存键值对
   * @param {String} key 键
   */
  removeLocalStorage(key) {
    localStorage.removeItem(key);
  }

  /**
   * 删除存储在Local storage中的对象
   * @return {Undefined} 无
   */
  clearLocalStorage() {
    localStorage.clear();
  }
}

// 全局单例实例
export default new Storage();
