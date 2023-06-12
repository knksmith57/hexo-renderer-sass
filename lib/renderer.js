'use strict'

const sass = require('sass')
const extend = Object.assign

module.exports = (ext) => function (data) {
  // support global and theme-specific config
  const userConfig = extend(
    this.theme.config.node_sass || {},
    this.config.node_sass || {}
  )

  const config = extend({
    data: data.text,
    file: data.path,
    outputStyle: 'expanded',
    indentedSyntax: (ext === 'sass')
  }, userConfig)

  try {
    // node-sass result object:
    // https://github.com/sass/node-sass#result-object
    const result = sass.renderSync(config)
    // result is now Buffer instead of String
    // https://github.com/sass/node-sass/issues/711
    return result.css.toString()
  } catch (error) {
    console.error(error.toString())
    throw error
  }
}
