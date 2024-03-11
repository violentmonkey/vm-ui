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

### Toast

```js
const toast = VM.showToast(VM.h('div', {}, 'hello'), {
  theme: 'dark', // or 'light'
  duration: 2000, // or 0 to manually close it
});

// Manually close it
toast.close();
```

### Panel

```js
const panel = VM.getPanel({
  content: VM.h('div', {}, 'This is a panel'),
  theme: 'light',
});
panel.wrapper.style.top = '100px';

// Show panel
panel.show();

// Hide panel
panel.hide();

// Allow panel to be moved by mouse dragging
panel.setMovable(true);
```

### SolidJS

It is recommended to initialize a userscript project using [generator-userscript](https://github.com/violentmonkey/generator-userscript) and use [solid-js](https://solidjs.com/).

```js
import { render } from 'solid-js/web';

const panel = VM.getPanel({ theme: 'light' });
panel.wrapper.style.top = '100px';
render(() => <MyPanel />, panel.body);
panel.show();
```

### JSX for @violentmonkey/dom

**Not recommended** as it is not compatible with [solid-js](https://solidjs.com/) integrated in [generator-userscript](https://github.com/violentmonkey/generator-userscript).

Use with JSX and bundlers, for example:

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

## API

[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/@violentmonkey/ui)
