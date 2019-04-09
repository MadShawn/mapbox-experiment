import axios from 'axios';
import App from '@/Application';

// 创建axios实例
const service = axios.create({
  baseURL: App.Config.services.editor, // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use((config) => {
  const reqContext = {
    countryCode: App.Session.accessType
  };
  if (config.method === 'get') {
    if (App.Session.accessToken) {
      config.params.access_token = App.Session.accessToken; // get请求加token的方式
    }
    config.params.reqContext = reqContext;
  } else if (config.method === 'post') {
    if (App.Session.accessToken) {
      config.data = `${config.data}&access_token=${App.Session.accessToken}`;
    }
    config.data = `${config.data}&reqContext=${JSON.stringify(reqContext)}`;
  }
  return config;
}, (error) => {
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.errcode !== 0) {
      return Promise.reject(res.errmsg);
    }
    return res;
  },
  error => Promise.reject(error)
);

async function get(url, params) {
  return service.get(url, {
    params: {
      parameter: JSON.stringify(params)
    }
  })
    .then(response => response.data);
}

async function post(url, params) {
  const p = { ...params };
  if (App.Session.User) {
    p.userId = App.Session.User.userId;
  }
  if (App.Session.WorkOrder) {
    p.workOrderId = App.Session.WorkOrder.workOrderId;
    if (App.Session.WorkOrder.bizType) {
      p.bizType = App.Session.WorkOrder.bizType;
    }
  }

  const searchParams = new URLSearchParams();
  searchParams.append('parameter', JSON.stringify(p));

  return service.post(url, searchParams)
    .then(response => response.data);
}

export default {
  get,
  post
};
