'use strict'

const assert = require('assert')
// Node.js 18+ runs this file with `node --test`. Node.js 14 and 16 have no
// test runner CLI, so CI runs it there with mocha, which provides these globals.
const { describe, it } = typeof globalThis.describe === 'function'
  ? globalThis
  : require('node:test')

describe('Sass renderer', function () {
  const ctx = {
    config: {},
    theme: {
      config: {}
    }
  }

  const r = require('../lib/renderer')

  it('default: scss syntax', function () {
    const body = [
      '$color: red;',
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    const result = r('scss').call(ctx, { text: body }, {})
    assert.strictEqual(result, [
      '.foo {',
      '  color: red;',
      '}'
    ].join('\n'))
  })

  it('default: sass syntax', function () {
    const body = [
      '$color: red',
      '.foo',
      '  color: $color'
    ].join('\n')

    const result = r('sass').call(ctx, { text: body }, {})
    assert.strictEqual(result, [
      '.foo {',
      '  color: red;',
      '}'
    ].join('\n'))
  })

  it('outputStyle compressed: scss syntax', function () {
    ctx.theme.config = { node_sass: { outputStyle: 'compressed' } }

    const body = [
      '$color: red;',
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    const result = r('scss').call(ctx, { text: body }, {})
    assert.strictEqual(result, [
      '.foo{color:red}'
    ].join('\n'))
  })

  it('outputStyle compressed: sass syntax', function () {
    ctx.theme.config = { node_sass: { outputStyle: 'compressed' } }

    const body = [
      '$color: red',
      '.foo',
      '  color: $color'
    ].join('\n')

    const result = r('sass').call(ctx, { text: body }, {})
    assert.strictEqual(result, [
      '.foo{color:red}'
    ].join('\n'))
  })

  it('supports root config: scss syntax', function () {
    ctx.config = { node_sass: { outputStyle: 'compressed' } }
    ctx.theme.config = {}

    const body = [
      '$color: red;',
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    const result = r('scss').call(ctx, { text: body }, {})
    assert.strictEqual(result, [
      '.foo{color:red}'
    ].join('\n'))
  })

  it('supports root config: sass syntax', function () {
    ctx.config = { node_sass: { outputStyle: 'compressed' } }
    ctx.theme.config = {}

    const body = [
      '$color: red',
      '.foo',
      '  color: $color'
    ].join('\n')

    const result = r('sass').call(ctx, { text: body }, {})
    assert.strictEqual(result, [
      '.foo{color:red}'
    ].join('\n'))
  })

  it('throw when error occurs: scss syntax', function () {
    ctx.theme.config = { node_sass: { outputStyle: 'compressed' } }
    ctx.config = {}

    const body = [
      '.foo {',
      '  color: $color;',
      '}'
    ].join('\n')

    assert.throws(function () {
      return r('scss').call(ctx, { text: body }, {})
    }, function (error) {
      return error.message.includes('Undefined variable.\n  ╷\n2 │   color: $color;\n  │          ^^^^^^\n  ╵\n  stdin 2:10  root stylesheet')
    })
  })

  it('throw when error occurs: sass syntax', function () {
    ctx.theme.config = { node_sass: { outputStyle: 'compressed' } }
    ctx.config = {}

    const body = [
      '.foo',
      '  color: $color'
    ].join('\n')

    assert.throws(function () {
      return r('sass').call(ctx, { text: body }, {})
    }, function (error) {
      return error.message.includes('Undefined variable.\n  ╷\n2 │   color: $color\n  │          ^^^^^^\n  ╵\n  stdin 2:10  root stylesheet')
    })
  })
})
