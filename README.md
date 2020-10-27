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
// @require https://cdn.jsdelivr.net/combine/npm/@violentmonkey/dom@1,npm/@violentmonkey/ui
// ...
```

Then use it like so:

```
VM.showToast('hello');
```

Or use with JSX and bundlers, for example:

```js
// .babelrc.js
{
  plugins: [
    // JSX
    ['@babel/plugin-transform-react-jsx', {
      pragma: 'VM.createElement',
      pragmaFrag: 'VM.Fragment',
    }],
  ],
}
```

```js
VM.showToast(<div>hello, world</div>);
```

To initialize a project for userscript with JSX support, try [generator-userscript](https://github.com/violentmonkey/generator-userscript):

```sh
$ mkdir my-script
$ cd my-script
$ npx -p https://github.com/violentmonkey/generator-userscript.git -p yo yo @violentmonkey/userscript
```

## API

### VM.showToast

`VM.showToast(content, { delay = 2000, shadow = true })`

Show a toast message.

### VM.getPanel

`VM.getPanel({ css, content, shadow = true })`

Create a shadow DOM.
