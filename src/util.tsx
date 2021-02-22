import { JSXElement } from '@gera2ld/jsx-dom';
import baseCss from './base.css';

if (typeof VM === 'undefined' || !VM || !VM.createElement) {
  console.error(`\
[VM-UI] VM.createElement is not defined!
Please include following code in your metadata:

// @require https://cdn.jsdelivr.net/combine/npm/@violentmonkey/dom@1,npm/@violentmonkey/ui
`);
}

const React = VM;

export interface IHostElementResult {
  id: string;
  tag: string;
  shadow: boolean;
  host: HTMLElement;
  root: ShadowRoot | HTMLElement;
  addStyle: (css: string) => void;
  show: () => void;
  hide: () => void;
  dispose: () => void;
}

export function getHostElement(shadow = true): IHostElementResult {
  const id = getUniqueId('vmui-');
  const host: HTMLElement = VM.createElement(id, {
    id,
  });
  let root: ShadowRoot | HTMLElement;
  if (shadow) {
    root = host.attachShadow({ mode: 'open' });
  } else {
    root = VM.createElement(id);
    host.append(root);
  }
  const styles: HTMLStyleElement[] = [];
  const addStyle = (css: string) => {
    if (!shadow && typeof GM_addStyle === 'function') {
      styles.push(GM_addStyle(css.replace(/:host\b/g, `#${id} `)));
    } else {
      root.append(<style>{css}</style>);
    }
  };
  const dispose = () => {
    host.remove();
    styles.forEach(style => style.remove());
  };
  addStyle(baseCss);
  const result: IHostElementResult = {
    id,
    tag: 'VM.getHostElement',
    shadow,
    host,
    root,
    addStyle,
    dispose,
    show() {
      appendToBody(this.tag, this.host);
    },
    hide() {
      this.host.remove();
    },
  };
  return result;
}

export function appendToBody(tag: string, ...children: JSXElement[]): void {
  if (!document.body) {
    console.warn(`[${tag}] document.body is not ready yet, operation skipped.`);
    return;
  }
  document.body.append(...children);
}

export function getUniqueId(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 8);
}
