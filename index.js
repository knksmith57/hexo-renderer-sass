/* global hexo */
'use strict'

var sassRenderer = require('./lib/renderer')

// associate the Sass renderer with .scss AND .sass extensions
hexo.extend.renderer.register('scss', 'css', sassRenderer)
hexo.extend.renderer.register('sass', 'css', sassRenderer)
