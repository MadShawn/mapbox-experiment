import axios from 'axios';

export default class DataService {
  constructor(options) {
    this.services = options.services;
    this.accessToken = options.accessToken;
    this.accessType = options.accessType;
  }

  getFullUrl(url, urlType = 'editor') {
    const service = this.services[urlType];

    return `${service}/${url}?access_token=${this.accessToken || ''}`;
  }

  wrapParam(param) {
    const wraped = {};
    for (const [key, value] of Object.entries(param)) {
      if (typeof value === 'string' || typeof value === 'number') {
        wraped[key] = value;
      } else {
        wraped[key] = JSON.stringify(value);
      }
    }

    return wraped;
  }

  async get(url, param = {}, urlType) {
    const fullUrl = this.getFullUrl(url, urlType);

    return axios.get(fullUrl, {
      params: {
        ...this.wrapParam(param),
        reqContext: `{"countryCode":"${this.accessType}"}`
      }
    }).then(rest => rest.data);
  }

  async post(url, param = {}, urlType) {
    const fullUrl = this.getFullUrl(url, urlType);

    return axios.post(fullUrl, {
      ...param,
      reqContext: `{"countryCode":"${this.accessType}"}`
    }).then(rest => rest.data);
  }
}
