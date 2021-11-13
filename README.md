# @violentmonkey/ui

[![NPM](https://img.shields.io/npm/v/@violentmonkey/ui.svg)](https://npm.im/@violentmonkey/ui)
![License](https://img.shields.io/npm/l/@violentmonkey/ui.svg)

Common UI for userscripts, working in Violentmonkey as well as other userscript managers.

## Dependencies

- [@violentmonkey/dom](https://github.com/violentmonkey/vm-dom)

## Usage

First, include dependencies:

```js
// ...
// @require https://cdn.jsdelivr.net/combine/npm/@violentmonkey/dom@2,npm/@violentmonkey/ui@0.7
// ...
```

Then use it like so, all exports can be accessed under namespace `VM`:

```js
VM.showToast('hello');
VM.showToast(VM.h('div', {}, 'hello, world'));
```

Or use with JSX and bundlers, for example:

```js
// .babelrc.js
{
  plugins: [
    // JSX
    ['@babel/plugin-transform-react-jsx', {
      pragma: 'VM.h',
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

See [the documentation](https://violentmonkey.github.io/vm-ui/modules.html).
