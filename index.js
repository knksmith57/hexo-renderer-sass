var sass   = require('node-sass');
var extend = require('util')._extend;

var sassRenderer = function(data, options) {

  // support global and theme-specific config
  var userConfig = extend(
    hexo.theme.config.node_sass || {},
    hexo.config.node_sass || {}
  );

  var config = extend({
    data: data.text,
    file: data.path,
    outputStyle: 'nested',
    sourceComments: false,
  }, userConfig);

  try {
    // node-sass result object:
    // https://github.com/sass/node-sass#result-object
    var result = sass.renderSync(config);
    // result is now Buffer instead of String
    // https://github.com/sass/node-sass/issues/711
    return result.css.toString();
  }
  catch(error) {
    console.error(error.toString());
    throw error;
  }
}

// associate the Sass renderer with .scss AND .sass extensions
hexo.extend.renderer.register('scss', 'css', sassRenderer);
hexo.extend.renderer.register('sass', 'css', sassRenderer);
