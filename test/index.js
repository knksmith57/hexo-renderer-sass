'use strict'

const assert = require('assert')
const path = require('path')
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
      return error.message.includes('Undefined variable.\n  ╷\n2 │   color: $color;\n  │          ^^^^^^\n  ╵\n  - 2:10  root stylesheet')
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
      return error.message.includes('Undefined variable.\n  ╷\n2 │   color: $color\n  │          ^^^^^^\n  ╵\n  - 2:10  root stylesheet')
    })
  })
  it('supports modern option names', function () {
    ctx.theme.config = { node_sass: { style: 'compressed' } }
    ctx.config = {}

    const result = r('scss').call(ctx, { text: '.foo { color: red; }' }, {})
    assert.strictEqual(result, '.foo{color:red}')
  })

  it('modern option names take precedence over legacy ones', function () {
    ctx.theme.config = {}
    ctx.config = { node_sass: { outputStyle: 'compressed', style: 'expanded' } }

    const result = r('scss').call(ctx, { text: '.foo { color: red; }' }, {})
    assert.strictEqual(result, '.foo {\n  color: red;\n}')
  })

  it('supports legacy indentedSyntax option', function () {
    ctx.theme.config = {}
    ctx.config = { node_sass: { indentedSyntax: true } }

    const sassResult = r('scss').call(ctx, { text: '.foo\n  color: red' }, {})
    assert.strictEqual(sassResult, '.foo {\n  color: red;\n}')

    ctx.config = { node_sass: { indentedSyntax: false } }

    const scssResult = r('sass').call(ctx, { text: '.foo { color: red; }' }, {})
    assert.strictEqual(scssResult, '.foo {\n  color: red;\n}')
  })

  it('resolves relative imports against the file path', function () {
    ctx.theme.config = {}
    ctx.config = {}

    const body = [
      '@use "variables";',
      '.foo {',
      '  color: variables.$color;',
      '}'
    ].join('\n')

    const result = r('scss').call(ctx, {
      text: body,
      path: path.join(__dirname, 'fixtures', 'main.scss')
    }, {})
    assert.strictEqual(result, '.foo {\n  color: red;\n}')
  })

  it('supports legacy includePaths option', function () {
    ctx.theme.config = {}
    ctx.config = { node_sass: { includePaths: [path.join(__dirname, 'fixtures', 'include')] } }

    const body = [
      '@use "sizes";',
      '.foo {',
      '  width: sizes.$size;',
      '}'
    ].join('\n')

    const result = r('scss').call(ctx, { text: body }, {})
    assert.strictEqual(result, '.foo {\n  width: 1px;\n}')
  })
  it('resolves imports relative to the current working directory', function () {
    ctx.theme.config = {}
    ctx.config = {}

    const body = [
      '@use "include/sizes";',
      '.foo {',
      '  width: sizes.$size;',
      '}'
    ].join('\n')

    const cwd = process.cwd()
    process.chdir(path.join(__dirname, 'fixtures'))
    try {
      const result = r('scss').call(ctx, { text: body }, {})
      assert.strictEqual(result, '.foo {\n  width: 1px;\n}')
    } finally {
      process.chdir(cwd)
    }
  })

  it('translates legacy options before merging theme and root config', function () {
    ctx.theme.config = { node_sass: { style: 'compressed' } }
    ctx.config = { node_sass: { outputStyle: 'expanded' } }

    const result = r('scss').call(ctx, { text: '.foo { color: red; }' }, {})
    assert.strictEqual(result, '.foo {\n  color: red;\n}')
  })
})
