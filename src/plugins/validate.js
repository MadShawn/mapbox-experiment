import Vue from 'vue';
import cn from 'vee-validate/dist/locale/zh_CN';
import VeeValidate, {
  Validator
} from 'vee-validate';

const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
};

Vue.use(VeeValidate, config);

const dictionary = {
  zh_CN: {
    messages: {
      required: field => `请输入${field}`
    }
  }
};

Validator.localize('zh_CN', cn);
Validator.localize('zh_CN', dictionary.zh_CN);
