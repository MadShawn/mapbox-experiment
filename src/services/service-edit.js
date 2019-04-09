import ajax from './ajax';
import api from './api';

export async function getByPid(pid, type, dbId) {
  const param = {
    pid,
    type,
    dbId
  };

  return ajax.get(api.getByPid, param);
}

async function run(param) {
  return ajax.post(api.run, param);
}

export async function create(type, data, opConfig = {}) {
  const param = {
    command: 'CREATE',
    type,
    data,
    opConfig
  };

  return run(param);
}

export async function update(type, data, opConfig = {}) {
  const param = {
    command: 'UPDATE',
    type,
    data,
    opConfig
  };

  return run(param);
}

export async function del(type, data, opConfig = {}) {
  const param = {
    command: 'DELETE',
    type,
    data,
    opConfig
  };

  return run(param);
}
