import ajax from './ajax';
import api from './api';

export async function login(userName, password) {
  const param = {
    userNickName: userName,
    userPassword: password
  };

  return ajax.get(api.login, param);
}

export async function getWorkOrderTotal() {
  const param = {
    stage: [2, 4, 40, 0]
  };

  return ajax.get(api.getWorkOrderTotal, param);
}

export async function getWorkOrderList(stage, opElem) {
  const param = {
    stage,
    operationalElement: opElem
  };

  return ajax.get(api.getWorkOrderList, param);
}

export async function getWorkOrderDetail(workOrderId, stage, opElem) {
  const param = {
    workOrderId,
    stage,
    operationalElement: opElem
  };

  return ajax.get(api.getWorkOrderDetail, param);
}
