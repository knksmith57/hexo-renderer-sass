[Sass] renderer plugin for [Hexo]
=================================

> A hexo plugin for node-sass

## Install
```sh
$ npm install --save hexo-renderer-sass
```

## Config
Anything specified under the key `node_sass` in your `_config.yml` files will
be [passed directly] to the `sass.render()` call. Check out the [node sass options docs]
for all available settings.

### _config.yml
```yaml
node_sass:
  outputStyle: nested
  precision: 5
  sourceComments: false
```

### Inheritance
The config object passed to node sass is constructed by merging properties from
the following locations using a least-specific-first order:

1. Hardcoded Defaults (`{outputStyle: 'nested',sourceComments: false}`)
2. Theme specific `_config.yml`
3. Blog root `_config.yml`


## ♥︎
Questions, comments, concerns? --> [@knksmith57](https://twitter.com/knksmith57).


[Hexo]:                   http://hexo.io
[Sass]:                   http://sass-lang.com/
[node-sass]:              https://github.com/andrew/node-sass
[passed directly]:        index.js:#L22
[node sass options docs]: https://github.com/sass/node-sass#options

