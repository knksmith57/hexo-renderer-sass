'use strict';

var should = require('chai').should(); // eslint-disable-line

describe('Sass renderer', function() {
    var ctx = {
        config: {},
        theme: {
            config: {}
        }
    };

    global.hexo = ctx;

    var r = require('../lib/renderer');

    it('default', function () {
        var body = [
            '$color: red;',
            '.foo {',
            '  color: $color;',
            '}'
        ].join('\n');

        const result = r({ text: body }, {});
        result.should.eql([
                '.foo {',
                '  color: red; }'
            ].join('\n') + '\n');
    });

    it('outputStyle compressed', function () {

        ctx.theme.config = { node_sass: { outputStyle: 'compressed' } };
        global.hexo = ctx;

        var body = [
            '$color: red;',
            '.foo {',
            '  color: $color;',
            '}'
        ].join('\n');

        const result = r({ text: body }, {});
        result.should.eql([
                '.foo{color:red}'
            ].join('\n') + '\n');
    });

    it('supports root config', function () {
        ctx.config = { node_sass: { outputStyle: 'compressed' } };
        ctx.theme.config = {};
        global.hexo = ctx;

        var body = [
            '$color: red;',
            '.foo {',
            '  color: $color;',
            '}'
        ].join('\n');

        const result = r({ text: body }, {});
        result.should.eql([
                '.foo{color:red}'
            ].join('\n') + '\n');
    });

    it('throw when error occurs', function () {
        ctx.theme.config = { node_sass: { outputStyle: 'compressed' } };
        ctx.config = {};
        global.hexo = ctx;

        var body = [
            '.foo {',
            '  color: $color;',
            '}'
        ].join('\n');

        should.Throw(function () {
            return r({ text: body }, {})
        });
    })
});