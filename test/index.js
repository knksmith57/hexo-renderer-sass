'use strict'

/* eslint-env mocha */

var should = require('chai').should(); // eslint-disable-line

describe('Sass renderer', function () {
  var ctx = {
    config: {},
    theme: {
      config: {}
    }
  }

  global.hexo = ctx

  var r = require('../lib/renderer')

  it('default: scss syntax', function () {
    var body = [
      '$color: red;',
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    var result = r("scss")({ text: body }, {})
    result.should.eql([
      '.foo {',
      '  color: red; }'
    ].join('\n') + '\n')
  })

  it('default: sass syntax', function () {
    var body = [
      '$color: red',
      '.foo',
      '  color: $color'
    ].join('\n')

    var result = r("sass")({ text: body }, {})
    result.should.eql([
      '.foo {',
      '  color: red; }'
    ].join('\n') + '\n')
  })

  it('outputStyle compressed: scss syntax', function () {
    ctx.theme.config = { node_sass: { outputStyle: 'compressed' } }
    global.hexo = ctx

    var body = [
      '$color: red;',
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    var result = r('scss')({ text: body }, {})
    result.should.eql([
      '.foo{color:red}'
    ].join('\n') + '\n')
  })

  it('outputStyle compressed: sass syntax', function () {
    ctx.theme.config = { node_sass: { outputStyle: 'compressed' } }
    global.hexo = ctx

    var body = [
      '$color: red',
      '.foo',
      '  color: $color'
    ].join('\n')

    var result = r("sass")({ text: body }, {})
    result.should.eql([
      '.foo{color:red}'
    ].join('\n') + '\n')
  })

  it('supports root config: scss syntax', function () {
    ctx.config = { node_sass: { outputStyle: 'compressed' } }
    ctx.theme.config = {}
    global.hexo = ctx

    var body = [
      '$color: red;',
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    var result = r('scss')({ text: body }, {})
    result.should.eql([
      '.foo{color:red}'
    ].join('\n') + '\n')
  })

  it('supports root config: sass syntax', function () {
    ctx.config = { node_sass: { outputStyle: 'compressed' } }
    ctx.theme.config = {}
    global.hexo = ctx

    var body = [
      '$color: red',
      '.foo',
      '  color: $color'
    ].join('\n')

    var result = r("sass")({ text: body }, {})
    result.should.eql([
      '.foo{color:red}'
    ].join('\n') + '\n')
  })

  it('throw when error occurs: scss syntax', function () {
    ctx.theme.config = { node_sass: { outputStyle: 'compressed' } }
    ctx.config = {}
    global.hexo = ctx

    var body = [
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    should.Throw(function () {
      return r('scss')({ text: body }, {})
    })
  })

  it('throw when error occurs: sass syntax', function () {
    ctx.theme.config = { node_sass: { outputStyle: 'compressed' } }
    ctx.config = {}
    global.hexo = ctx

    var body = [
      '.foo',
      '  color: $color'
    ].join('\n')

    should.Throw(function () {
      return r("sass")({ text: body }, {})
    })
  })
})
