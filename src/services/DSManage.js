import DataService from './DataService';

export default class DSManage extends DataService {
  login(userName, passwd) {
    return this.get('man/userInfo/login/', {
      parameter: {
        userNickName: userName,
        userPassword: passwd
      }
    }).then((rest) => {
      if (rest.errcode === 0) {
        return rest.data;
      }

      throw new Error(rest.errmsg);
    });
  }
}
