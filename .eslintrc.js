// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'semi': 0,
      'indent': 0,
      'space-before-function-paren': 0,
      'comma-spacing ' : 0,
      'key-spacing ' : 0,
      'keyword-spacing' : 0,
      'space-before-blocks' : 0,
      'no-multiple-empty-lines ' : 0,
      'space-infix-ops ': 0,
      'semi-spacing ' : 0,
      'space-in-parens ' : 0,

  }
}
