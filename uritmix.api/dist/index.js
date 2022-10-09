
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./uritmix.api.cjs.production.min.js')
} else {
  module.exports = require('./uritmix.api.cjs.development.js')
}
