[Sass] renderer plugin for [Hexo]
=================================

> A hexo plugin for node-sass

## Install
```sh
$ npm install --save hexo-renderer-sass
```

## Config
By default, anything specified in `_config.yml` is [passed directly] to the
`sass.render()` call. Check out the [node sass options docs] for all available
settings.

### _config.yml
```yaml
node_sass:
  outputStyle: nested
  precision: 5
  sourceComments: false
```

## ♥︎
Questions, comments, concerns? --> [@knksmith57](https://twitter.com/knksmith57).


[Hexo]:                   http://hexo.io
[Sass]:                   http://sass-lang.com/
[node-sass]:              https://github.com/andrew/node-sass
[passed directly]:        index.js:#L14
[node sass options docs]: https://github.com/sass/node-sass#options

