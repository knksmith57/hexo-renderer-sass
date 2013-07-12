var
  sass = require('node-sass'),
  fs   = require('fs'),
  path = require('path');

// since I'm unaware of a way to specify multiple file extensions in the call
// to hexo.extend.renderer.register, we define the callback up here so that we
// can use it in both the .scss and .sass registration calls
var sassAsyncRenderer = function(data, options, callback) {
  // get a list of all subdirectories for the include paths
  var
    basePath = path.dirname(data.path),
    paths = [];

  fs.readdir(basePath, function(err, files) {
    if(err) {
      callback(err);
    }

    files.forEach(function(file, i) {
      var f = basePath + '/' + file;

      if(fs.lstatSync(f).isDirectory()) {
        paths.push(f + '/');
      }
    });

    // now render the sass files
    sass.render({
      // data: data.text,
      file: data.path,
      includePaths: paths,

      success: function(css) {
        callback(null, css);
      },

      error: function(error) {
        console.log(error);
        callback(error);
      }
    });
  });
}

// associate the SASS renderer with .scss AND .sass extensions
hexo.extend.renderer.register('scss', 'css', sassAsyncRenderer);
hexo.extend.renderer.register('sass', 'css', sassAsyncRenderer);
