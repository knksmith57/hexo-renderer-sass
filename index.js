var
  sass = require('node-sass'),
  path = require('path');

var sassAsyncRenderer = function(data, options, callback) {
  var config = hexo.config.node_sass;

  // Processor options.
  var options = {
    data: data.text,
    file: data.path,
    outputStyle: config ? config.outputStyle || 'compressed' : 'compressed',
    imagePath: config ? config.imagePath || 'images' : 'images',
    sourceComments: config ? config.sourceComments || 'none' : 'none',
    precision: config ? config.precision || 8 : 8
  };

  try {
    data = sass.renderSync(options);
  } catch (error) {
    return callback(error);
  }

  return callback(null, data);
}

// associate the Sass renderer with .scss AND .sass extensions
hexo.extend.renderer.register('scss', 'css', sassAsyncRenderer);
hexo.extend.renderer.register('sass', 'css', sassAsyncRenderer);
