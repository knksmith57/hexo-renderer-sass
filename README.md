[SASS] renderer plugin for [Hexo]
=================================

A wrapper for [node-sass] by Andrew Nesbitt.

[node-sass] includes some pre-compiled binaries by default; if it doesn't have
yours you'll need to add it for this to work. See Andrew's docs on [rebuilding
binaries] for more info.

## @import

Couldn't figure out any super elegant way to set the includesPath for @imports,
so we just flat out assume that any and all @import calls will be to
subdirectories of whatever .scss or .sass file you call them in. Hopefully this
works.

## Compass

... is not supported. [node-sass] doesn't support it, and this is just
a wrapper around that. There was an [issue filed] for this, but it's closed now
since most of Compass is [written as Ruby extensions]. Sorry bro, you'll be OK.



[Hexo]:                         http://zespia.tw/hexo
[SASS]:                         http://sass-lang.com/
[node-sass]:                    https://github.com/andrew/node-sass
[rebuilding binaries]:          https://github.com/andrew/node-sass#rebuilding-binaries
[issue filed]:                  https://github.com/andrew/node-sass/issues/54
[written as Ruby extensions]:   https://github.com/chriseppstein/compass/tree/stable/lib/compass/sass_extensions
