import axios from 'axios';
import auth from '@/utils/auth';

// 创建axios实例
const service = axios.create({
  baseURL: window.config.service, // api的base_url
  timeout: 15000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use((config) => {
  const reqContext = {
    countryCode: auth.getSessionStorage('INTERNATIONAL_CHECKED')
      ? auth.getSessionStorage('INTERNATIONAL_CHECKED') : 'CN'
  };
  if (config.url.indexOf('login') !== -1) {
    config.params.reqContext = reqContext;
  }
  if (auth.getSessionStorage('ADMIN_TOKEN')) {
    if (config.method === 'get') {
      config.params.access_token = auth.getSessionStorage('ADMIN_TOKEN'); // get请求加token的方式
      config.params.reqContext = reqContext;
    }
    if (config.method === 'post') {
      config.data = `${config.data}&access_token=${auth.getSessionStorage('ADMIN_TOKEN')}&reqContext=${JSON.stringify(reqContext)}`; // post请求加token的方式
    }
  }
  return config;
}, (error) => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.errcode !== 0) {
      return Promise.reject(res.errmsg);
    }
    return response.data;
  },
  error => Promise.reject(error)
);
export function post(url, parameter) {
  const searchParams = new URLSearchParams();
  searchParams.append('templetId', parameter.templetId);
  searchParams.append('thumbnail', JSON.stringify(parameter.thumbnail).replace(/\\n/g, ' ').replace(/\\/g, ''));
  return new Promise((resolve, reject) => {
    service.post(url, encodeURI(searchParams)).then((response) => {
      resolve(response.data);
    }, (err) => {
      reject(err);
    })
      .catch((error) => {
        reject(error);
      });
  });
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: {
        parameter: JSON.stringify(params)
      }
    }).then((response) => {
      resolve(response.data);
    }, (err) => {
      reject(err);
    })
      .catch((error) => {
        reject(error);
      });
  });
}
