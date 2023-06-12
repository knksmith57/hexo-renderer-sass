[Sass] renderer plugin for [Hexo]
=================================

[![npm version](https://badge.fury.io/js/hexo-renderer-sass.svg)](https://badge.fury.io/js/hexo-renderer-sass)
[![Build Status](https://travis-ci.org/knksmith57/hexo-renderer-sass.svg?branch=master)](https://travis-ci.org/knksmith57/hexo-renderer-sass)
[![Coverage Status](https://coveralls.io/repos/github/knksmith57/hexo-renderer-sass/badge.svg?branch=master)](https://coveralls.io/github/knksmith57/hexo-renderer-sass?branch=master)

> A hexo plugin for Dart Sass

## Install
```sh
$ npm install --save hexo-renderer-sass
```

## Config
Anything specified under the key `node_sass` in your `_config.yml` files will
be [passed directly] to the `sass.render()` call. Check out the [Dart Sass options docs]
for all available settings.

### _config.yml
```yaml
node_sass:
  outputStyle: expanded
```

### Inheritance
The config object passed to node sass is constructed by merging properties from
the following locations using a least-specific-first order:

1. Hardcoded Defaults (`{outputStyle: 'expanded'}`)
2. Theme specific `_config.yml`
3. Blog root `_config.yml`


## ♥︎
Questions, comments, concerns?
* [@JLHwung](https://github.com/JLHwung)
* [@jojoee](https://github.com/jojoee)
* [@knksmith57](https://github.com/knksmith57)


[Hexo]:                   http://hexo.io
[Sass]:                   http://sass-lang.com/
[passed directly]:        index.js:#L22
[Dart Sass options docs]: https://sass-lang.com/documentation/js-api/interfaces/LegacyFileOptions

