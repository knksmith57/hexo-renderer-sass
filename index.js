var sass   = require('node-sass');
var extend = require('util')._extend;

var sassRenderer = function(data, options) {

  var config = extend({
    data: data.text,
    file: data.path,
    outputStyle: 'nested',
    sourceComments: false,
  }, hexo.config.node_sass || {});

  try {
    // node-sass result object:
    // https://github.com/sass/node-sass#result-object
    var result = sass.renderSync(config);
    return result.css;
  }
  catch(error) {
    console.error(error.toString());
    throw error;
  }
}

// associate the Sass renderer with .scss AND .sass extensions
hexo.extend.renderer.register('scss', 'css', sassRenderer);
hexo.extend.renderer.register('sass', 'css', sassRenderer);
