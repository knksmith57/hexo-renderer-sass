[Sass] renderer plugin for [Hexo]
=================================

A wrapper for [node-sass] by Andrew Nesbitt.

[node-sass] includes some pre-compiled binaries by default; if it doesn't have
yours you'll need to add it for this to work. See Andrew's docs on [rebuilding
binaries] for more info.

####_config.yml
```
node_sass:
  outputStyle: nested ('nested' and 'compressed' are supported)
  precision: 8
  imagePath: images
  sourceComments: none (can be one of 'none', 'normal', 'map')
```

[Hexo]:                         http://zespia.tw/hexo
[SASS]:                         http://sass-lang.com/
[node-sass]:                    https://github.com/andrew/node-sass
[rebuilding binaries]:          https://github.com/andrew/node-sass#rebuilding-binaries
[issue filed]:                  https://github.com/andrew/node-sass/issues/54
[written as Ruby extensions]:   https://github.com/chriseppstein/compass/tree/stable/lib/compass/sass_extensions
