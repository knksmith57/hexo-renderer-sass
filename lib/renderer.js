/* global hexo */
'use strict'

var sass = require('node-sass')
var extend = require('util')._extend

module.exports = function (data) {
    // support global and theme-specific config
  var userConfig = extend(
        hexo.theme.config.node_sass || {},
        hexo.config.node_sass || {}
    )

  var config = extend({
    data: data.text,
    file: data.path,
    outputStyle: 'nested',
    sourceComments: false
  }, userConfig)

  var sassConfig = extend({
    indentedSyntax: true
  }, config)

  try {
        // node-sass result object:
        // https://github.com/sass/node-sass#result-object
    var result = sass.renderSync(config)
        // result is now Buffer instead of String
        // https://github.com/sass/node-sass/issues/711
    return result.css.toString()
  } catch (error) {
    // Maybe it's a sass syntax, try to process with sass config.
    try {
      var result = sass.renderSync(sassConfig)
      return result.css.toString()
    } catch (error) {
      console.error(error.toString())
      throw error
    }
  }
}
