'use strict';

const sass = require('sass');
const extend = require('util')._extend;
const path = require('path');

module.exports = function (ext) {
  return function (data) {
    // support global and theme-specific config
    const userConfig = extend(this.theme.config.node_sass || {}, this.config.node_sass || {});

    const config = extend(
      {
        data: data.text,
        file: data.path,
        outputStyle: 'expanded',
        indentedSyntax: ext === 'sass'
      },
      userConfig
    );

    // turn includePaths into array
    if (typeof config.includePaths === 'string') {
      // string
      config.includePaths = [config.includePaths];
    } else if (!config.includePaths) {
      // undefined
      config.includePaths = [];
    }

    // include installed library locations into compiler
    config.includePaths.push(path.join(hexo.base_dir, 'node_modules'), path.join(hexo.theme_dir, 'node_modules'));

    try {
      // node-sass result object:
      // https://github.com/sass/node-sass#result-object
      const result = sass.renderSync(config);
      // result is now Buffer instead of String
      // https://github.com/sass/node-sass/issues/711
      return result.css.toString();
    } catch (error) {
      this.log.error('hexo-renderer-sass', error.toString());
      throw error;
    }
  };
};
