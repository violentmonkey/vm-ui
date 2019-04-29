# @violentmonkey/ui

[![NPM](https://img.shields.io/npm/v/@violentmonkey/ui.svg)](https://npm.im/@violentmonkey/ui)
![License](https://img.shields.io/npm/l/@violentmonkey/ui.svg)

Common UI for userscripts in Violentmonkey.

## Dependencies

- [@violentmonkey/dom](https://github.com/violentmonkey/vm-dom)

## Usage

First, include dependencies:

```js
// ...
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/ui
// ...
```

Then use it directly:

```
VM.showToast('hello');
```

Or use with JSX and bundlers, for example:

```js
// .babelrc.js
{
  plugins: [
    ['@babel/plugin-transform-react-jsx', {
      pragma: 'h',
    }],
  ],
}
```

```js
const h = VM.createElement;

VM.showToast(<div>hello, world</div>);
```

To initialize a project for userscript with JSX support, try [generator-rollup](https://github.com/gera2ld/generator-rollup):

```sh
$ mkdir project
$ cd project
$ npx -p https://github.com/gera2ld/generator-rollup.git -p yo yo @gera2ld/rollup:iife
```

## API

### VM.showToast

`VM.showToast(content)`
