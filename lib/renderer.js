'use strict'

const sass = require('sass')
const { pathToFileURL } = require('url')

// Translate options of the deprecated legacy API (`sass.renderSync`) to their
// modern API (`sass.compileString`) counterparts, so existing `node_sass`
// configs keep working. Modern option names take precedence.
function fromLegacyOptions (options) {
  const { outputStyle, includePaths, indentedSyntax, ...rest } = options
  const modern = {}
  if (outputStyle !== undefined) modern.style = outputStyle
  if (includePaths !== undefined) modern.loadPaths = includePaths
  if (indentedSyntax !== undefined) modern.syntax = indentedSyntax ? 'indented' : 'scss'
  return Object.assign(modern, rest)
}

module.exports = (ext) => function (data) {
  // support global and theme-specific config
  const userConfig = Object.assign(
    {},
    fromLegacyOptions(this.theme.config.node_sass || {}),
    fromLegacyOptions(this.config.node_sass || {})
  )

  const config = Object.assign({
    style: 'expanded',
    syntax: ext === 'sass' ? 'indented' : 'scss',
    // resolve relative imports against the rendered file
    url: data.path ? pathToFileURL(data.path) : undefined
  }, userConfig)

  // Like the legacy API, resolve loads relative to the current working
  // directory before the user's load paths.
  config.loadPaths = [process.cwd()].concat(config.loadPaths || [])

  try {
    return sass.compileString(data.text, config).css
  } catch (error) {
    console.error(error.toString())
    throw error
  }
}
