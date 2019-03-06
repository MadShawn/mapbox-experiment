module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  globals: {
    App: true,
    navinfo: true,
    fastmap: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'warn'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
