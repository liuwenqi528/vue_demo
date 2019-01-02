'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
//   BASE_URL: '"http://192.168.103.126:8800"'
  BASE_URL: '"/"'
})
